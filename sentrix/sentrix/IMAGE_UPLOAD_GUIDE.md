# Image Upload Guide

Your professional Navbar is ready! Follow these steps to add your custom logo and icons.

## 📁 Folder Structure

Your images should be placed in these locations:

```
sentrix/
├── public/
│   ├── logo.png          ← Main logo icon (square, 144x144px recommended)
│   ├── logo-dark.png     ← Dark theme variant (optional)
│   └── favicon.svg       ← Favicon for browser tab (optional)
│
└── src/
    └── assets/
        ├── logos/
        │   ├── sentrix-logo-full.png    (optional)
        │   ├── sentrix-logo-icon.png    (optional)
        │   └── sentrix-logo-white.png   (optional)
        │
        └── icons/
            ├── hamburger.svg     (optional - currently uses inline SVG)
            ├── menu.svg          (optional)
            └── user.svg          (optional)
```

## 🎨 Image Specifications

### Main Logo (logo.png)
- **Size:** 144x144 pixels (or square format)
- **Format:** PNG with transparency recommended
- **Usage:** Displays in navbar beside "Sentrix" text
- **Placement:** `public/logo.png`

### Favicon (favicon.svg)
- **Size:** 32x32 or 64x64 pixels
- **Format:** SVG or PNG
- **Usage:** Browser tab icon
- **Placement:** `public/favicon.svg`

### Icon Set (icons folder)
- **Size:** 24x24 pixels
- **Format:** SVG (scalable)
- **Usage:** Optional - current navbar uses inline SVGs
- **Placement:** `src/assets/icons/`

## 📤 How to Upload Images

### Option 1: Using Your IDE File Explorer
1. Open the sentrix folder in VS Code
2. Navigate to `public` folder
3. Drag and drop your `logo.png` file there
4. The navbar will automatically use it!

### Option 2: Using Terminal
```bash
# Navigate to project
cd sentrix

# Copy your image to public folder
cp /path/to/your/logo.png ./public/

# For assets folder
cp /path/to/your/icons/* ./src/assets/icons/
```

## 🎭 Where Images Are Used

### Navbar Configuration
The navbar automatically displays your images in these locations:

```jsx
// Logo Icon (beside "Sentrix" text)
<img src="/logo.png" alt="Sentrix" />

// Desktop View
├── [Logo Icon] Sentrix Dashboard
├── Navigation Items (Dashboard, Transactions, Reports, Settings)
└── User Profile + LIVE Status

// Mobile View (Hamburger Menu)
├── [Logo Icon] Sentrix Dashboard
├── Hamburger Menu Button ☰
└── Mobile Menu (shows on click)
```

## 🚀 Current Features

✅ **Responsive Design**
- Desktop: Full navigation menu
- Mobile: Hamburger menu with dropdown
- Tablet: Optimized layout

✅ **Logo Integration**
- Gradient background fallback (if image loads)
- Automatic fallback to "S" icon if image fails
- Professional branding area

✅ **User Info Display**
- User avatar with initials
- Username display
- LIVE status indicator

✅ **Animations**
- Smooth hamburger menu transitions
- Hover effects on navigation items
- Mobile menu slide-in animation

## 📋 Image Format Best Practices

### For logo.png
```
Format: PNG
Dimensions: 144x144 pixels (any square is fine)
Color Mode: RGB or RGBA (with transparency)
File Size: < 50KB recommended
DPI: 72 (web standard)
```

### For favicon.svg
```
Format: SVG (Vector)
Dimensions: Any size (SVG scales)
Color Mode: RGB
File Size: < 5KB
Compatibility: All modern browsers
```

## 🎯 Next Steps

1. **Prepare Your Images:**
   - Export logo from your designer/Figma
   - Ensure it's square aspect ratio
   - Save as PNG with transparency

2. **Place in Public Folder:**
   - Move `logo.png` to `sentrix/public/`

3. **Refresh Browser:**
   - Next time you load the app, your logo appears automatically!

4. **Test on Mobile:**
   - Check hamburger menu works
   - Verify logo displays on all screen sizes

5. **Optional Customization:**
   - Add more icons to `src/assets/icons/`
   - Create dark theme variants
   - Add additional SVG assets

## 🔧 Customization

### Changing Logo Size in Navbar
Edit `src/components/Reusable UI components/layout/Navbar.jsx`:

```jsx
// Current: 40px container with 32px image
<div className="w-10 h-10">   {/* ← Change from 10 to 12 for larger */}
    <img className="w-8 h-8" />  {/* ← Change from 8 to 10 for larger */}
</div>
```

### Navigation Items
Add more items in the navbar component:

```jsx
const navigationItems = [
    { label: "Dashboard", href: "#" },
    { label: "Transactions", href: "#" },
    { label: "Reports", href: "#" },
    { label: "Settings", href: "#" },
    // Add more here
];
```

## ⚠️ Troubleshooting

**Logo not showing?**
- Ensure file is named exactly `logo.png`
- Check it's in `public/` folder
- Hard refresh browser (Ctrl+Shift+R)
- Check browser console for 404 errors

**Image looks pixelated?**
- Use PNG format
- Ensure image is at least 144x144 pixels
- Consider using SVG for scalability

**Mobile menu overlapping?**
- The z-index is set to 50 (z-50)
- Increase if other elements overlap

**Font not showing clearly?**
- The Navbar uses system fonts (Inter, Segoe UI)
- These are web-safe fonts
- Custom fonts can be added via Google Fonts

## 📞 Support

If you need to modify the navbar further:
- Edit: `src/components/Reusable UI components/layout/Navbar.jsx`
- Styles: Modified via Tailwind CSS classes
- Icons: Inline SVG or external image files

---

**Your Navbar is production-ready!** 🎉
Just add your images and you're all set.
