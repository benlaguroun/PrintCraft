import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Upload, Type, Palette, Save, ShoppingCart } from 'lucide-react';
import { products } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { Product, ProductVariant } from '../types';

const CustomizationPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [customization, setCustomization] = useState<Record<string, any>>({});
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  
  // Find product by ID
  useEffect(() => {
    const foundProduct = products.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      // Set first variant as default if available
      if (foundProduct.variants && foundProduct.variants.length > 0) {
        setSelectedVariant(foundProduct.variants[0]);
      }
      
      // Initialize customization options
      if (foundProduct.customizationOptions) {
        const initialCustomization: Record<string, any> = {};
        foundProduct.customizationOptions.forEach(option => {
          if (option.type === 'position' && option.options && option.options.length > 0) {
            initialCustomization[option.id] = option.options[0];
          } else {
            initialCustomization[option.id] = '';
          }
        });
        setCustomization(initialCustomization);
      }
    }
    setLoading(false);
  }, [productId]);
  
  // Handle variant selection
  const handleVariantChange = (variantId: string) => {
    if (product) {
      const variant = product.variants.find(v => v.id === variantId);
      if (variant) {
        setSelectedVariant(variant);
      }
    }
  };
  
  // Handle customization changes
  const handleCustomizationChange = (optionId: string, value: any) => {
    setCustomization(prev => ({
      ...prev,
      [optionId]: value
    }));
  };
  
  // Handle image upload
  const handleImageUpload = (optionId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setPreviewImage(imageUrl);
        handleCustomizationChange(optionId, imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle quantity change
  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= 10) {
      setQuantity(value);
    }
  };
  
  // Add to cart
  const handleAddToCart = () => {
    if (product && selectedVariant) {
      addItem(product, quantity, { variant: selectedVariant, customization });
      navigate('/cart');
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
  
  if (!product.customizable) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Customizable</h1>
        <p className="text-gray-600 mb-8">This product doesn't support customization.</p>
        <Link 
          to={`/products/${product.id}`} 
          className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
        >
          View Product Details
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link to={`/products/${product.id}`} className="text-indigo-600 hover:text-indigo-800 flex items-center">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Product
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-6">Customize Your {product.name}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Preview Area */}
        <div>
          <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square mb-6">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Base Product Image */}
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-contain"
              />
              
              {/* Custom Image Overlay */}
              {previewImage && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src={previewImage} 
                    alt="Custom design" 
                    className="max-w-1/2 max-h-1/2 object-contain"
                    style={{
                      position: 'absolute',
                      top: customization['position-1'] === 'front' ? '30%' : 
                           customization['position-1'] === 'back' ? '30%' :
                           customization['position-1'] === 'left sleeve' ? '30%' : '30%',
                      left: customization['position-1'] === 'front' ? '50%' : 
                            customization['position-1'] === 'back' ? '50%' :
                            customization['position-1'] === 'left sleeve' ? '25%' : '75%',
                      transform: 'translate(-50%, -50%)',
                      maxWidth: '40%',
                      maxHeight: '40%'
                    }}
                  />
                </div>
              )}
              
              {/* Custom Text Overlay */}
              {customization['text-1'] && (
                <div 
                  className="absolute text-center font-bold"
                  style={{
                    top: customization['position-1'] === 'front' ? '50%' : 
                         customization['position-1'] === 'back' ? '50%' :
                         customization['position-1'] === 'left sleeve' ? '50%' : '50%',
                    left: customization['position-1'] === 'front' ? '50%' : 
                          customization['position-1'] === 'back' ? '50%' :
                          customization['position-1'] === 'left sleeve' ? '25%' : '75%',
                    transform: 'translate(-50%, -50%)',
                    color: 'black',
                    textShadow: '1px 1px 0 white',
                    fontSize: '1.5rem'
                  }}
                >
                  {customization['text-1']}
                </div>
              )}
            </div>
          </div>
          
          {/* Variant Selection */}
          {product.variants.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-lg font-semibold mb-4">Select Variant</h2>
              
              {/* Color Selection */}
              {product.variants.some(v => v.color) && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {[...new Set(product.variants.map(v => v.color))].filter(Boolean).map((color) => (
                      <button
                        key={color}
                        onClick={() => {
                          const variant = product.variants.find(v => v.color === color);
                          if (variant) setSelectedVariant(variant);
                        }}
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
              {product.variants.some(v => v.size) && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Size</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {[...new Set(product.variants.map(v => v.size))].filter(Boolean).map((size) => {
                      // Check if this size is available for the selected color
                      const isAvailable = product.variants.some(
                        v => v.size === size && v.color === selectedVariant?.color && v.inStock
                      );
                      
                      return (
                        <button
                          key={size}
                          onClick={() => {
                            if (isAvailable) {
                              const variant = product.variants.find(
                                v => v.size === size && v.color === selectedVariant?.color
                              );
                              if (variant) setSelectedVariant(variant);
                            }
                          }}
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
            </div>
          )}
        </div>
        
        {/* Customization Options */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-lg font-semibold mb-4">Customization Options</h2>
            
            {product.customizationOptions?.map((option) => (
              <div key={option.id} className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  {option.name}
                  {option.required && <span className="text-red-500">*</span>}
                </h3>
                
                {option.type === 'text' && (
                  <div className="flex items-center">
                    <Type className="h-5 w-5 text-gray-400 mr-2" />
                    <input
                      type="text"
                      value={customization[option.id] || ''}
                      onChange={(e) => handleCustomizationChange(option.id, e.target.value)}
                      placeholder="Enter your text here"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                )}
                
                {option.type === 'image' && (
                  <div>
                    <label 
                      htmlFor={`image-upload-${option.id}`}
                      className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-md py-6 px-4 cursor-pointer hover:bg-gray-50"
                    >
                      <div className="text-center">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          {previewImage ? 'Change image' : 'Upload an image'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </div>
                      <input
                        id={`image-upload-${option.id}`}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(option.id, e)}
                        className="hidden"
                      />
                    </label>
                    
                    {previewImage && (
                      <div className="mt-2 relative">
                        <img 
                          src={previewImage} 
                          alt="Preview" 
                          className="h-20 w-auto object-contain"
                        />
                        <button
                          onClick={() => {
                            setPreviewImage(null);
                            handleCustomizationChange(option.id, '');
                          }}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>
                )}
                
                {option.type === 'position' && option.options && (
                  <div className="grid grid-cols-2 gap-2">
                    {option.options.map((pos) => (
                      <button
                        key={pos}
                        onClick={() => handleCustomizationChange(option.id, pos)}
                        className={`py-2 px-4 border rounded-md text-center capitalize ${
                          customization[option.id] === pos
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {pos}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Quantity and Add to Cart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Quantity</h3>
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
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold">Price:</span>
              <span className="text-2xl font-bold text-indigo-600">
                ${((selectedVariant?.price || product.price) * quantity).toFixed(2)}
              </span>
            </div>
            
            <div className="flex flex-col space-y-3">
              <button
                onClick={handleAddToCart}
                className="bg-indigo-600 text-white py-3 px-6 rounded-md font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </button>
              
              <button
                className="border border-indigo-600 text-indigo-600 py-3 px-6 rounded-md font-medium hover:bg-indigo-50 transition-colors flex items-center justify-center"
              >
                <Save className="h-5 w-5 mr-2" />
                Save Design
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPage;