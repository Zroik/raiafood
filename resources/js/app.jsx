import '../css/app.css';
import './bootstrap';

import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

function applyThemeColors(settings) {
    if (!settings) return;
    const root = document.documentElement;
    if (settings.primary_color) root.style.setProperty('--color-primary', settings.primary_color);
    if (settings.secondary_color) root.style.setProperty('--color-secondary', settings.secondary_color);
    if (settings.soft_color) root.style.setProperty('--color-soft', settings.soft_color);
    if (settings.dark_color) root.style.setProperty('--color-dark', settings.dark_color);
}

router.on('before', (event) => {
    event.detail.visit.headers = {
        ...event.detail.visit.headers,
        'ngrok-skip-browser-warning': 'true',
    };
});

router.on('navigate', (event) => {
    applyThemeColors(event.detail?.page?.props?.site_settings);
});

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        applyThemeColors(props.initialPage?.props?.site_settings);
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#843799',
    },
});
