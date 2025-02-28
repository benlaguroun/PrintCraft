import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

const CartPage = () => {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();
  
  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      updateQuantity(itemId, newQuantity);
    }
  };
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
          <ShoppingBag className="h-12 w-12 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Looks like you haven't added any products to your cart yet. Browse our collection to find something you'll love.
        </p>
        <Link 
          to="/products" 
          className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors inline-flex items-center"
        >
          Start Shopping <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  {items.length} {items.length === 1 ? 'Item' : 'Items'}
                </h2>
                <button 
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Clear Cart
                </button>
              </div>
              
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item.id} className="py-6 flex flex-col sm:flex-row">
                    <div className="sm:w-24 sm:h-24 h-20 w-20 bg-gray-100 rounded-md overflow-hidden mb-4 sm:mb-0">
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 sm:ml-6">
                      <div className="flex justify-between mb-2">
                        <Link 
                          to={`/products/${item.product.id}`}
                          className="text-lg font-semibold hover:text-indigo-600"
                        >
                          {item.product.name}
                        </Link>
                        <span className="font-semibold">
                          ${((item.variant?.price || item.product.price) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      
                      {item.variant && (
                        <p className="text-gray-600 text-sm mb-2">
                          {item.variant.name}
                        </p>
                      )}
                      
                      {item.customization && (
                        <div className="text-sm text-gray-600 mb-2">
                          <p>Customized</p>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="px-3 py-1 hover:bg-gray-100"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="px-3 py-1 border-l border-r border-gray-300">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="px-3 py-1 hover:bg-gray-100"
                            disabled={item.quantity >= 10}
                          >
                            +
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-800 flex items-center"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <Link 
              to="/products" 
              className="text-indigo-600 hover:text-indigo-800 flex items-center"
            >
              <ArrowRight className="h-4 w-4 mr-1 transform rotate-180" />
              Continue Shopping
            </Link>
          </div>
        </div>
        
        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between font-semibold">
                <span>Total</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
            </div>
            
            <Link 
              to="/checkout" 
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center"
            >
              Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            
            <div className="mt-6 text-sm text-gray-600">
              <p className="mb-2">We accept:</p>
              <div className="flex space-x-2">
                <div className="w-10 h-6 bg-gray-200 rounded"></div>
                <div className="w-10 h-6 bg-gray-200 rounded"></div>
                <div className="w-10 h-6 bg-gray-200 rounded"></div>
                <div className="w-10 h-6 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;