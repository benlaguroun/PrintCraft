import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShoppingCart, Heart, Share2, Check } from 'lucide-react';
import { products } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { Product, ProductVariant } from '../types';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  
  // Get unique colors and sizes from variants
  const colors = product ? [...new Set(product.variants.map(v => v.color).filter(Boolean))] : [];
  const sizes = product ? [...new Set(product.variants.map(v => v.size).filter(Boolean))] : [];
  
  // Find product by ID
  useEffect(() => {
    const foundProduct = products.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      // Set first variant as default if available
      if (foundProduct.variants && foundProduct.variants.length > 0) {
        setSelectedVariant(foundProduct.variants[0]);
      }
    }
    setLoading(false);
  }, [id]);
  
  // Handle variant selection
  const handleVariantChange = (variantId: string) => {
    if (product) {
      const variant = product.variants.find(v => v.id === variantId);
      if (variant) {
        setSelectedVariant(variant);
      }
    }
  };
  
  // Handle color selection
  const handleColorChange = (color: string) => {
    if (product) {
      // Find first variant with this color
      const variant = product.variants.find(v => v.color === color);
      if (variant) {
        setSelectedVariant(variant);
      }
    }
  };
  
  // Handle size selection
  const handleSizeChange = (size: string) => {
    if (product && selectedVariant) {
      // Find variant with current color and new size
      const variant = product.variants.find(
        v => v.color === selectedVariant.color && v.size === size
      );
      if (variant) {
        setSelectedVariant(variant);
      }
    }
  };
  
  // Handle quantity change
  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= 10) {
      setQuantity(value);
    }
  };
  
  // Handle image navigation
  const nextImage = () => {
    if (product) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };
  
  const prevImage = () => {
    if (product) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
      );
    }
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    if (product && selectedVariant) {
      addItem(product, quantity, { variant: selectedVariant });
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 3000);
    }
  };
  
  // Handle customize
  const handleCustomize = () => {
    if (product) {
      navigate(`/customize/${product.id}`);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading product...</p>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/products" 
          className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link to="/products" className="text-indigo-600 hover:text-indigo-800 flex items-center">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Products
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="relative">
          <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square">
            <img 
              src={product.images[currentImageIndex]} 
              alt={product.name} 
              className="w-full h-full object-contain"
            />
          </div>
          
          {product.images.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
          
          {/* Thumbnail Navigation */}
          {product.images.length > 1 && (
            <div className="flex mt-4 space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button 
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-16 h-16 rounded-md overflow-hidden border-2 ${
                    currentImageIndex === index ? 'border-indigo-600' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} thumbnail ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold text-indigo-600">
              ${(selectedVariant?.price || product.price).toFixed(2)}
            </span>
          </div>
          
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          {/* Color Selection */}
          {colors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
              <div className="flex space-x-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorChange(color!)}
                    className={`w-8 h-8 rounded-full border ${
                      selectedVariant?.color === color 
                        ? 'ring-2 ring-indigo-600 ring-offset-2' 
                        : 'ring-1 ring-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  ></button>
                ))}
              </div>
            </div>
          )}
          
          {/* Size Selection */}
          {sizes.length > 0 && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                <button className="text-sm text-indigo-600 hover:text-indigo-800">Size Guide</button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {sizes.map((size) => {
                  // Check if this size is available for the selected color
                  const isAvailable = product.variants.some(
                    v => v.size === size && v.color === selectedVariant?.color && v.inStock
                  );
                  
                  return (
                    <button
                      key={size}
                      onClick={() => isAvailable && handleSizeChange(size!)}
                      className={`py-2 px-4 border rounded-md text-center ${
                        selectedVariant?.size === size
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : isAvailable
                          ? 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'
                          : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                      }`}
                      disabled={!isAvailable}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Variant Selection (if not using color/size) */}
          {!colors.length && !sizes.length && product.variants.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Options</h3>
              <select
                value={selectedVariant?.id || ''}
                onChange={(e) => handleVariantChange(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                {product.variants.map((variant) => (
                  <option key={variant.id} value={variant.id}>
                    {variant.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
            <div className="flex items-center">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="border border-gray-300 rounded-l-md py-2 px-4 hover:bg-gray-50"
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                type="number"
                min="1"
                max="10"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                className="border-t border-b border-gray-300 py-2 px-4 w-16 text-center focus:outline-none"
              />
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="border border-gray-300 rounded-r-md py-2 px-4 hover:bg-gray-50"
                disabled={quantity >= 10}
              >
                +
              </button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col space-y-3">
            <button
              onClick={handleAddToCart}
              className={`flex items-center justify-center py-3 px-6 rounded-md font-medium ${
                addedToCart
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              } transition-colors`}
              disabled={!selectedVariant?.inStock}
            >
              {addedToCart ? (
                <>
                  <Check className="h-5 w-5 mr-2" />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </>
              )}
            </button>
            
            {product.customizable && (
              <button
                onClick={handleCustomize}
                className="py-3 px-6 border border-indigo-600 text-indigo-600 rounded-md font-medium hover:bg-indigo-50 transition-colors"
              >
                Customize This Product
              </button>
            )}
            
            <div className="flex space-x-4">
              <button className="flex items-center text-gray-600 hover:text-indigo-600">
                <Heart className="h-5 w-5 mr-1" />
                <span>Save</span>
              </button>
              <button className="flex items-center text-gray-600 hover:text-indigo-600">
                <Share2 className="h-5 w-5 mr-1" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional Information */}
      <div className="mt-16">
        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold mb-4">Product Details</h2>
          <div className="prose max-w-none">
            <p>
              Our print-on-demand products are made with high-quality materials and printed using state-of-the-art technology to ensure vibrant, long-lasting designs. Each item is carefully crafted after you place your order, allowing for complete customization.
            </p>
            <ul className="mt-4">
              <li>Premium quality materials</li>
              <li>Durable printing that won't fade with washing</li>
              <li>Ethically sourced and produced</li>
              <li>Available in multiple sizes and colors</li>
              <li>Customizable with your unique designs</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 mt-8">
          <h2 className="text-2xl font-bold mb-4">Shipping & Returns</h2>
          <div className="prose max-w-none">
            <p>
              We process and ship all orders within 2-3 business days. Delivery times vary depending on your location, but typically range from 5-10 business days after shipping.
            </p>
            <p className="mt-4">
              If you're not completely satisfied with your purchase, we accept returns within 30 days of delivery. Items must be unused and in their original packaging.
            </p>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products
            .filter(p => p.id !== product.id && p.category === product.category)
            .slice(0, 4)
            .map((relatedProduct) => (
              <div key={relatedProduct.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Link to={`/products/${relatedProduct.id}`}>
                  <img 
                    src={relatedProduct.images[0]} 
                    alt={relatedProduct.name} 
                    className="w-full h-48 object-cover"
                  />
                </Link>
                <div className="p-4">
                  <Link to={`/products/${relatedProduct.id}`}>
                    <h3 className="text-lg font-semibold mb-2">{relatedProduct.name}</h3>
                  </Link>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">${relatedProduct.price.toFixed(2)}</span>
                    <Link 
                      to={`/products/${relatedProduct.id}`}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;