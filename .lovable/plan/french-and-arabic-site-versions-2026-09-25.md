# French and Arabic site versions

## What will change
- Add a visible French/Arabic language switcher in the shared header.
- Translate the home, products, about, contact, navigation, footer, product categories, product details, and fallback messages.
- Keep the chosen language while visitors move between pages and after refresh.
- Switch the full document to right-to-left layout for Arabic while preserving the current visual style.
- Keep all prices in Moroccan dirham.

## Technical details
- Add a lightweight shared language provider and centralized translation content; no new service or database is needed.
- Set the document `lang` and `dir` attributes whenever the language changes.
- Extend product and category content with French and Arabic labels.
- Add language-aware page metadata where the browser allows it.
- Validate desktop and mobile layouts, Arabic direction, navigation, filtering, and current build status.
