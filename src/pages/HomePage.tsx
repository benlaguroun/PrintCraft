import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, Clock } from 'lucide-react';
import { products } from '../data/products';

const HomePage = () => {
  // Get featured products (first 3 for now)
  const featuredProducts = products.slice(0, 3);
  
  // Group products by category
  const categories = [...new Set(products.map(product => product.category))];
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-indigo-700 text-white">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Custom Print-on-Demand Products for Every Occasion
            </h1>
            <p className="text-xl mb-8">
              Create unique, personalized products with your designs. From t-shirts to mugs, express yourself with quality print-on-demand items.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/products" 
                className="bg-white text-indigo-700 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
              >
                Shop Now
              </Link>
              <Link 
                to="/customize/1" 
                className="bg-transparent border-2 border-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-indigo-700 transition-colors"
              >
                Start Designing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose PrintCraft?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                <Star className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                We use only the highest quality materials and printing techniques to ensure your designs look amazing.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                <Truck className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
              <p className="text-gray-600">
                Your custom products are produced and shipped quickly, with delivery tracking provided.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                <Shield className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Satisfaction Guaranteed</h3>
              <p className="text-gray-600">
                Not happy with your order? We offer hassle-free returns and will make it right.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link 
              to="/products" 
              className="text-indigo-600 hover:text-indigo-800 flex items-center"
            >
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Link to={`/products/${product.id}`}>
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-64 object-cover"
                  />
                </Link>
                <div className="p-4">
                  <Link to={`/products/${product.id}`}>
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  </Link>
                  <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                    <Link 
                      to={`/products/${product.id}`}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => {
              const categoryProduct = products.find(p => p.category === category);
              return (
                <Link 
                  key={category}
                  to={`/products?category=${category}`}
                  className="group relative rounded-lg overflow-hidden shadow-md"
                >
                  <img 
                    src={categoryProduct?.images[0]} 
                    alt={category} 
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <h3 className="text-white text-xl font-semibold capitalize">
                      {category.replace('-', ' ')}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-full text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose a Product</h3>
              <p className="text-gray-600">
                Browse our collection and select the perfect product for your design.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-full text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Your Design</h3>
              <p className="text-gray-600">
                Add your artwork, photo, or text to create a unique custom product.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-full text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Preview & Order</h3>
              <p className="text-gray-600">
                See how your design looks, make adjustments, and place your order.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-full text-2xl font-bold mb-4">
                4
              </div>
              <h3 className="text-xl font-semibold mb-2">Receive & Enjoy</h3>
              <p className="text-gray-600">
                We'll print and ship your custom product directly to your door.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Your Custom Product?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start designing your unique print-on-demand products today and bring your creativity to life.
          </p>
          <Link 
            to="/products" 
            className="bg-white text-indigo-700 px-8 py-3 rounded-md font-semibold text-lg hover:bg-gray-100 transition-colors inline-block"
          >
            Start Shopping
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;