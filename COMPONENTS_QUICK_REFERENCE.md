# 🎯 BagVerse Components - Quick Reference

## Component Overview

This guide provides quick reference for all new and updated components in the BagVerse UI system.

---

## 📦 Core Components

### 1. **Navbar** (`src/components/Navbar.jsx`)
**Purpose**: Main navigation with search, cart, and user menu

**Props:**
```typescript
{
  loggedIn: boolean;      // Show user/login options
  isAdmin: boolean;       // Show admin menu (optional)
}
```

**Features:**
- Search functionality (placeholder)
- Cart icon with badge count
- User dropdown menu
- Mobile hamburger menu
- Logo display
- Responsive design

**Usage:**
```jsx
import Navbar from "../components/Navbar";

<Navbar loggedIn={true} isAdmin={false} />
```

**Styling:**
```
Background: White with subtle shadow
Logo section: Black text
Hover effects: Gold (#d4a574)
Badge: Gold background (#d4a574)
```

---

### 2. **Logo** (`src/components/Logo.jsx`)
**Purpose**: SVG logo for BagVerse brand

**Props:**
```typescript
{
  size: number;           // Default: 40px
  className: string;      // Additional CSS classes
}
```

**Features:**
- Scalable SVG
- Bag design with premium feel
- Can be used anywhere in the site

**Usage:**
```jsx
import Logo from "../components/Logo";

<Logo size={40} />
<Logo size={60} className="hover:opacity-80" />
```

---

### 3. **HeroBanner** (`src/components/HeroBanner.jsx`)
**Purpose**: Eye-catching hero section with CTA buttons

**Props:** None

**Features:**
- Animated gradient background
- Call-to-action buttons
- Feature highlights (3 items)
- Scroll indicator
- Fully responsive
- Auto-animations

**Usage:**
```jsx
import HeroBanner from "../components/HeroBanner";

<>
  <Navbar {...props} />
  <HeroBanner />
  <ProductGrid {...props} />
</>
```

**Customization:**
Edit the brand tagline and description in `src/constants/branding.js`

---

### 4. **ProductCard** (`src/components/ProductCard.jsx`)
**Purpose**: Display individual product with purchase options

**Props:**
```typescript
{
  product: {
    _id: string;
    name: string;
    price: number;
    image: string;        // Base64 encoded
    bgcolor: string;      // Background color
    description?: string;
    discount?: number;
  }
}
```

**Features:**
- Image hover zoom effect
- Star rating (mock data)
- Price with discount display
- "New" badge
- Quick add-to-cart on hover
- Buy now button
- Toast notifications
- Loading state

**Usage:**
```jsx
import ProductCard from "../components/ProductCard";

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {products.map(product => (
    <ProductCard key={product._id} product={product} />
  ))}
</div>
```

**Styling:**
```
Card: Rounded corners, shadow, hover lift effect
Rating: Yellow stars
Price: Large bold text (#1a1a1a)
Discount: Green text
Badge: Red background
Buttons: Black background, white text
```

---

### 5. **CartItem** (`src/components/CartItem.jsx`)
**Purpose**: Display item in shopping cart

**Props:**
```typescript
{
  item: {
    _id: string;
    name: string;
    price: number;
    image: string;
    bgcolor: string;
    discount?: string;
  };
  onCartUpdate: () => void;  // Callback to refresh cart
}
```

**Features:**
- Horizontal layout
- Quantity adjuster
- Price breakdown
- Remove button
- Loading state for removal

**Usage:**
```jsx
import CartItem from "../components/CartItem";

{cartItems.map(item => (
  <CartItem 
    key={item._id} 
    item={item} 
    onCartUpdate={fetchCart}
  />
))}
```

---

### 6. **Footer** (`src/components/Footer.jsx`)
**Purpose**: Website footer with links and information

**Props:** None

**Features:**
- 4-section layout:
  1. Brand info + social links
  2. Quick links
  3. Support links
  4. Newsletter signup
- Responsive grid
- Legal links
- Social media icons

**Usage:**
```jsx
import Footer from "../components/Footer";

<>
  {/* Page content */}
  <Footer />
</>
```

---

### 7. **Skeleton** (`src/components/Skeleton.jsx`)
**Purpose**: Loading placeholder for products

**Components:**
- `ProductSkeleton` - Single item skeleton
- `SkeletonGrid` - Grid of skeletons

**Props:**
```typescript
// SkeletonGrid only
{
  count: number;  // Number of skeletons to show (default: 8)
}
```

**Features:**
- Shimmer animation
- Matches ProductCard layout
- Responsive grid

**Usage:**
```jsx
import { SkeletonGrid, ProductSkeleton } from "../components/Skeleton";

// Full grid
{loading ? (
  <SkeletonGrid count={8} />
) : (
  <ProductGrid products={products} />
)}

// Single item
<ProductSkeleton />
```

---

## 🎨 Styling Components

### Tailwind Custom Classes

#### Buttons
```jsx
// Primary button
<button className="btn-primary">Click me</button>

// Secondary button  
<button className="btn-secondary">Secondary</button>

// Outline button
<button className="btn-outline">Outline</button>
```

#### Cards
```jsx
// Card with shadow
<div className="card-shadow p-6">
  Content here
</div>
```

#### Badges
```jsx
// Gold badge
<span className="badge badge-gold">New</span>

// Success badge
<span className="badge badge-success">In Stock</span>
```

---

## 🎯 Color System Usage

### Import Colors
```jsx
import { COLORS, BRAND } from "../constants/branding";

// In components
<div style={{ color: COLORS.primary }}>
  {BRAND.name}
</div>
```

### Color Variables
```
COLORS.primary       // #1a1a1a - Deep Black
COLORS.secondary     // #d4a574 - Gold
COLORS.accent        // #8b6f47 - Bronze
COLORS.white         // #ffffff
COLORS.lightGray     // #f5f5f5
COLORS.success       // #10b981 - Green
COLORS.error         // #ef4444 - Red
COLORS.warning       // #f59e0b - Amber
COLORS.info          // #3b82f6 - Blue
```

---

## 🎬 Animation Utilities

### Available Animations
```jsx
// Slide from top
<div className="animate-slideInFromTop">Content</div>

// Fade in
<div className="animate-fadeIn">Content</div>

// Scale up
<div className="animate-scaleUp">Content</div>

// Shimmer (loading)
<div className="animate-shimmer">Loading...</div>
```

### Animation Timing
- Fast: 150ms
- Normal: 300ms
- Slow: 500ms

---

## 📱 Responsive Patterns

### Grid Layouts
```jsx
// Responsive grid - 1 col mobile, 2 tablet, 4 desktop
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

### Flex Layouts
```jsx
// Responsive flex
<div className="flex flex-col sm:flex-row gap-4">
  <div className="flex-1">Left</div>
  <div className="flex-1">Right</div>
</div>
```

### Width Classes
```jsx
// Max width container
<div className="max-w-7xl mx-auto">
  Content stays within 1280px on large screens
</div>
```

---

## 🎯 Form Components

### Input Styling
```jsx
<input
  className="px-4 py-3 border border-gray-200 rounded-lg 
             focus:outline-none focus:ring-2 focus:ring-gray-900 
             transition"
  type="text"
/>
```

### Button Styling
```jsx
<button 
  className="px-6 py-3 bg-gray-900 text-white font-bold 
             rounded-lg hover:bg-gray-800 
             transform hover:scale-105 active:scale-95 
             transition-all duration-200"
>
  Click me
</button>
```

---

## 🔔 Notifications

### Toast Messages
Used for success/error feedback:

```jsx
// Success
<div className="fixed top-5 left-1/2 -translate-x-1/2 
              bg-green-500 text-white px-6 py-3 rounded-lg 
              z-50 font-semibold shadow-lg 
              animate-slideInFromTop">
  ✓ Success message
</div>

// Error
<div className="fixed top-5 left-1/2 -translate-x-1/2 
              bg-red-500 text-white px-6 py-3 rounded-lg 
              z-50 font-semibold shadow-lg 
              animate-slideInFromTop">
  ⚠️ Error message
</div>
```

---

## 📐 Spacing Guidelines

### Padding
```
px-2 = 0.5rem
px-3 = 0.75rem
px-4 = 1rem
px-6 = 1.5rem
px-8 = 2rem
```

### Margins
```
mb-2 = 0.5rem margin-bottom
mb-4 = 1rem
mb-6 = 1.5rem
mb-8 = 2rem
``

### Gaps (Flex/Grid)
```
gap-2 = 0.5rem
gap-4 = 1rem
gap-6 = 1.5rem
gap-8 = 2rem
```

---

## 🎨 Shadow Effects

### Box Shadow Classes
```
shadow-soft       // Subtle shadow
box-shadow.soft   // 0 2px 8px rgba(0, 0, 0, 0.1)
card-shadow       // Hover shadow effect
shadow-lg         // Large shadow (Tailwind default)
shadow-2xl        // Extra large shadow
```

---

## ✅ Accessibility Features

### Semantic HTML
- Use proper heading hierarchy (h1, h2, h3)
- Alt text on all images
- ARIA labels where needed

### Color Contrast
- All text meets WCAG AA standards
- Don't rely on color alone for information

### Keyboard Navigation
- All buttons/links are keyboard accessible
- Focus states clearly visible

### Screen Readers
- Meaningful link text
- Form labels associated with inputs
- ARIA attributes for complex components

---

## 🚀 Performance Tips

1. **Lazy Load Images**
   ```jsx
   <img loading="lazy" src={url} alt="description" />
   ```

2. **Use Skeletons**
   - Show loading skeleton while fetching data
   - Better perceived performance

3. **Memoize Components**
   ```jsx
   export default React.memo(ProductCard);
   ```

4. **Optimize Renders**
   - Use useCallback for event handlers
   - Avoid inline arrow functions in props

---

## 🔗 Related Files

- **Design Tokens**: `src/constants/branding.js`
- **Global Styles**: `src/index.css`
- **Tailwind Config**: `tailwind.config.js`
- **Full Guide**: `src/UI_DESIGN_GUIDE.md`

---

## 📝 Common Patterns

### Loading State
```jsx
{loading ? (
  <SkeletonGrid count={8} />
) : error ? (
  <ErrorMessage error={error} />
) : items.length === 0 ? (
  <EmptyState />
) : (
  <ItemGrid items={items} />
)}
```

### Success Toast
```jsx
const [success, setSuccess] = useState("");

setTimeout(() => setSuccess(""), 2000);

{success && (
  <div className="fixed top-5 left-1/2 -translate-x-1/2 
                   bg-green-500 text-white px-6 py-3 
                   rounded-lg animate-slideInFromTop">
    {success}
  </div>
)}
```

### Responsive Container
```jsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content stays properly padded on all screen sizes */}
</div>
```

---

## 🎉 Next Steps

1. Review the components in your IDE
2. Explore each page to see components in action
3. Check `src/constants/branding.js` to customize colors
4. Modify component texts and styles as needed
5. Extend components for your specific needs

**Happy coding! 🚀**
