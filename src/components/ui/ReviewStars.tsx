import React from 'react';
import { Star } from 'lucide-react';

interface ReviewStarsProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  count?: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

const ReviewStars: React.FC<ReviewStarsProps> = ({
  rating,
  size = 'md',
  showCount = false,
  count = 0,
  interactive = false,
  onRatingChange
}) => {
  const [hoverRating, setHoverRating] = React.useState(0);
  
  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'h-3 w-3';
      case 'md': return 'h-5 w-5';
      case 'lg': return 'h-6 w-6';
      default: return 'h-5 w-5';
    }
  };
  
  const handleMouseEnter = (index: number) => {
    if (interactive) {
      setHoverRating(index);
    }
  };
  
  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0);
    }
  };
  
  const handleClick = (index: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(index);
    }
  };
  
  return (
    <div className="flex items-center">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((index) => (
          <span 
            key={index}
            className={`${interactive ? 'cursor-pointer' : ''}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(index)}
          >
            <Star 
              className={`${getSizeClass()} ${
                index <= (hoverRating || rating) 
                  ? 'text-amber-400' 
                  : 'text-gray-300'
              }`}
              fill={index <= (hoverRating || rating) ? "currentColor" : "none"}
            />
          </span>
        ))}
      </div>
      
      {showCount && (
        <span className="ml-2 text-sm text-gray-600">
          ({count})
        </span>
      )}
    </div>
  );
};

export default ReviewStars;