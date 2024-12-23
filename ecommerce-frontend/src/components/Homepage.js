import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, ChevronRight } from 'lucide-react';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories] = useState(['Gift Boxes', 'Books', 'Stationery']);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [currentView, setCurrentView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [currentCategory]);

  const fetchProducts = async () => {
    try {
      let response;
      if (currentCategory === 'all') {
        response = await fetch('http://localhost:5000/get-product');
      } else {
        response = await fetch('http://localhost:5000/product/category', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ category: currentCategory }),
        });
      }
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const navigateTo = (view, product = null) => {
    setCurrentView(view);
    if (product) {
      setSelectedProduct(product);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <button 
                onClick={() => navigateTo('home')} 
                className="text-2xl font-bold text-gray-900"
              >
                HandMade Love
              </button>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setCurrentCategory(category)}
                  className={`text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium ${
                    currentCategory === category ? 'bg-gray-100' : ''
                  }`}
                >
                  {category}
                </button>
              ))}
            </nav>
            
            <div className="flex items-center">
              <button onClick={() => navigateTo('cart')} className="p-2">
                <ShoppingCart className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setCurrentCategory(category);
                  setIsMenuOpen(false);
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 w-full text-left"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Hero Section */}
      {currentView === 'home' && (
        <div className="relative bg-gray-50">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                Handcrafted with Love
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                Discover unique handmade gifts and stationery items that bring joy to every occasion
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {currentView === 'home' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <button
                  key={product._id}
                  onClick={() => navigateTo('product', product)}
                  className="group text-left"
                >
                  <div className="relative bg-white rounded-lg shadow-sm overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                      <img
                        src="/api/placeholder/400/400"
                        alt={product.name}
                        className="w-full h-64 object-cover object-center"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-lg font-semibold text-gray-900">
                          ₹{product.price}
                        </p>
                        <div className="text-sm text-gray-500">
                          {product.inStockValue > 0 ? (
                            <span className="text-green-600">In Stock</span>
                          ) : (
                            <span className="text-red-600">Out of Stock</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Product Detail View */}
      {currentView === 'product' && selectedProduct && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button 
            onClick={() => navigateTo('home')}
            className="mb-8 text-indigo-600 hover:text-indigo-800 flex items-center"
          >
            <ChevronRight className="h-4 w-4 rotate-180" />
            Back to Products
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg overflow-hidden">
              <img
                src="/api/placeholder/600/600"
                alt={selectedProduct.name}
                className="w-full h-96 object-cover object-center"
              />
            </div>
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900">{selectedProduct.name}</h1>
              <p className="text-xl text-gray-900">₹{selectedProduct.price}</p>
              <p className="text-gray-600">{selectedProduct.description}</p>
              <div className="text-sm text-gray-500">
                {selectedProduct.inStockValue > 0 ? (
                  <span className="text-green-600">In Stock</span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </div>
              <button 
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition-colors"
                onClick={() => navigateTo('cart')}
                disabled={selectedProduct.inStockValue <= 0}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart View */}
      {currentView === 'cart' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold mb-8">Shopping Cart</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-500">Your cart is empty</p>
            <button 
              onClick={() => navigateTo('home')}
              className="mt-4 text-indigo-600 hover:text-indigo-800"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">About Us</h3>
              <p className="mt-4 text-gray-600">
                We create beautiful handmade gifts and stationery items with love and care.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
              <ul className="mt-4 space-y-2">
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => setCurrentCategory(category)}
                      className="text-gray-600 hover:text-gray-900 flex items-center"
                    >
                      <ChevronRight className="h-4 w-4 mr-1" />
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Contact</h3>
              <div className="mt-4 text-gray-600">
                <p>Email: contact@handmadelove.com</p>
                <p className="mt-2">Phone: +91 123 456 7890</p>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-center text-gray-600">
              © 2024 HandMade Love. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;