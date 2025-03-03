import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Edit, ShoppingCart } from 'lucide-react';
import { useUserStore } from '../../store/userStore';
import { useCartStore } from '../../store/cartStore';
import { products } from '../../data/products';
import { motion } from 'framer-motion';

const SavedDesignsGallery: React.FC = () => {
  const { getSavedDesigns, removeSavedDesign } = useUserStore();
  const { addItem } = useCartStore();
  const savedDesigns = getSavedDesigns();
  
  const handleAddToCart = (designId: string) => {
    const design = savedDesigns.find(d => d.id === designId);
    if (!design) return;
    
    const product = products.find(p => p.id === design.productId);
    const variant = product?.variants.find(v => v.id === design.variantId);
    
    if (product && variant) {
      addItem(product, 1, { variant, customization: design.customization });
    }
  };
  
  if (savedDesigns.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Your Saved Designs</h2>
        <p className="text-gray-600 mb-6">You haven't saved any designs yet.</p>
        <Link 
          to="/products" 
          className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Start Designing
        </Link>
      </div>
    );
  }
  
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6">Your Saved Designs</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedDesigns.map((design) => {
          const product = products.find(p => p.id === design.productId);
          
          return (
            <motion.div 
              key={design.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="aspect-square bg-gray-100 relative">
                <img 
                  src={design.previewImage} 
                  alt={design.name} 
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{design.name}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {product?.name || 'Product'} - Created {design.createdAt.toLocaleDateString()}
                </p>
                
                <div className="flex space-x-2">
                  <Link
                    to={`/customize/${design.productId}?design=${design.id}`}
                    className="flex-1 bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Link>
                  
                  <button
                    onClick={() => handleAddToCart(design.id)}
                    className="flex-1 bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </button>
                  
                  <button
                    onClick={() => removeSavedDesign(design.id)}
                    className="p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SavedDesignsGallery;