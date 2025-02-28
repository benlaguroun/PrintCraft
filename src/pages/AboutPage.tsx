import React from 'react';
import { Printer, Award, Users, Heart } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">About PrintCraft</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're passionate about helping people express their creativity through high-quality print-on-demand products.
        </p>
      </div>
      
      {/* Our Story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-gray-700 mb-4">
            PrintCraft was founded in 2020 with a simple mission: to make custom printing accessible to everyone. What started as a small operation in a garage has grown into a thriving business serving customers worldwide.
          </p>
          <p className="text-gray-700 mb-4">
            Our founder, Jane Smith, was frustrated with the limited options and poor quality of custom printed products available online. She believed that everyone deserved access to high-quality, personalized items without breaking the bank.
          </p>
          <p className="text-gray-700">
            Today, PrintCraft offers hundreds of customizable products, from apparel to home decor, all produced with the highest quality materials and printing techniques. We're proud to help our customers bring their creative visions to life.
          </p>
        </div>
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1581078426770-6d336e5de7bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
            alt="PrintCraft workshop" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      {/* Our Values */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <Printer className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality</h3>
            <p className="text-gray-600">
              We never compromise on quality. From the materials we use to the printing techniques we employ, excellence is our standard.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <Award className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-gray-600">
              We're constantly exploring new technologies and techniques to improve our products and services.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <Users className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-gray-600">
              We believe in building relationships with our customers and supporting the creative community.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <Heart className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
            <p className="text-gray-600">
              We're committed to reducing our environmental impact through responsible sourcing and production practices.
            </p>
          </div>
        </div>
      </div>
      
      {/* Our Process */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Our Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-600 text-white rounded-full text-xl font-bold mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">Design</h3>
            <p className="text-gray-600">
              You create your design using our easy-to-use customization tools, or upload your own artwork. Our team reviews each design to ensure it meets our quality standards.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-600 text-white rounded-full text-xl font-bold mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">Production</h3>
            <p className="text-gray-600">
              Once your order is placed, our skilled production team gets to work. We use state-of-the-art printing equipment to ensure vibrant, long-lasting results.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-600 text-white rounded-full text-xl font-bold mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">Delivery</h3>
            <p className="text-gray-600">
              Your custom product is carefully packaged and shipped directly to your door. We offer tracking on all orders so you can follow your package every step of the way.
            </p>
          </div>
        </div>
      </div>
      
      {/* Team Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
              alt="Jane Smith - Founder & CEO" 
              className="w-full h-64 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">Jane Smith</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
              alt="John Davis - Head of Production" 
              className="w-full h-64 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">John Davis</h3>
              <p className="text-gray-600">Head of Production</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
              alt="Sarah Johnson - Design Director" 
              className="w-full h-64 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">Sarah Johnson</h3>
              <p className="text-gray-600">Design Director</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
              alt="Michael Lee - Customer Service Manager" 
              className="w-full h-64 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">Michael Lee</h3>
              <p className="text-gray-600">Customer Service Manager</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="bg-gray-100 py-16 px-4 rounded-lg mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-indigo-200 rounded-full overflow-hidden mr-4">
                <img 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" 
                  alt="Customer" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold">Amanda R.</h3>
                <div className="flex text-yellow-400">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 italic">
              "I ordered custom t-shirts for our family reunion and they turned out amazing! The quality is excellent and the colors are vibrant. Will definitely order again."
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-indigo-200 rounded-full overflow-hidden mr-4">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" 
                  alt="Customer" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold">Robert T.</h3>
                <div className="flex text-yellow-400">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 italic">
              "The customization tool was so easy to use. I created a mug with a photo of my dog, and it came out perfect. Fast shipping too!"
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-indigo-200 rounded-full overflow-hidden mr-4">
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" 
                  alt="Customer" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold">Jennifer M.</h3>
                <div className="flex text-yellow-400">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 italic">
              "I run a small business and use PrintCraft for all my merchandise. The quality is consistent, and my customers love the products. Highly recommend!"
            </p>
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Create Your Custom Product?</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Join thousands of satisfied customers and bring your creative ideas to life with PrintCraft.
        </p>
        <a 
          href="/products" 
          className="bg-indigo-600 text-white px-8 py-3 rounded-md font-semibold text-lg hover:bg-indigo-700 transition-colors inline-block"
        >
          Start Shopping
        </a>
      </div>
    </div>
  );
};

export default AboutPage;