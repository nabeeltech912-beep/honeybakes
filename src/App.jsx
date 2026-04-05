import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, Star, Plus, ShieldCheck, Truck, Clock, Heart, Mail, Phone, MapPin, X, Trash2, CheckCircle2, Sun, Moon, LogIn, FileText, User } from 'lucide-react';
import AuthModal from './AuthModal';
import OrdersModal from './OrdersModal';

const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const CATEGORIES = ["All Cakes", "Chocolate", "Fruit", "Wedding", "Cupcakes"];

const CAKE_IMAGES = [
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1621303837174-89787a7d4729?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519340333755-56e9c1d04579?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
];

const CAKE_NAMES = [
  "Premium Chocolate Truffle",
  "Strawberry Delight Splash",
  "Vanilla Bean Cupcakes",
  "Mixed Berry Forest Cake",
  "Classic Vanilla Slice",
  "New York Style Cheesecake",
  "Elegant Wedding Cake",
  "Red Velvet Royal Cake",
  "Pink Macaron Cake",
  "Raspberry Blossom Cake"
];

const CAKE_CATEGORIES = [
  "Chocolate", "Fruit", "Cupcakes", "Fruit", "All Cakes", "All Cakes", "Wedding", "All Cakes", "Cupcakes", "Fruit"
];

const FAQ_DATA = [
  {
    question: "1. Does Honey Bakes in Tirupur provide vegan cakes?",
    answer: "You can get in touch with Honey Bakes during their working hours from Monday:- 6:00 am - 10:30 pm, Tuesday:- 6:00 am - 10:30 pm, Wednesday:- 6:00 am - 10:30 pm, Thursday:- 6:00 am - 10:30 pm, Friday:- 6:00 am - 10:30 pm, Saturday:- 6:00 am - 10:30 pm, Sunday:- 6:00 am - 10:30 pm to check if they provide vegan cakes."
  },
  {
    question: "2. How are cakes stored in shops?",
    answer: "The cakes in the shops are stored in a temperature-controlled refrigerator for them to last longer and taste good."
  },
  {
    question: "3. Can I order a customised cake at Honey Bakes?",
    answer: "Yes, you can order a customised cake from Honey Bakes."
  }
];

const App = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isOverlayLoading, setIsOverlayLoading] = useState(true);

  // App Auth State
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);

  useEffect(() => {
    // Check local storage for persistent login
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    if (savedUser && savedToken) {
      try { setUser(JSON.parse(savedUser)); setToken(savedToken); } catch(e){}
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsOverlayLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Generate random cake products
    const generatedProducts = CAKE_IMAGES.map((img, index) => {
      // Lower prices as requested, between 399 and 999
      const randomPrice = Math.floor(Math.random() * (999 - 399 + 1) + 399); 
      // Rating between 4.0 and 5.0
      const randomRating = (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1);
      
      return {
        id: index + 1,
        name: CAKE_NAMES[index],
        category: CAKE_CATEGORIES[index],
        image: img,
        priceValue: randomPrice,
        price: `₹${randomPrice}`,
        rating: randomRating,
        isNew: index >= 8 // Last two are new
      };
    });
    
    setProducts(generatedProducts);
  }, []);

  const addToast = (message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    addToast(`${product.name} added to cart`);
  };

  const updateQuantity = (id, change) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + change;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const cartTotalAmount = cartItems.reduce((total, item) => total + (item.priceValue * item.quantity), 0);
  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Initial Loading Overlay Animation */}
      <div className={`start-overlay ${!isOverlayLoading ? 'hide' : ''}`}>
        <div className="overlay-content">
          <Heart fill="#D47A8A" color="#D47A8A" size={64} className="heart-beat" />
          <h2 style={{fontFamily: 'Playfair Display', color: isDarkMode ? '#fff' : '#2C2A29', marginTop: '1rem', letterSpacing: '2px'}}>Honeybakes</h2>
        </div>
      </div>

      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">
          <Heart fill="#D47A8A" color="#D47A8A" />
          Honey<span>bakes</span>
        </div>
        
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#shop">Shop Cakes</a></li>
          <li><a href="#about">Our Story</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        
        <div className="nav-actions">
          <button className="cart-btn" aria-label="Toggle Dark Mode" onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>

          <button className="cart-btn" aria-label="Orders" onClick={() => token ? setIsOrdersModalOpen(true) : setIsAuthModalOpen(true)}>
            <FileText size={22} />
          </button>

          {user ? (
            <button className="cart-btn" style={{color: '#E05A7E'}} aria-label="Logout" onClick={() => {
              localStorage.removeItem('token'); localStorage.removeItem('user');
              setToken(null); setUser(null); addToast('Logged out successfully');
            }} title={`Logout (${user.name})`}>
              <User size={22} />
            </button>
          ) : (
            <button className="cart-btn" aria-label="Login" onClick={() => setIsAuthModalOpen(true)}>
              <LogIn size={22} />
            </button>
          )}

          <button className="cart-btn" aria-label="Search">
            <Search size={22} />
          </button>
          <button className="cart-btn" aria-label="Cart" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart size={22} />
            {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
          </button>
        </div>
      </nav>

      {/* Cart Sidebar Overlay */}
      <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`} onClick={() => setIsCartOpen(false)}></div>
      
      {/* Cart Sidebar */}
      <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3><ShoppingCart /> Your Cart ({cartItemCount})</h3>
          <button className="close-cart" onClick={() => setIsCartOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <ShoppingCart size={48} style={{margin: '0 auto 1rem', opacity: 0.2}} />
              <p>Your cart is empty.</p>
              <button 
                className="cta-btn" 
                style={{marginTop: '1rem', padding: '0.5rem 1.5rem'}}
                onClick={() => setIsCartOpen(false)}
              >
                Browse Cakes
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-details">
                  <h4 className="cart-item-title">{item.name}</h4>
                  <div className="cart-item-price">₹{item.priceValue * item.quantity}</div>
                  <div className="cart-item-actions">
                    <div className="qty-controls">
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>
                    <button className="remove-btn" onClick={() => removeItem(item.id)}>
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span>₹{cartTotalAmount}</span>
            </div>
            
            <button className="checkout-btn" onClick={async () => {
              if (!token) {
                setIsAuthModalOpen(true);
                return;
              }
              // Proceed with order
              const orderData = {
                orderItems: cartItems.map(item => ({ name: item.name, qty: item.quantity, price: item.priceValue, product: "64a000000000000000000000" })),
                shippingAddress: { address: 'In-Store Pickup', city: 'Tirupur', postalCode: '641606' },
                paymentMethod: 'Cash',
                totalPrice: cartTotalAmount
              };
              
              try {
                const response = await fetch('http://localhost:5000/api/v1/orders', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                  body: JSON.stringify(orderData)
                });
                const data = await response.json();
                if (data.success) {
                  setCartItems([]); setIsCartOpen(false); addToast('Order placed! Thanks.');
                  setTimeout(() => setIsOrdersModalOpen(true), 1500);
                } else {
                  addToast(data.message || 'Order failed');
                }
              } catch(err) {
                addToast('Payment/Server error.');
              }
            }}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <div className="tagline">Premium & Freshly Baked</div>
          <h1>Crafting Sweet Memories, <span>One Slice</span> at a Time.</h1>
          <p>
            Welcome to Honeybakes. Indulge in our luxurious, handcrafted cakes made with the finest ingredients. Experience elegance in every bite.
          </p>
          <button className="cta-btn" onClick={() => document.getElementById('shop').scrollIntoView({behavior: 'smooth'})}>
            Shop Now <ShoppingCart size={20} />
          </button>
        </div>
        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1542826438-bd32f43d626f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Delicious premium layered cake" 
          />
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="feature-item">
          <div className="feature-icon"><Truck size={32} color="#FFFFFF" strokeWidth={2.5} /></div>
          <h3>Free Delivery</h3>
          <p>On orders above ₹500 in city limits</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon"><ShieldCheck size={32} color="#FFFFFF" strokeWidth={2.5} /></div>
          <h3>Premium Quality</h3>
          <p>Handcrafted using exquisite ingredients</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon"><Clock size={32} color="#FFFFFF" strokeWidth={2.5} /></div>
          <h3>Same Day Delivery</h3>
          <p>Available for select signature cakes</p>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section" id="shop">
        <div className="section-header">
          <span className="section-category">Our Menu</span>
          <h2>Signature Masterpieces</h2>
          <p>Experience our elegantly crafted collection at affordable prices</p>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image-container">
                {product.isNew && <div className="product-badge">New Arrival</div>}
                <img src={product.image} alt={product.name} className="product-image" />
              </div>
              <div className="product-info">
                <div className="product-category">{product.category}</div>
                <h3 className="product-title">{product.name}</h3>
                <div className="product-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      fill={i < Math.floor(product.rating) ? "#D47A8A" : "transparent"} 
                      color={i < Math.floor(product.rating) ? "#D47A8A" : "#D1D5DB"}
                    />
                  ))}
                  <span style={{color: '#7A7571', fontSize: '0.9rem', marginLeft: '5px'}}>({product.rating})</span>
                </div>
                <div className="product-footer">
                  <div className="product-price">{product.price}</div>
                  <button className="add-to-cart" onClick={() => handleAddToCart(product)} aria-label="Add to cart">
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Masterclass Section */}
      <section className="class-section" id="about">
        <div className="class-content">
          <span className="section-category">Learn With Us</span>
          <h2>Professional Baking Masterclass</h2>
          <p>
            Join our exclusive baking teaching classes. We have successfully trained and certified over <strong>300+ students</strong>! Master the art of premium cake baking, icing, and decoration.
          </p>
          <div className="class-stats">
            <div className="stat"><h3>300+</h3><p>Certified Students</p></div>
            <div className="stat"><h3>100%</h3><p>Hands-on Training</p></div>
          </div>
          <button className="cta-btn secondary-btn" onClick={() => window.open('https://www.instagram.com/_honey_bakes_/', '_blank')}>
            Join Class <InstagramIcon size={20} />
          </button>
        </div>
        <div className="class-image">
          <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Baking Class" />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section" id="faq">
        <div className="section-header">
          <span className="section-category">Queries</span>
          <h2>Frequently Asked Questions</h2>
        </div>
        <div className="faq-container">
          {FAQ_DATA.map((faq, idx) => (
            <div className="faq-item" key={idx}>
              <h3 className="faq-question">{faq.question}</h3>
              <p className="faq-answer">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo" style={{fontSize: '1.5rem'}}>
              <Heart fill="#D47A8A" color="#D47A8A" size={24} />
              Honey<span>bakes</span>
            </div>
            <p>Making your celebrations sweeter with premium crafted cakes and desserts delivered straight to your door.</p>
            <div className="social-links">
              <a href="https://www.instagram.com/_honey_bakes_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon size={20} /></a>
              <a href="mailto:contact@honeybakes.com" aria-label="Email"><Mail size={20} /></a>
              <a href="tel:+910000000000" aria-label="Phone"><Phone size={20} /></a>
              <a href="https://share.google/nEZyoRDmJ0ip8X0BU" target="_blank" rel="noopener noreferrer" aria-label="Google Search"><MapPin size={20} /></a>
            </div>
          </div>
          
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#shop">Shop Now</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4>Visit Us</h4>
            <ul>
              <li style={{display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '1rem'}}>
                <MapPin size={18} style={{flexShrink: 0, marginTop: '3px', color: '#D47A8A'}} />
                <span style={{lineHeight: 1.4}}>42, Maruthappa Nagar, 2nd St, Vijayapuram, Tirupur-641606, Tamil Nadu</span>
              </li>
              <li style={{display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '1rem'}}>
                <Clock size={18} style={{flexShrink: 0, color: '#D47A8A'}} />
                <span>Open daily until 10:30 PM</span>
              </li>
              <li style={{display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '1.5rem'}}>
                <Star size={18} fill="#D47A8A" stroke="#D47A8A" style={{flexShrink: 0}} />
                <span>4.8/5 Rating on Justdial</span>
              </li>
            </ul>
            <div className="map-container" style={{background: 'rgba(255,255,255,0.05)', padding: '5px', borderRadius: '10px', marginTop: '10px'}}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15661.12351235!2d77.341113!3d11.108524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9078651c6c59b%3A0xea699c68ea7f2ec2!2sTiruppur%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1689100000000!5m2!1sen!2sin" 
                width="100%" 
                height="150" 
                style={{border: 0, borderRadius: '8px'}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} Honeybakes Cake Shop. All Rights Reserved.
        </div>
      </footer>

      {/* Toast Notifications */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div className="toast" key={toast.id}>
            <CheckCircle2 className="toast-icon" size={18} color="#E05A7E" />
            {toast.message}
          </div>
        ))}
      </div>

      {/* Auth & Orders Modals */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLoginSuccess={(userData, userToken) => {
          setUser(userData); setToken(userToken); addToast(`Welcome back, ${userData.name}!`);
        }} 
      />

      <OrdersModal 
        isOpen={isOrdersModalOpen}
        onClose={() => setIsOrdersModalOpen(false)}
        token={token}
        user={user}
      />
    </div>
  );
};

export default App;
