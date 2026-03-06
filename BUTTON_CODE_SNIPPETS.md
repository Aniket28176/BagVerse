# 🎮 Button Interactions Quick Reference

## Fast Implementation Guide

### 📋 Copy-Paste Ready Code Snippets

---

## 1️⃣ ADD TO CART BUTTON

### React Hook Implementation
```jsx
import { useState } from "react";
import axios from "axios";

// State
const [loading, setLoading] = useState(false);
const [success, setSuccess] = useState("");

// Handler
const handleAddToCart = async (productId) => {
  setLoading(true);
  try {
    await axios.post(
      'http://localhost:5000/api/cart/add',
      { productId },
      { withCredentials: true }
    );
    setSuccess("✓ Added to cart!");
    setTimeout(() => setSuccess(""), 2000);
  } catch (err) {
    setSuccess("✗ Error adding to cart");
  } finally {
    setLoading(false);
  }
};

// JSX
<button onClick={() => handleAddToCart(product._id)} disabled={loading}>
  {loading ? "Adding..." : "Add to Cart"}
</button>

{success && <div className="toast">{success}</div>}
```

---

## 2️⃣ SEARCH FUNCTIONALITY

### Search with Navigation
```jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const [searchQuery, setSearchQuery] = useState("");
const navigate = useNavigate();

const handleSearch = (e) => {
  e.preventDefault();
  if (!searchQuery.trim()) {
    alert("Please enter a search term");
    return;
  }
  navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
  setSearchQuery("");
};

// JSX
<form onSubmit={handleSearch}>
  <input 
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search products..."
  />
  <button type="submit">Search</button>
</form>
```

---

## 3️⃣ SMOOTH SCROLL TO SECTION

### Scroll-to-Element Button
```jsx
const handleLearnMore = () => {
  const element = document.querySelector('[data-shop-section]');
  element?.scrollIntoView({ behavior: 'smooth' });
};

// JSX
<button onClick={handleLearnMore}>Learn More</button>

// Add this to target section
<div data-shop-section>
  {/* Your content here */}
</div>
```

---

## 4️⃣ FORM SUBMISSION

### Login/Register Form
```jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const [formData, setFormData] = useState({ email: "", password: "" });
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);
const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const response = await axios.post(
      'http://localhost:5000/api/users/login',
      formData,
      { withCredentials: true }
    );
    navigate("/shop");
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};

const handleInputChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

// JSX
<form onSubmit={handleSubmit}>
  <input 
    name="email"
    value={formData.email}
    onChange={handleInputChange}
  />
  <input 
    name="password"
    type="password"
    value={formData.password}
    onChange={handleInputChange}
  />
  <button type="submit" disabled={loading}>
    {loading ? "Submitting..." : "Login"}
  </button>
</form>
{error && <div className="error">{error}</div>}
```

---

## 5️⃣ QUANTITY CONTROLS

### Increase/Decrease Quantity
```jsx
import { useState } from "react";

const [quantity, setQuantity] = useState(1);

const increaseQty = () => setQuantity(q => q + 1);
const decreaseQty = () => {
  if (quantity > 1) setQuantity(q => q - 1);
};

// JSX
<div className="quantity-controls">
  <button onClick={decreaseQty}>−</button>
  <span>{quantity}</span>
  <button onClick={increaseQty}>+</button>
</div>
```

---

## 6️⃣ DELETE WITH CONFIRMATION

### Delete Product
```jsx
const handleDelete = (productId) => {
  if (confirm("Are you sure you want to delete this product?")) {
    deleteProduct(productId);
  }
};

const deleteProduct = async (productId) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/products/${productId}`,
      { withCredentials: true }
    );
    alert("Product deleted successfully");
    // Refresh list
  } catch (err) {
    alert("Error deleting product");
  }
};

// JSX
<button onClick={() => handleDelete(product._id)}>Delete</button>
```

---

## 7️⃣ LOGOUT FUNCTIONALITY

### Logout Handler
```jsx
import { useNavigate } from "react-router-dom";
import axios from "axios";

const navigate = useNavigate();
const isAdmin = true; // or false for user

const handleLogout = async () => {
  try {
    const url = isAdmin 
      ? 'http://localhost:5000/api/owners/logout'
      : 'http://localhost:5000/api/users/logout';
    
    await axios.post(url, {}, { withCredentials: true });
    navigate(isAdmin ? '/admin/login' : '/auth');
  } catch (err) {
    console.error("Logout failed:", err);
  }
};

// JSX
<button onClick={handleLogout} className="logout-btn">
  Logout
</button>
```

---

## 8️⃣ TAB SWITCHING

### Tab Navigation
```jsx
import { useState } from "react";

const [activeTab, setActiveTab] = useState("login");

// JSX
<div className="tabs">
  <button 
    className={activeTab === "login" ? "active" : ""}
    onClick={() => setActiveTab("login")}
  >
    Login
  </button>
  <button 
    className={activeTab === "signup" ? "active" : ""}
    onClick={() => setActiveTab("signup")}
  >
    Sign Up
  </button>
</div>

{activeTab === "login" && <LoginForm />}
{activeTab === "signup" && <SignupForm />}
```

---

## 9️⃣ DROPDOWN MENU

### Dropdown Toggle
```jsx
import { useState } from "react";

const [showMenu, setShowMenu] = useState(false);

// JSX
<div className="dropdown">
  <button onClick={() => setShowMenu(!showMenu)}>
    Menu
  </button>
  {showMenu && (
    <div className="dropdown-items">
      <a href="#profile">Profile</a>
      <a href="#settings">Settings</a>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )}
</div>
```

---

## 🔟 MOBILE MENU

### Mobile Navigation Toggle
```jsx
import { useState } from "react";

const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

// JSX
<button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
  ☰ Menu
</button>

{mobileMenuOpen && (
  <nav className="mobile-menu">
    <a href="/shop">Shop</a>
    <a href="/cart">Cart</a>
    <a href="/account">Account</a>
  </nav>
)}
```

---

## 1️⃣1️⃣ RADIO BUTTON SELECTION

### Select Payment Method
```jsx
import { useState } from "react";

const [paymentMethod, setPaymentMethod] = useState("cod");

// JSX
<div className="payment-options">
  <label>
    <input 
      type="radio" 
      value="cod" 
      checked={paymentMethod === "cod"}
      onChange={(e) => setPaymentMethod(e.target.value)}
    />
    Cash on Delivery
  </label>
  <label>
    <input 
      type="radio" 
      value="card" 
      checked={paymentMethod === "card"}
      onChange={(e) => setPaymentMethod(e.target.value)}
    />
    Credit/Debit Card
  </label>
</div>
```

---

## 1️⃣2️⃣ SELECT DROPDOWN

### Sort Products
```jsx
import { useState, useEffect } from "react";
import axios from "axios";

const [sortBy, setSortBy] = useState("popular");

useEffect(() => {
  fetchProducts(sortBy);
}, [sortBy]);

const fetchProducts = async (sort) => {
  const res = await axios.get(`/api/products?sort=${sort}`);
  // Update products
};

// JSX
<select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
  <option value="popular">Popular</option>
  <option value="newest">Newest</option>
  <option value="priceLow">Price: Low to High</option>
  <option value="priceHigh">Price: High to Low</option>
</select>
```

---

## 1️⃣3️⃣ NEWSLETTER SUBSCRIBE

### Email Subscription
```jsx
const handleSubscribe = (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  
  if (email) {
    alert(`Thank you for subscribing with ${email}!`);
    e.target.reset();
  }
};

// JSX
<form onSubmit={handleSubscribe}>
  <input 
    type="email" 
    placeholder="Your email" 
    required 
  />
  <button type="submit">Subscribe</button>
</form>
```

---

## 1️⃣4️⃣ NAVIGATION LINKS

### Page Navigation
```jsx
import { Link, useNavigate } from "react-router-dom";

// Option 1: Using Link (for client-side navigation)
<Link to="/shop">Shop</Link>

// Option 2: Using navigate (for programmatic navigation)
const navigate = useNavigate();
const handleClick = () => navigate("/shop");
<button onClick={handleClick}>Shop</button>

// Option 3: External links
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  External Link
</a>
```

---

## 1️⃣5️⃣ LOADING STATES

### Show Loading During API Calls
```jsx
import { useState } from "react";

const [loading, setLoading] = useState(false);

const handleClick = async () => {
  setLoading(true);
  try {
    await axios.post('/api/endpoint', data);
    // Success handling
  } catch (err) {
    // Error handling
  } finally {
    setLoading(false);
  }
};

// JSX
<button disabled={loading}>
  {loading ? "Processing..." : "Submit"}
</button>
```

---

## 🎨 TAILWIND BUTTON STYLES

### Copy-Paste Button Variations

#### Primary Button
```jsx
<button className="px-6 py-2 bg-gray-900 text-white rounded-lg font-bold hover:bg-gray-800 active:scale-95 transition">
  Primary
</button>
```

#### Secondary Button
```jsx
<button className="px-6 py-2 bg-gray-100 text-gray-900 rounded-lg font-bold hover:bg-gray-200 transition">
  Secondary
</button>
```

#### Outline Button
```jsx
<button className="px-6 py-2 border-2 border-gray-900 text-gray-900 rounded-lg font-bold hover:bg-gray-900 hover:text-white transition">
  Outline
</button>
```

#### Danger Button
```jsx
<button className="px-6 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition">
  Delete
</button>
```

#### Success Button
```jsx
<button className="px-6 py-2 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition">
  Confirm
</button>
```

#### Disabled Button
```jsx
<button disabled className="px-6 py-2 bg-gray-400 text-gray-200 rounded-lg font-bold cursor-not-allowed opacity-50">
  Disabled
</button>
```

---

## 📱 RESPONSIVE BUTTONS

```jsx
// Desktop: Full width, Mobile: Stacked
<div className="flex flex-col md:flex-row gap-3">
  <button className="flex-1">Button 1</button>
  <button className="flex-1">Button 2</button>
</div>

// Mobile menu vs desktop nav
<div className="hidden md:block">
  {/* Desktop buttons */}
</div>
<div className="md:hidden">
  {/* Mobile buttons */}
</div>
```

---

## ⚡ PERFORMANCE TIPS

### 1. Memoize Button Handlers
```jsx
import { useCallback } from "react";

const handleClick = useCallback(() => {
  // Handler logic
}, [dependencies]);
```

### 2. Prevent Form Double-Submit
```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (isSubmitting) return; // Prevent multiple clicks
  
  setIsSubmitting(true);
  // API call
  setIsSubmitting(false);
};
```

### 3. Debounce Search
```jsx
import { useEffect, useState } from "react";

const [searchQuery, setSearchQuery] = useState("");

useEffect(() => {
  const timer = setTimeout(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  }, 500);

  return () => clearTimeout(timer);
}, [searchQuery]);
```

---

## 🔒 SECURITY BEST PRACTICES

### Always Use withCredentials for Auth
```jsx
await axios.post(url, data, { withCredentials: true });
```

### Validate on Client & Server
```jsx
// Client-side
if (!email || !email.includes("@")) {
  setError("Invalid email");
  return;
}

// Always validate on server too!
```

### Escape User Input
```jsx
// Don't use innerHTML
const [userInput, setUserInput] = useState("");

// Use text nodes instead
<div>{userInput}</div>
```

---

## 🧪 TESTING BUTTONS

```jsx
// Sample test
test("Add to Cart button works", () => {
  const { getByRole } = render(<ProductCard />);
  const button = getByRole("button", { name: /add to cart/i });
  
  fireEvent.click(button);
  
  expect(mockAddToCart).toHaveBeenCalled();
});
```

---

## 📊 BUTTON METRICS

- **Average Loading Time**: 200-500ms
- **Hover Response**: < 80ms
- **Animation Duration**: 200-300ms
- **API Timeout**: 10 seconds

---

## 🆘 TROUBLESHOOTING

### Button Not Responding
✅ Check: `onClick` handler is defined  
✅ Check: `disabled` prop is false  
✅ Check: Event is not prevented elsewhere  

### Loading State Not Showing
✅ Check: State is being updated  
✅ Check: Component is re-rendering  
✅ Check: Conditional rendering logic  

### API Call Not Working
✅ Check: Endpoint URL is correct  
✅ Check: Method is POST/GET/etc.  
✅ Check: Data is being sent correctly  
✅ Check: `withCredentials: true` for auth  

---

**Last Updated**: March 6, 2026  
**Version**: 1.0  
**Status**: ✅ Complete

