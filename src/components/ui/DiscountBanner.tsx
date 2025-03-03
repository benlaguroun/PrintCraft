import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DiscountBannerProps {
  code: string;
  discount: string;
  expiryDate?: Date;
  backgroundColor?: string;
  textColor?: string;
}

const DiscountBanner: React.FC<DiscountBannerProps> = ({
  code,
  discount,
  expiryDate,
  backgroundColor = 'bg-indigo-600',
  textColor = 'text-white'
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  
  // Calculate time left until expiry
  useEffect(() => {
    if (!expiryDate) return;
    
    const calculateTimeLeft = () => {
      const difference = expiryDate.getTime() - new Date().getTime();
      
      if (difference <= 0) {
        setIsVisible(false);
        return null;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      
      if (days > 0) {
        return `${days}d ${hours}h left`;
      } else if (hours > 0) {
        return `${hours}h ${minutes}m left`;
      } else {
        return `${minutes}m left`;
      }
    };
    
    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      const timeLeftValue = calculateTimeLeft();
      setTimeLeft(timeLeftValue);
      
      if (!timeLeftValue) {
        clearInterval(timer);
      }
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, [expiryDate]);
  
  // Close banner
  const handleClose = () => {
    setIsVisible(false);
  };
  
  // Copy discount code to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    
    // Show a toast or notification here
    alert(`Copied discount code: ${code}`);
  };
  
  if (!isVisible) return null;
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className={`${backgroundColor} ${textColor} py-3 px-4 relative`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
        >
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center text-center">
            <div className="font-medium mr-2">
              {discount} off your first order!
            </div>
            <div className="flex items-center">
              <span>Use code: </span>
              <button 
                onClick={copyToClipboard}
                className="mx-2 font-bold border-b border-dashed border-current hover:border-solid"
              >
                {code}
              </button>
              {timeLeft && (
                <span className="text-sm bg-white/20 px-2 py-0.5 rounded-full">
                  {timeLeft}
                </span>
              )}
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-white/20 rounded-full"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DiscountBanner;