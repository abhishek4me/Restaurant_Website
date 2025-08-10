import React, { useEffect, useState } from 'react';
import { Phone, MapPin, Clock, Send, Mail, Coffee, UtensilsCrossed, Cookie } from 'lucide-react';
import './App.css';

function App() {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href')!);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    return () => observer.disconnect();
  }, []);

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Thank you for your message! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      setFormErrors({});
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-lg z-50 transition-all duration-300">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="https://i.ibb.co/k6vC9ZMf/logo.png" alt="Cafe Taxido Logo" className="navbar-logo h-12 w-12 object-contain" />
              <div>
                <h1 className="text-2xl font-dancing text-primary-gold">Cafe Taxido</h1>
                <p className="text-xs text-dark-brown font-medium">CAFE & BISTRO</p>
              </div>
            </div>
            <div className="hidden md:flex space-x-8">
              {['specials', 'founder', 'about', 'menu', 'contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="text-dark-brown hover:text-primary-gold transition-colors duration-300 font-medium uppercase tracking-wide"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section relative h-screen flex items-center justify-center text-white">
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-dancing mb-4 animate-fade-in-up">
            Cafe Taxido
          </h1>
          <p className="text-2xl md:text-3xl font-light mb-6 tracking-wider">
            CAFE & BISTRO
          </p>
          <p className="text-xl md:text-2xl mb-8 font-light">
            TRIVANDRUM | KOCHI
          </p>
          <div className="bg-primary-gold/90 backdrop-blur-sm rounded-lg p-6 inline-block">
            <p className="text-dark-brown font-semibold text-lg flex items-center justify-center">
              <Phone className="mr-3 h-5 w-5" />
              For orders call: 09876543210
            </p>
          </div>
        </div>
      </section>

      {/* Meet the Founder Section */}
      <section 
        id="founder" 
        className={`py-20 bg-gray-50 transition-opacity duration-1000 ${isVisible.founder ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-dancing text-dark-brown mb-4">Meet the Founder</h2>
            <div className="w-24 h-1 bg-primary-gold mx-auto"></div>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-5 gap-12 items-center">
              <div className="md:col-span-2">
                <div className="founder-image-container">
                  <img 
                    src="https://i.ibb.co/6RFz8PQ8/owner.png" 
                    alt="Al Bin Karan - Founder"
                    className="w-full max-w-sm mx-auto rounded-2xl shadow-2xl object-cover aspect-square"
                  />
                </div>
              </div>
              <div className="md:col-span-3">
                <div className="founder-content">
                  <h3 className="text-3xl font-dancing text-primary-gold mb-6">Al BIN KARAN</h3>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p className="text-lg">
                      Al Bin Karan, the visionary behind Cafe Taxido, started his journey with a simple dream—to bring authentic artisan coffee culture to Kerala. After years of traveling across Europe and learning traditional coffee brewing techniques, Al returned to his homeland with a passion to create a space where premium coffee meets local hospitality.
                    </p>
                    <p className="text-lg">
                      From a small corner shop in Trivandrum to now having locations in both Trivandrum and Kochi, his dedication to quality and community has made Cafe Taxido a beloved destination for coffee enthusiasts.
                    </p>
                  </div>
                  <div className="mt-8 flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center">
                      <Coffee className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-dark-brown">Founder & Head Barista</p>
                      <p className="text-gray-600">European Coffee Specialist</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Specials Section */}
      <section 
        id="specials" 
        className={`py-20 bg-cream transition-opacity duration-1000 ${isVisible.specials ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-dancing text-dark-brown mb-4">Our Specials</h2>
            <div className="w-24 h-1 bg-primary-gold mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Artisan Coffee",
                image: "https://i.ibb.co/4nhL64Fz/artisan-coffee.jpg",
                text: "Discover our signature coffee blends—expertly roasted beans from around the world, crafted to perfection with our state-of-the-art espresso machines, delivering an unforgettable coffee experience.",
                icon: Coffee
              },
              {
                title: "Gourmet Sandwiches",
                image: "https://i.ibb.co/DPnTkSY9/gourmet-sandwich.jpg",
                text: "Experience our handcrafted gourmet sandwiches—fresh artisan bread filled with premium ingredients that will elevate your lunch experience to new heights.",
                icon: UtensilsCrossed
              },
              {
                title: "Fresh Pastries",
                image: "https://i.ibb.co/gLSXRk6k/fresh-pastries.jpg",
                text: "Savor our daily-baked pastries—European-inspired delicacies made with the finest ingredients that will transport your taste buds to a Parisian cafe.",
                icon: Cookie
              }
            ].map((special, index) => (
              <div key={index} className="special-card group">
                <div className="relative overflow-hidden rounded-t-xl">
                  <img 
                    src={special.image} 
                    alt={special.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <special.icon className="h-8 w-8 mb-2" />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-b-xl shadow-lg">
                  <h3 className="text-2xl font-dancing text-dark-brown mb-4">{special.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{special.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about" 
        className={`py-20 bg-white relative transition-opacity duration-1000 ${isVisible.about ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="absolute inset-0 opacity-5">
          <img 
            src="https://i.ibb.co/43nPvvG/hero-coffee-art.jpg" 
            alt="Coffee Art"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-dancing text-dark-brown mb-8">About Cafe Taxido</h2>
            <div className="w-24 h-1 bg-primary-gold mx-auto mb-12"></div>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Welcome to Cafe Taxido, where artisan coffee meets contemporary dining. With locations in Trivandrum and Kochi, our menu showcases a perfect blend of global cafe culture and local flavors. From specialty coffee drinks to gourmet light meals, our skilled baristas and chefs create exceptional experiences using premium ingredients. Immerse yourself in a cozy atmosphere and join us at Cafe Taxido for an extraordinary cafe journey.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Coffee className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-dark-brown mb-2">Premium Quality</h4>
                <p className="text-gray-600">Only the finest beans and ingredients</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-dark-brown mb-2">Two Locations</h4>
                <p className="text-gray-600">Trivandrum and Kochi</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-dark-brown mb-2">Expert Craft</h4>
                <p className="text-gray-600">Skilled baristas and chefs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section 
        id="menu" 
        className={`py-20 bg-cream transition-opacity duration-1000 ${isVisible.menu ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-dancing text-dark-brown mb-4">Our Menu</h2>
            <div className="w-24 h-1 bg-primary-gold mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {[
              {
                title: "COFFEE & BEVERAGES",
                items: [
                  { name: "Espresso", price: "Rs. 80/-" },
                  { name: "Americano", price: "Rs. 90/-" },
                  { name: "Cappuccino", price: "Rs. 120/-" },
                  { name: "Latte", price: "Rs. 130/-" },
                  { name: "Mocha", price: "Rs. 150/-" }
                ]
              },
              {
                title: "BREAKFAST",
                items: [
                  { name: "Avocado Toast", price: "Rs. 180/-" },
                  { name: "French Toast", price: "Rs. 160/-" },
                  { name: "Pancakes", price: "Rs. 170/-" },
                  { name: "Croissant Sandwich", price: "Rs. 200/-" }
                ]
              },
              {
                title: "SANDWICHES & WRAPS",
                items: [
                  { name: "Club Sandwich", price: "Rs. 220/-" },
                  { name: "Grilled Chicken Wrap", price: "Rs. 200/-" },
                  { name: "Veggie Panini", price: "Rs. 180/-" }
                ]
              },
              {
                title: "PASTRIES & DESSERTS",
                items: [
                  { name: "Chocolate Croissant", price: "Rs. 80/-" },
                  { name: "Blueberry Muffin", price: "Rs. 70/-" },
                  { name: "Cheesecake Slice", price: "Rs. 120/-" },
                  { name: "Tiramisu", price: "Rs. 140/-" }
                ]
              }
            ].map((category, index) => (
              <div key={index} className="menu-category">
                <h3 className="text-2xl font-dancing text-primary-gold mb-6 border-b-2 border-primary-gold pb-2">
                  {category.title}
                </h3>
                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex justify-between items-center py-2 hover:bg-white/50 transition-colors duration-300 px-4 rounded">
                      <span className="text-dark-brown font-medium">{item.name}</span>
                      <span className="text-primary-gold font-semibold">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        className={`py-20 bg-white transition-opacity duration-1000 ${isVisible.contact ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-dancing text-dark-brown mb-4">Contact Us</h2>
            <div className="w-24 h-1 bg-primary-gold mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="contact-info-card">
                <h3 className="text-2xl font-dancing text-primary-gold mb-6">Get In Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Phone className="h-6 w-6 text-primary-gold mt-1" />
                    <div>
                      <p className="font-semibold text-dark-brown">Phone</p>
                      <p className="text-gray-600">09876543210</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mail className="h-6 w-6 text-primary-gold mt-1" />
                    <div>
                      <p className="font-semibold text-dark-brown">Email</p>
                      <p className="text-gray-600">info@cafetaxido.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="contact-info-card">
                <h3 className="text-2xl font-dancing text-primary-gold mb-6">Our Locations</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-dark-brown flex items-center mb-2">
                      <MapPin className="h-5 w-5 text-primary-gold mr-2" />
                      Trivandrum Location
                    </h4>
                    <p className="text-gray-600 ml-7">MG Road, Trivandrum<br />Kerala 695001</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark-brown flex items-center mb-2">
                      <MapPin className="h-5 w-5 text-primary-gold mr-2" />
                      Kochi Location
                    </h4>
                    <p className="text-gray-600 ml-7">Marine Drive, Kochi<br />Kerala 682031</p>
                  </div>
                </div>
              </div>
              
              <div className="contact-info-card">
                <h3 className="text-2xl font-dancing text-primary-gold mb-6">Opening Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-dark-brown font-medium">Monday - Friday</span>
                    <span className="text-gray-600">7:00 AM - 9:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark-brown font-medium">Saturday</span>
                    <span className="text-gray-600">8:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark-brown font-medium">Sunday</span>
                    <span className="text-gray-600">8:00 AM - 8:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="contact-form">
              <h3 className="text-2xl font-dancing text-primary-gold mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold transition-all duration-300 ${
                      formErrors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                </div>
                
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold transition-all duration-300 ${
                      formErrors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                </div>
                
                <div>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold transition-all duration-300 resize-none ${
                      formErrors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.message && <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>}
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-primary-gold text-white py-3 px-6 rounded-lg hover:bg-primary-gold/90 transition-colors duration-300 font-semibold flex items-center justify-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-brown text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img src="https://i.ibb.co/k6vC9ZMf/logo.png" alt="Cafe Taxido Logo" className="h-10 w-10 object-contain" />
            <div>
              <h1 className="text-xl font-dancing text-primary-gold">Cafe Taxido</h1>
              <p className="text-xs text-gray-300">CAFE & BISTRO</p>
            </div>
          </div>
          <p className="text-gray-300 mb-2">TRIVANDRUM | KOCHI</p>
          <p className="text-sm text-gray-400">© 2024 Cafe Taxido. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
