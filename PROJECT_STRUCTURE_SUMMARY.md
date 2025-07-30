# Project Structure Summary

This document summarizes the most important files and folders in the `src/` directory of the Phoenix theme project.

---

## 1. `src/pug/` (HTML Templates)
- **index.pug**: Main entry point for the homepage.
- **coming-soon.pug, upcoming.pug, widgets.pug, showcase.pug, changelog.pug**: Standalone pages for various features.
- **pages/**: Contains subpages like `starter.pug`, `timeline.pug`, `members.pug`, `notifications.pug`, and more, organized by feature (e.g., pricing, faq, landing, errors, authentication).
- **modules/**: Contains reusable modules (e.g., tables, icons, forms, components, etc.).
- **mixins/**: Contains PUG mixins for reusable template logic.
- **layouts/**: Layout templates (e.g., `LayoutTheme.pug`, `LayoutTrip.pug`, `LayoutHotel.pug`, etc.) and the main layout (`Layout.pug`).
- **documentation/**: Documentation pages and customization guides.
- **demo/**, **dashboard/**, **apps/**: Demo, dashboard, and app-specific templates.

## 2. `src/scss/` (Stylesheets)
- **theme.scss**: Main theme stylesheet.
- **user.scss**: Place for your custom SCSS code.
- **_user-variables.scss**: Place for your custom SCSS variables.
- **_bootstrap.scss**: Bootstrap overrides or extensions.
- **theme/**: Contains many partials (e.g., `_variables.scss`, `_navbar.scss`, `_utilities.scss`, etc.) for different theme components and features.

## 3. `src/js/` (JavaScript)
- **phoenix.js**: Main JavaScript entry point for the theme.
- **config.js**: Configuration for theme scripts.
- **utils.js**: Utility functions used across scripts.
- **docs.js**: Documentation-related scripts.
- **theme/**: Contains scripts for theme features (e.g., `theme-control.js`, `revenue-map.js`, `googleMap.js`, etc.), as well as subfolders for charts, calendar, file-manager, ganttchart, etc.
- **pages/**: Page-specific scripts (e.g., `stock-details.js`, `crm-dashboard.js`, `ecommerce-dashboard.js`, etc.).
- **data/**: Large data files (e.g., `stock-data.js`, `data.js`) used for demos or charts.

---

This structure allows you to easily locate and modify templates, styles, and scripts for any part of the theme. For customizations, focus on `src/pug/` for HTML, `src/scss/user.scss` and `src/scss/_user-variables.scss` for styles, and `src/js/` for JavaScript logic.