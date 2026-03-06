# 🎨 BagVerse - Visual Design Reference

## Color Palette

### Primary Colors
```
Deep Black (#1a1a1a)
████████████████████
Used for: Main buttons, headings, primary text
Psychology: Premium, sophisticated, professional
```

```
Warm Gold (#d4a574)
████████████████████
Used for: Accents, hover effects, badges
Psychology: Luxury, warmth, attention
```

```
Bronze Accent (#8b6f47)
████████████████████
Used for: Secondary accents, subtle highlights
Psychology: Natural, earthy, refined
```

### Neutral Colors
```
White (#ffffff)
████████████████████
Used for: Backgrounds, cards, contrast

Light Gray (#f5f5f5)
████████████████████
Used for: Alternative backgrounds, hover states

Gray (#e0e0e0)
████████████████████
Used for: Borders, dividers, light accents

Dark Gray (#6b6b6b)
████████████████████
Used for: Secondary text, disabled states
```

### Semantic Colors
```
Success Green (#10b981)
████████████████████
Used for: Success messages, checkmarks, availability

Error Red (#ef4444)
████████████████████
Used for: Errors, warnings, alerts

Warning Amber (#f59e0b)
████████████████████
Used for: Cautions, important notices

Info Blue (#3b82f6)
████████████████████
Used for: Information, tips, help text
```

---

## Typography System

### Poppins Font (Primary)
**For:** Headings, Buttons, Brand Text
```
H1: 48px, Bold (700), Letter-spacing: -1px
H2: 36px, Bold (700), Letter-spacing: -0.5px
H3: 28px, Bold (700)
H4: 24px, Bold (600)
Button: 16px, Bold (600)
```

### Inter Font (Secondary)
**For:** Body text, Descriptions
```
Body: 16px, Regular (400)
Small: 14px, Regular (400)
Caption: 12px, Regular (300)
Helper: 12px, Medium (500)
```

---

## Component Visual Guide

### Navbar
```
┌─────────────────────────────────────────────────────┐
│  🎒 BagVerse  ┅  Home  │  Shop  ┅  [Search]  │ 🛒  │
│                                                    👤  │
└─────────────────────────────────────────────────────┘
Height: 80px
Background: White (#ffffff)
Shadow: Subtle (0 2px 8px rgba(0,0,0,0.1))
```

### Hero Banner
```
╔═════════════════════════════════════════════════════╗
║                                                     ║
║           🎒 BagVerse                              ║
║    Your Style. Your Space. Your Journey.           ║
║                                                     ║
║    [Explore Collection]  [Learn More]             ║
║                                                     ║
║    Premium Design │ Quality Assured │ Fast Shipping║
║                                                     ║
╚═════════════════════════════════════════════════════╝
Background: Gradient (Black → Bronze)
Height: 400px (mobile) / Full screen (desktop)
CTA Buttons: White + Border styles
```

### Product Card
```
┌─────────────────────┐
│  📦 [Product Image] │◄─ Hover: Zoom 110%
│  [New]              │
├─────────────────────┤
│ Premium Bag         │
│ ★★★★★ 4.8 (127)    │
│                     │
│ ₹1999 ₹2499 20% OFF │
│                     │
│ [ + ]  [ Buy Now ]  │
└─────────────────────┘
Width: 100% max-widthsm:calc(50% - 12px), lg:calc(25% - 18px)
Corners: Rounded-2xl (16px)
Shadow: Responsive with hover lift
```

### Cart Item
```
┌──────────────────────────────────────────────────┐
│  📦    Product Name              Qty: 2  ₹1999  │
│  [Image] Description                    [Remove] │
│         ★★★★★ 4.8                               │
└──────────────────────────────────────────────────┘
Layout: Horizontal flex
Height: 120px
Border-bottom: Separator except last item
```

### Button Styles
```
Primary Button:
┌──────────────────┐
│ Primary Button   │  Background: #1a1a1a (Black)
└──────────────────┘  Text: White
                      Hover: #000000 (darker)
                      Scale: 105% on hover

Secondary Button:
┌──────────────────┐
│ Secondary        │  Background: #f5f5f5 (Light gray)
└──────────────────┘  Text: #8b6f47 (Bronze)
                      Border: 2px #8b6f47
                      Hover: #e0e0e0

Outline Button:
┌──────────────────┐
│ Outline          │  Background: Transparent
└──────────────────┘  Text: #1a1a1a (Black)
                      Border: 2px #1a1a1a
                      Hover: #1a1a1a bg
```

### Form Elements
```
Input Field:
┌──────────────────────────┐
│ Placeholder text...      │
└──────────────────────────┘
Border: 2px #e0e0e0
Focus: Ring 2px #1a1a1a
Padding: 12px 16px
Radius: 8px
```

### Badge Styles
```
Gold Badge:
┌─────────┐
│ New     │  Background: Gold (#d4a574)
└─────────┘  Padding: 4px 12px, Radius: 20px

Success Badge:
┌─────────┐
│ In Stock│  Background: Green (#10b981)
└─────────┘  Text: White, Radius: 20px
```

---

## Layout Grid System

### Responsive Grid Columns
```
Mobile (320px-639px):
# Product Card
# Product Card
# Product Card

Tablet (640px-1023px):
## Product Cards

Desktop (1024px-1279px):
### Product Cards

Large (1280px+):
#### Product Cards
```

### Container Widths
```
Mobile:    100% - 32px padding = ~288px
Tablet:    100% - 48px padding = ~720px
Desktop:   100% - 64px padding = ~960px
Large:     1280px max-width
```

---

## Spacing Scale

```
2px   = px-0.5
4px   = px-1
8px   = px-2
16px  = px-4
24px  = px-6
32px  = px-8
48px  = px-12
64px  = px-16
```

---

## Shadow System

```
Subtle Shadow (card-shadow):
┌─────────────┐
│             │  0 2px 8px rgba(0,0,0,0.1)
│   Content   │  Used on cards, borders
│             │
└─────────────┘

Medium Shadow:
┌─────────────┐
│             │  0 4px 16px rgba(0,0,0,0.15)
│   Content   │  Used on hover states
│             │
└─────────────┘

Large Shadow:
┌─────────────┐
│             │  0 8px 32px rgba(0,0,0,0.2)
│   Content   │  Used on modals, dropdowns
│             │
└─────────────┘
```

---

## Animation Elements

### Hover Effects
```
Buttons:
- Scale: 105%
- Opacity: 100%
- Duration: 200ms

Cards:
- Translate: -8px (lift)
- Shadow: Increase
- Duration: 300ms

Links:
- Color: Change to gold (#d4a574)
- Duration: 300ms
```

### Entrance Animations
```
Slide In (from top):
- Applied to: Navbar, modals, notifications
- Duration: 500ms
- Easing: ease-out

Fade In:
- Applied to: Content, tab changes
- Duration: 300ms
- Easing: ease-in-out

Scale Up:
- Applied to: Buttons CTA
- Duration: 300ms
- From: scale(0.95)
```

### Loading Animation
```
Shimmer (skeleton):
- Direction: Left to right
- Duration: 2s infinite
- Color: Gradient gray
- Used for: Loading states
```

---

## Responsive Font Sizes

```
H1 (Headings):
  Mobile: 24px
  Desktop: 48px

H2 (Section Headers):
  Mobile: 20px
  Desktop: 36px

Body Text:
  Mobile: 14px
  Desktop: 16px

Button:
  Mobile: 14px
  Desktop: 16px
```

---

## Breakpoint Reference

```
xs (320px): Extra small devices
sm (640px): Small phones to landscape tablet
md (768px): Tablet
lg (1024px): Desktop
xl (1280px): Large desktop
2xl (1536px): Large desktop max-width
```

---

## Icon Sizes

```
Navigation Icons:     24px (w-6 h-6)
Badges/Badges:        16px (w-4 h-4)
Hero Features:        48px (text-4xl)
Buttons:              20px (inline)
```

---

## Accessibility Guide

### Color Contrast
```
✓ Dark text on light: 7:1+ ratio
✓ Light text on dark: 7:1+ ratio
✓ All text: WCAG AA compliant

At Risk Areas:
- Gold on light backgrounds: Use darker text
- Light text on colors: Ensure sufficient contrast
```

### Focus Indicators
```
All interactive elements have:
- Focus ring: 2-3px dashed or solid
- Color: Primary (#1a1a1a)
- Offset: 2-4px from element
```

### Button Sizes
```
Minimum touch target: 44px × 44px
Recommended padding: 12px horizontal, 8px vertical
Ensures mobile accessibility
```

---

## State Indicators

### Button States
```
Normal:  bg-gray-900, text-white, cursor-pointer
Hover:   bg-gray-800, scale-105
Active:  scale-95
Disabled: opacity-50, cursor-not-allowed
Focus:   ring-2 ring-offset-2 ring-gray-900
```

### Form States
```
Valid:    border-green-500
Invalid:  border-red-500
Focus:    ring-2 ring-blue-500
Disabled: bg-gray-100, text-gray-500
```

### Loading States
```
Button Loading:  Shows spinner or "Loading..."
Card Loading:    Shows skeleton
Page Loading:    Shows skeleton grid
```

---

## Dark Mode Consideration

The current design uses **light mode** with:
- Light backgrounds (#ffffff, #f5f5f5)
- Dark text (#1a1a1a, #6b6b6b)
- Gold accents (#d4a574)

**Future Dark Mode** would invert:
- Background: #1a1a1a
- Text: #f5f5f5
- Accents: #d4a574 (same)

---

## Print Considerations

Media queries can hide:
- Navigation
- Sidebars
- Footer
- Unnecessary imagery

Keep visible:
- Product information
- Prices
- Essential images
- Order details

---

## Performance Notes

✓ CSS transforms used for animations (GPU accelerated)  
✓ No unnecessary repaints  
✓ Efficient hover states  
✓ Optimized shadows  
✓ Minimal JavaScript for animations  

---

## Conclusion

This visual reference guide covers all design aspects of BagVerse. Use these specifications as your source of truth for:

- Color consistency
- Typography hierarchy
- Component sizing
- Spacing and alignment
- Animation timing
- Accessibility compliance

**Enjoy building! 🎨**
