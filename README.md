# WordPress Block Development Template

A clean, scalable template for WordPress custom block development based on modern best practices.

## File Structure

```
your-block-name/
├── README.md
├── block.json
├── index.js
├── edit.js
├── editor.scss
├── style.scss
├── view.js
├── render.php
├── icons/
│   └── block-icon.svg
├── lib/
│   ├── autoload.php
│   └── Helpers/
│       └── BlockHelpers.php
└── scripts/
    ├── index.js
    ├── admin-controls/
    │   └── ControlsPanel.js
    └── utils/
        ├── BlockConstants.js
        ├── BlockControls.js
        ├── BlockHelpers.js
        └── BlockVariations.js
```

## Usage Instructions

1. **Replace placeholders**: Search and replace these throughout all files:
   - `your-namespace` → your actual namespace
   - `your-block-name` → your block name
   - `your-textdomain` → your text domain
   - `your-category` → your block category
   - `YourNamespace` → your PHP namespace

2. **Customize attributes**: Add your specific attributes to `block.json`

3. **Add your logic**: Implement your specific functionality in the respective files

4. **Style your block**: Add CSS in `style.scss` and `editor.scss`

5. **Add controls**: Customize the admin controls in `ControlsPanel.js`

6. **Implement helpers**: Add your PHP helper functions in `BlockHelpers.php`

## Features Included

- ✅ Modern WordPress block structure
- ✅ PSR-4 autoloader for PHP classes
- ✅ Modular JavaScript architecture
- ✅ Sidebar controls setup
- ✅ Inner blocks support
- ✅ Server-side rendering
- ✅ Frontend JavaScript ready
- ✅ SCSS styling setup
- ✅ Block variations support
- ✅ Helper utilities
- ✅ Clean separation of concerns

This template provides a solid foundation for any WordPress block development project while maintaining scalability and best practices.