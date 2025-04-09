import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Star,
  Truck,
  Shield,
  Clock,
  ChevronRight,
  ChevronLeft,
  Sparkles,
} from "lucide-react";
import { products } from "../data/products";
import ProductGrid from "../components/ui/ProductGrid";
import DiscountBanner from "../components/ui/DiscountBanner";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => {
  // Get featured products (first 6 for now)
  const featuredProducts = products.slice(0, 6).map((product) => ({
    ...product,
    bestseller: Math.random() > 0.5, // Random for demo
    new: Math.random() > 0.7, // Random for demo
    rating: 4 + Math.random(), // Random rating between 4-5
    reviewCount: Math.floor(Math.random() * 100) + 10, // Random review count
  }));

  // Get bestsellers
  const bestsellers = products.slice(2, 8).map((product) => ({
    ...product,
    bestseller: true,
    rating: 4.5 + Math.random() * 0.5, // High rating for bestsellers
    reviewCount: Math.floor(Math.random() * 200) + 50, // More reviews for bestsellers
  }));

  // Get new arrivals
  const newArrivals = products.slice(1, 5).map((product) => ({
    ...product,
    new: true,
    rating: 4 + Math.random(), // Random rating between 4-5
    reviewCount: Math.floor(Math.random() * 50) + 5, // Fewer reviews for new products
  }));

  // Group products by category
  const categories = [...new Set(products.map((product) => product.category))];

  // Testimonials
  const testimonials = [
    {
      id: 1,
      name: "Amanda R.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      rating: 5,
      text: "I ordered custom t-shirts for our family reunion and they turned out amazing! The quality is excellent and the colors are vibrant. Will definitely order again.",
    },
    {
      id: 2,
      name: "Robert T.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      rating: 5,
      text: "The customization tool was so easy to use. I created a mug with a photo of my dog, and it came out perfect. Fast shipping too!",
    },
    {
      id: 3,
      name: "Jennifer M.",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      rating: 5,
      text: "I run a small business and use PrintCraft for all my merchandise. The quality is consistent, and my customers love the products. Highly recommend!",
    },
    {
      id: 4,
      name: "Michael P.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      rating: 5,
      text: "The canvas prints I ordered exceeded my expectations. The colors are vibrant and the print quality is exceptional. My photos look amazing!",
    },
  ];

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    prevArrow: <ChevronLeft className="text-white" />,
    nextArrow: <ChevronRight className="text-white" />,
  };

  // Testimonial slider settings
  const testimonialSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Calculate expiry date for discount banner (7 days from now)
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7);

  return (
    <div>
      {/* Discount Banner */}
      <DiscountBanner code="WELCOME15" discount="15%" expiryDate={expiryDate} />

      {/* Hero Section */}
      <section className="relative bg-indigo-700 text-white">
        <Slider {...sliderSettings}>
          <div>
            <div className="relative h-[500px] md:h-[600px]">
              <div className="absolute inset-0 bg-black opacity-30"></div>
              <img
                src="https://images.unsplash.com/photo-1586939735472-c24cb4621c43?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Custom t-shirts"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-2xl">
                    <motion.h1
                      className="text-4xl md:text-5xl font-bold mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      Custom Print-on-Demand Products for Every Occasion
                    </motion.h1>
                    <motion.p
                      className="text-xl mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      Create unique, personalized products with your designs.
                      From t-shirts to mugs, express yourself with quality
                      print-on-demand items.
                    </motion.p>
                    <motion.div
                      className="flex flex-wrap gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
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
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="relative h-[500px] md:h-[600px]">
              <div className="absolute inset-0 bg-black opacity-30"></div>
              <img
                src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
                alt="Custom hoodies"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                      Premium Quality Custom Apparel
                    </h1>
                    <p className="text-xl mb-8">
                      Elevate your style with our premium hoodies, t-shirts, and
                      more. Perfect for teams, events, or personal expression.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Link
                        to="/products?category=hoodies"
                        className="bg-white text-indigo-700 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
                      >
                        Shop Apparel
                      </Link>
                      <Link
                        to="/customize/2"
                        className="bg-transparent border-2 border-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-indigo-700 transition-colors"
                      >
                        Design Your Hoodie
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="relative h-[500px] md:h-[600px]">
              <div className="absolute inset-0 bg-black opacity-30"></div>
              <img
                src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
                alt="Custom wall art"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                      Transform Your Space with Custom Wall Art
                    </h1>
                    <p className="text-xl mb-8">
                      Turn your favorite photos and artwork into stunning canvas
                      prints, posters, and more. Perfect for home or office
                      decoration.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Link
                        to="/products?category=wall-art"
                        className="bg-white text-indigo-700 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
                      >
                        Shop Wall Art
                      </Link>
                      <Link
                        to="/customize/4"
                        className="bg-transparent border-2 border-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-indigo-700 transition-colors"
                      >
                        Create Your Canvas
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose PrintCraft?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md text-center"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                <Star className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                We use only the highest quality materials and printing
                techniques to ensure your designs look amazing.
              </p>
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md text-center"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                <Truck className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
              <p className="text-gray-600">
                Your custom products are produced and shipped quickly, with
                delivery tracking provided.
              </p>
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md text-center"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                <Shield className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Satisfaction Guaranteed
              </h3>
              <p className="text-gray-600">
                Not happy with your order? We offer hassle-free returns and will
                make it right.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ProductGrid
            products={bestsellers}
            title="Bestsellers"
            subtitle="Our most popular products that customers love"
          />
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <ProductGrid
            products={newArrivals}
            title="New Arrivals"
            subtitle="Check out our latest products and designs"
            columns={4}
          />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => {
              const categoryProduct = products.find(
                (p) => p.category === category
              );
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 flex items-center justify-center">
                    <h3 className="text-white text-xl font-semibold capitalize">
                      {category.replace("-", " ")}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-full text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose a Product</h3>
              <p className="text-gray-600">
                Browse our collection and select the perfect product for your
                design.
              </p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-full text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Your Design</h3>
              <p className="text-gray-600">
                Add your artwork, photo, or text to create a unique custom
                product.
              </p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-full text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Preview & Order</h3>
              <p className="text-gray-600">
                See how your design looks, make adjustments, and place your
                order.
              </p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-full text-2xl font-bold mb-4">
                4
              </div>
              <h3 className="text-xl font-semibold mb-2">Receive & Enjoy</h3>
              <p className="text-gray-600">
                We'll print and ship your custom product directly to your door.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Customers Say
          </h2>

          <Slider {...testimonialSettings} className="testimonial-slider">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="px-2">
                <div className="bg-white p-6 rounded-lg shadow-md h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-indigo-200 rounded-full overflow-hidden mr-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4"
                            fill={
                              i < testimonial.rating ? "currentColor" : "none"
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.text}"</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
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

          <ProductGrid products={featuredProducts} featured={true} />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Ready to Create Your Custom Product?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Start designing your unique print-on-demand products today and
              bring your creativity to life.
            </p>
            <Link
              to="/products"
              className="bg-white text-indigo-700 px-8 py-3 rounded-md font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              Start Shopping <Sparkles className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
