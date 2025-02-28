import React from 'react';
import { Link } from 'react-router-dom';
import { Printer, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Printer className="h-8 w-8 text-indigo-400" />
              <span className="text-xl font-bold">PrintCraft</span>
            </div>
            <p className="text-gray-300 mb-4">
              Custom print-on-demand products with your unique designs. Quality products, fast shipping, and excellent customer service.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors">Products</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=t-shirts" className="text-gray-300 hover:text-white transition-colors">T-Shirts</Link>
              </li>
              <li>
                <Link to="/products?category=hoodies" className="text-gray-300 hover:text-white transition-colors">Hoodies</Link>
              </li>
              <li>
                <Link to="/products?category=mugs" className="text-gray-300 hover:text-white transition-colors">Mugs</Link>
              </li>
              <li>
                <Link to="/products?category=posters" className="text-gray-300 hover:text-white transition-colors">Posters</Link>
              </li>
              <li>
                <Link to="/products?category=phone-cases" className="text-gray-300 hover:text-white transition-colors">Phone Cases</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-indigo-400 mt-0.5" />
                <span className="text-gray-300">123 Print Street, Design City, PC 12345</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-indigo-400" />
                <span className="text-gray-300">(123) 456-7890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-indigo-400" />
                <span className="text-gray-300">support@printcraft.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} PrintCraft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;