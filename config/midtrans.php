<?php

return [
    'server_key' => env('MIDTRANS_SERVER_KEY', 'Mid-server-' . 'Bv-7fKwKCzhpILdUiLQjeMkY'),
    'client_key' => env('MIDTRANS_CLIENT_KEY', 'Mid-client-' . 'ezBZO--RMFbgULU4'),
    'is_production' => env('MIDTRANS_IS_PRODUCTION', false),
    'is_sanitized' => env('MIDTRANS_IS_SANITIZED', true),
    'is_3ds' => env('MIDTRANS_IS_3DS', true),

    'snap_url' => env('MIDTRANS_IS_PRODUCTION', false)
        ? 'https://app.midtrans.com/snap/snap.js'
        : 'https://app.sandbox.midtrans.com/snap/snap.js',
];
