import React from 'react';
import { CheckCircle, Circle, Truck, Package, ShoppingBag } from 'lucide-react';
import { Order } from '../../types';

interface OrderTrackerProps {
  order: Order;
}

const OrderTracker: React.FC<OrderTrackerProps> = ({ order }) => {
  const steps = [
    { id: 'pending', label: 'Order Placed', icon: ShoppingBag, date: order.createdAt },
    { id: 'processing', label: 'Processing', icon: Package, date: new Date(order.createdAt.getTime() + 24 * 60 * 60 * 1000) },
    { id: 'shipped', label: 'Shipped', icon: Truck, date: order.status === 'shipped' || order.status === 'delivered' ? new Date(order.createdAt.getTime() + 3 * 24 * 60 * 60 * 1000) : null },
    { id: 'delivered', label: 'Delivered', icon: CheckCircle, date: order.status === 'delivered' ? order.estimatedDelivery : null }
  ];
  
  const currentStepIndex = steps.findIndex(step => step.id === order.status);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-6">Order Status</h3>
      
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2"></div>
        
        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => {
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;
            
            return (
              <div key={step.id} className="relative flex items-start">
                <div className="flex items-center justify-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isCompleted 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-400'
                  } ${isCurrent ? 'ring-2 ring-indigo-600 ring-offset-2' : ''}`}>
                    {React.createElement(step.icon, { className: "h-6 w-6" })}
                  </div>
                </div>
                
                <div className="ml-4">
                  <h4 className={`font-medium ${isCompleted ? 'text-gray-900' : 'text-gray-500'}`}>
                    {step.label}
                    {isCurrent && (
                      <span className="ml-2 bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded-full">
                        Current
                      </span>
                    )}
                  </h4>
                  
                  {step.date ? (
                    <p className="text-sm text-gray-500">
                      {step.date.toLocaleDateString()} {isCompleted ? '✓' : ''}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-400">
                      {index <= currentStepIndex + 1 ? 'Estimated' : 'Pending'}
                    </p>
                  )}
                  
                  {step.id === 'shipped' && order.trackingNumber && (
                    <div className="mt-1">
                      <p className="text-sm text-gray-600">
                        Tracking: <a href={order.trackingUrl || '#'} className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">{order.trackingNumber}</a>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {order.estimatedDelivery && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-gray-700">
            <span className="font-medium">Estimated Delivery:</span> {order.estimatedDelivery.toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderTracker;