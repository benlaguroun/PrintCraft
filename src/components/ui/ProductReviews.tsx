import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';
import ReviewStars from './ReviewStars';
import { Review } from '../../types';

interface ProductReviewsProps {
  productId: string;
  reviews: Review[];
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId, reviews }) => {
  const [userRating, setUserRating] = useState(0);
  const [reviewForm, setReviewForm] = useState({
    title: '',
    comment: '',
    name: '',
    email: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showForm, setShowForm] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  
  // Calculate average rating
  const averageRating = reviews.length 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;
  
  // Count ratings by star level
  const ratingCounts = reviews.reduce((counts, review) => {
    counts[review.rating] = (counts[review.rating] || 0) + 1;
    return counts;
  }, {} as Record<number, number>);
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReviewForm(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Validate form
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!userRating) {
      errors.rating = 'Please select a rating';
    }
    
    if (!reviewForm.title.trim()) {
      errors.title = 'Please enter a review title';
    }
    
    if (!reviewForm.comment.trim()) {
      errors.comment = 'Please enter your review';
    }
    
    if (!reviewForm.name.trim()) {
      errors.name = 'Please enter your name';
    }
    
    if (!reviewForm.email.trim()) {
      errors.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(reviewForm.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle form submission
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, you would send this to your backend
      console.log('Review submitted:', {
        productId,
        rating: userRating,
        ...reviewForm
      });
      
      // Reset form
      setUserRating(0);
      setReviewForm({
        title: '',
        comment: '',
        name: '',
        email: ''
      });
      
      setReviewSubmitted(true);
      setTimeout(() => {
        setShowForm(false);
        setReviewSubmitted(false);
      }, 3000);
    }
  };
  
  // Handle marking a review as helpful
  const handleMarkHelpful = (reviewId: string) => {
    // In a real app, you would send this to your backend
    console.log('Marked as helpful:', reviewId);
  };
  
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
      
      {/* Review Summary */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
            <div className="flex items-baseline">
              <span className="text-4xl font-bold mr-2">{averageRating.toFixed(1)}</span>
              <span className="text-gray-500">out of 5</span>
            </div>
            <ReviewStars rating={averageRating} size="lg" />
            <p className="text-sm text-gray-500 mt-1">Based on {reviews.length} reviews</p>
          </div>
          
          <div className="w-full md:w-1/2">
            {[5, 4, 3, 2, 1].map(stars => (
              <div key={stars} className="flex items-center mb-1">
                <div className="flex items-center w-20">
                  <span className="text-sm mr-1">{stars}</span>
                  <Star className="h-4 w-4 text-amber-400" fill="currentColor" />
                </div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-400 rounded-full"
                    style={{ 
                      width: `${reviews.length ? ((ratingCounts[stars] || 0) / reviews.length) * 100 : 0}%` 
                    }}
                  ></div>
                </div>
                <span className="text-sm ml-2 w <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
  <div 
    className="h-full bg-amber-400 rounded-full"
    style={{ 
      width: `${reviews.length ? ((ratingCounts[stars] || 0) / reviews.length) * 100 : 0}%` 
    }}
  ></div>
</div>
<span className="text-sm ml-2 w-12 text-right">
  {ratingCounts[stars] || 0}
</span>
              </div>
            ))}
          </div>
        </div>
        
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Write a Review
        </button>
        
        {/* Review Form */}
        {showForm && (
          <div className="mt-6 border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold mb-4">
              {reviewSubmitted ? 'Thank You for Your Review!' : 'Write Your Review'}
            </h3>
            
            {reviewSubmitted ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                <p>Your review has been submitted successfully and will be published after moderation.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Rating*
                  </label>
                  <div>
                    <ReviewStars 
                      rating={userRating} 
                      size="lg" 
                      interactive={true}
                      onRatingChange={setUserRating}
                    />
                  </div>
                  {formErrors.rating && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.rating}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Review Title*
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={reviewForm.title}
                    onChange={handleInputChange}
                    className={`w-full border ${formErrors.title ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-600`}
                    placeholder="Summarize your experience"
                  />
                  {formErrors.title && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                    Review*
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    rows={4}
                    value={reviewForm.comment}
                    onChange={handleInputChange}
                    className={`w-full border ${formErrors.comment ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-600`}
                    placeholder="Share your experience with this product"
                  ></textarea>
                  {formErrors.comment && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.comment}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={reviewForm.name}
                      onChange={handleInputChange}
                      className={`w-full border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-600`}
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Email* (will not be published)
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={reviewForm.email}
                      onChange={handleInputChange}
                      className={`w-full border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-600`}
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                    )}
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        )}
      </div>
      
      {/* Review List */}
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg mb-1">{review.title}</h3>
                  <ReviewStars rating={review.rating} />
                </div>
                <div className="text-sm text-gray-500">
                  {review.date.toLocaleDateString()}
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">{review.comment}</p>
              
              {review.images && review.images.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {review.images.map((image, index) => (
                    <img 
                      key={index} 
                      src={image} 
                      alt={`Review image ${index + 1}`} 
                      className="h-20 w-20 object-cover rounded-md"
                    />
                  ))}
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  By <span className="font-medium">{review.userName}</span>
                  {review.verified && (
                    <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                      Verified Purchase
                    </span>
                  )}
                </div>
                
                <button 
                  onClick={() => handleMarkHelpful(review.id)}
                  className="flex items-center text-sm text-gray-600 hover:text-indigo-600"
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Helpful ({review.helpful})
                </button>
              </div>
              
              {review.response && (
                <div className="mt-4 bg-gray-50 p-4 rounded-md">
                  <div className="flex items-center text-sm font-medium text-gray-900 mb-2">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Response from PrintCraft
                  </div>
                  <p className="text-gray-700 text-sm">{review.response.comment}</p>
                  <p className="text-gray-500 text-xs mt-1">
                    {review.response.date.toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;