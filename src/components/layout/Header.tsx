import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, Printer, User } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { items } = useCartStore();
  
  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Printer className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-800">PrintCraft</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-gray-600 hover:text-indigo-600 transition-colors">
              Products
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-indigo-600 transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-indigo-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleSearch}
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <Search className="h-6 w-6" />
            </button>
            <Link to="/cart" className="text-gray-600 hover:text-indigo-600 transition-colors relative">
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <Link to="/account" className="text-gray-600 hover:text-indigo-600 transition-colors hidden md:block">
              <User className="h-6 w-6" />
            </Link>
            <button 
              onClick={toggleMenu} 
              className="text-gray-600 hover:text-indigo-600 transition-colors md:hidden"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="mt-4 relative">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <button className="absolute right-3 top-2.5 text-gray-500">
              <Search className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="mt-4 md:hidden">
            <div className="flex flex-col space-y-4 py-4">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-indigo-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="text-gray-600 hover:text-indigo-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/about" 
                className="text-gray-600 hover:text-indigo-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-600 hover:text-indigo-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/account" 
                className="text-gray-600 hover:text-indigo-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Account
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;