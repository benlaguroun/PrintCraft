import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { Product } from '../../types';
import { useUserStore } from '../../store/userStore';
import { useCartStore } from '../../store/cartStore';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useUserStore();
  const { addItem } = useCartStore();
  const inWishlist = isInWishlist(product.id);
  
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };
  
  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Add first variant or default product
    const variant = product.variants.length > 0 ? product.variants[0] : undefined;
    addItem(product, 1, { variant });
  };
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={cn(
        "group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300",
        featured ? "col-span-2 md:col-span-1" : ""
      )}
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          {/* Product Image */}
          <div className="aspect-square bg-gray-100">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.new && (
              <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                NEW
              </span>
            )}
            {product.bestseller && (
              <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">
                BESTSELLER
              </span>
            )}
            {product.salePrice && product.salePrice < product.price && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                SALE
              </span>
            )}
          </div>
          
          {/* Quick Actions */}
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            <button 
              onClick={handleWishlistToggle}
              className={`p-2 rounded-full ${inWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-700'} shadow-md hover:scale-110 transition-all`}
            >
              <Heart className="h-4 w-4" fill={inWishlist ? "currentColor" : "none"} />
            </button>
            
            <Link 
              to={`/products/${product.id}`}
              className="p-2 rounded-full bg-white text-gray-700 shadow-md hover:scale-110 transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <Eye className="h-4 w-4" />
            </Link>
          </div>
          
          {/* Quick Add Button */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleQuickAdd}
              className="w-full bg-white text-gray-900 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Quick Add
            </button>
          </div>
        </div>
        
        <div className="p-4">
          {/* Category */}
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
            {product.category.replace('-', ' ')}
          </div>
          
          {/* Product Name */}
          <h3 className="text-lg font-semibold mb-1 group-hover:text-indigo-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
          
          {/* Rating */}
          {product.rating && (
            <div className="flex items-center mb-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="h-3.5 w-3.5" 
                    fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-1">
                ({product.reviewCount || 0})
              </span>
            </div>
          )}
          
          {/* Price */}
          <div className="flex items-center">
            {product.salePrice ? (
              <>
                <span className="text-lg font-bold text-red-600 mr-2">
                  ${product.salePrice.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;