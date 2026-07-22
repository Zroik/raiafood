<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class ShippingService
{
    public function searchCities($keyword)
    {
        $filePath = database_path('data/cities.json');
        $cities = [];

        if (file_exists($filePath)) {
            try {
                $content = file_get_contents($filePath);
                $data = json_decode($content, true);
                $cities = $data['rajaongkir']['results'] ?? [];
            } catch (\Exception $e) {
                logger()->error('Local cities JSON read error: ' . $e->getMessage());
            }
        }

        if (empty($cities)) {
            $cities = [
                ['city_id' => 37, 'city_name' => 'Batu', 'type' => 'Kota', 'province' => 'Jawa Timur', 'postal_code' => '65311'],
                ['city_id' => 255, 'city_name' => 'Malang', 'type' => 'Kota', 'province' => 'Jawa Timur', 'postal_code' => '65111'],
                ['city_id' => 256, 'city_name' => 'Malang', 'type' => 'Kabupaten', 'province' => 'Jawa Timur', 'postal_code' => '65151'],
                ['city_id' => 444, 'city_name' => 'Surabaya', 'type' => 'Kota', 'province' => 'Jawa Timur', 'postal_code' => '60111'],
                ['city_id' => 409, 'city_name' => 'Sidoarjo', 'type' => 'Kabupaten', 'province' => 'Jawa Timur', 'postal_code' => '61211'],
                ['city_id' => 334, 'city_name' => 'Pasuruan', 'type' => 'Kota', 'province' => 'Jawa Timur', 'postal_code' => '67111'],
                ['city_id' => 178, 'city_name' => 'Kediri', 'type' => 'Kota', 'province' => 'Jawa Timur', 'postal_code' => '64111'],
            ];
        }

        if (empty($keyword)) {
            return array_map(function ($city) {
                return [
                    'id' => $city['city_id'],
                    'name' => $city['type'] . ' ' . $city['city_name'],
                    'province' => $city['province'],
                    'postal_code' => $city['postal_code']
                ];
            }, array_slice($cities, 0, 10));
        }

        $keyword = strtolower($keyword);
        $filtered = array_filter($cities, function ($city) use ($keyword) {
            $cityName = strtolower($city['city_name'] ?? '');
            $type = strtolower($city['type'] ?? '');
            $province = strtolower($city['province'] ?? '');
            return strpos($cityName, $keyword) !== false || 
                   strpos($type . ' ' . $cityName, $keyword) !== false ||
                   strpos($province, $keyword) !== false;
        });

        return array_map(function ($city) {
            return [
                'id' => $city['city_id'],
                'name' => $city['type'] . ' ' . $city['city_name'],
                'province' => $city['province'],
                'postal_code' => $city['postal_code']
            ];
        }, array_slice(array_values($filtered), 0, 20));
    }

    public function calculateCost($destinationId, $weight, $courier)
    {
        $apiKey = config('shipping.rajaongkir.api_key');
        $apiUrl = config('shipping.rajaongkir.api_url');
        $originId = config('shipping.rajaongkir.origin_id', 37);

        try {
            $response = Http::withoutVerifying()->timeout(8)->withHeaders([
                'key' => $apiKey
            ])->post($apiUrl . '/cost', [
                'origin' => $originId,
                'destination' => $destinationId,
                'weight' => max(1, (int)$weight),
                'courier' => strtolower($courier)
            ]);

            if ($response->successful()) {
                return $response->json()['rajaongkir']['results'] ?? [];
            }
        } catch (\Exception $e) {
            logger()->error('RajaOngkir Cost calculation error: ' . $e->getMessage());
        }

        // Dynamic offline fallback calculation
        $province = $this->getProvinceByCityId($destinationId);
        $weightKg = max(1, ceil($weight / 1000)); // round up weight in kg

        $baseRates = [
            'jne' => ['reg' => 15000, 'oke' => 12000, 'yes' => 25000],
            'pos' => ['reg' => 13000, 'nextday' => 22000],
            'tiki' => ['reg' => 14000, 'eco' => 11000, 'ons' => 24000],
        ];

        $courierLower = strtolower($courier);
        
        // Adjust base rates by province proximity to East Java (Batu)
        $multiplier = 1.0;
        if ($province === 'Jawa Timur') {
            $multiplier = 0.6; // Local cheaper rate (e.g. 9,000 IDR)
        } elseif (in_array($province, ['Jawa Tengah', 'DI Yogyakarta'])) {
            $multiplier = 0.9;
        } elseif (in_array($province, ['DKI Jakarta', 'Jawa Barat', 'Banten', 'Bali'])) {
            $multiplier = 1.2;
        } elseif (in_array($province, ['Nusa Tenggara Barat (NTB)', 'Sumatera Barat', 'Sumatera Utara', 'Riau', 'Kepulauan Riau', 'Jambi', 'Bengkulu', 'Sumatera Selatan', 'Bangka Belitung', 'Lampung', 'Kalimantan Barat', 'Kalimantan Tengah', 'Kalimantan Selatan', 'Kalimantan Timur', 'Kalimantan Utara'])) {
            $multiplier = 2.0; // Medium distance (e.g. 30,000 IDR)
        } else {
            $multiplier = 3.2; // Far distance / Papua / Maluku / NTT (e.g. 48,000 IDR)
        }

        $costs = [];
        if (isset($baseRates[$courierLower])) {
            foreach ($baseRates[$courierLower] as $serviceName => $baseValue) {
                $finalValue = (int)(round($baseValue * $multiplier / 1000) * 1000); // round to nearest thousand
                $finalValue = $finalValue * $weightKg;

                $costs[] = [
                    'service' => strtoupper($serviceName),
                    'description' => 'Layanan ' . strtoupper($serviceName) . ' (Fallback Jarak)',
                    'cost' => [
                        [
                            'value' => $finalValue,
                            'etd' => $province === 'Jawa Timur' ? '1-2' : ($multiplier > 2.0 ? '4-7' : '2-4'),
                            'note' => ''
                        ]
                    ]
                ];
            }
        }

        return [
            [
                'code' => $courierLower,
                'name' => strtoupper($courier),
                'costs' => $costs
            ]
        ];
    }

    private function getProvinceByCityId($cityId)
    {
        $filePath = database_path('data/cities.json');
        if (file_exists($filePath)) {
            try {
                $content = file_get_contents($filePath);
                $data = json_decode($content, true);
                $cities = $data['rajaongkir']['results'] ?? [];
                foreach ($cities as $city) {
                    if ((int)$city['city_id'] === (int)$cityId) {
                        return $city['province'];
                    }
                }
            } catch (\Exception $e) {
                // Ignore
            }
        }
        return 'Jawa Timur'; // default
    }
}
