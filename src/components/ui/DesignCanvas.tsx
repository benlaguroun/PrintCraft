import React, { useState, useRef, useEffect } from 'react';
import { Trash2, ZoomIn, ZoomOut, RotateCw, Move } from 'lucide-react';

interface DesignCanvasProps {
  productImage: string;
  designImage?: string | null;
  designText?: string | null;
  position: string;
  onDesignChange?: (designData: any) => void;
}

const DesignCanvas: React.FC<DesignCanvasProps> = ({
  productImage,
  designImage,
  designText,
  position,
  onDesignChange
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const designRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [designPosition, setDesignPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  
  // Get print area position based on selected position
  const getPrintAreaPosition = () => {
    switch (position) {
      case 'front':
        return { top: '30%', left: '50%', width: '40%', height: '40%' };
      case 'back':
        return { top: '30%', left: '50%', width: '40%', height: '40%' };
      case 'left sleeve':
        return { top: '30%', left: '25%', width: '20%', height: '20%' };
      case 'right sleeve':
        return { top: '30%', left: '75%', width: '20%', height: '20%' };
      default:
        return { top: '30%', left: '50%', width: '40%', height: '40%' };
    }
  };
  
  const printAreaPosition = getPrintAreaPosition();
  
  // Handle mouse down for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!designRef.current) return;
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - designPosition.x,
      y: e.clientY - designPosition.y
    });
    
    e.preventDefault();
  };
  
  // Handle mouse move for dragging
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !canvasRef.current) return;
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    // Get canvas boundaries
    const canvasBounds = canvasRef.current.getBoundingClientRect();
    const designBounds = designRef.current?.getBoundingClientRect();
    
    if (designBounds) {
      // Constrain movement within canvas
      const maxX = canvasBounds.width - designBounds.width;
      const maxY = canvasBounds.height - designBounds.height;
      
      const constrainedX = Math.max(0, Math.min(newX, maxX));
      const constrainedY = Math.max(0, Math.min(newY, maxY));
      
      setDesignPosition({
        x: constrainedX,
        y: constrainedY
      });
    }
  };
  
  // Handle mouse up to end dragging
  const handleMouseUp = () => {
    setIsDragging(false);
    
    // Notify parent of design changes
    if (onDesignChange) {
      onDesignChange({
        position: designPosition,
        scale,
        rotation
      });
    }
  };
  
  // Handle zoom in
  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 2));
  };
  
  // Handle zoom out
  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  };
  
  // Handle rotation
  const handleRotate = () => {
    setRotation(prev => (prev + 15) % 360);
  };
  
  // Handle reset
  const handleReset = () => {
    setDesignPosition({ x: 0, y: 0 });
    setScale(1);
    setRotation(0);
  };
  
  // Update parent component when design changes
  useEffect(() => {
    if (onDesignChange) {
      onDesignChange({
        position: designPosition,
        scale,
        rotation
      });
    }
  }, [designPosition, scale, rotation, onDesignChange]);
  
  return (
    <div className="relative w-full">
      {/* Canvas */}
      <div 
        ref={canvasRef}
        className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Product Image */}
        <img 
          src={productImage} 
          alt="Product" 
          className="w-full h-full object-contain"
        />
        
        {/* Print Area Indicator */}
        <div 
          className="absolute border-2 border-dashed border-indigo-400 rounded-md pointer-events-none"
          style={{
            top: printAreaPosition.top,
            left: printAreaPosition.left,
            width: printAreaPosition.width,
            height: printAreaPosition.height,
            transform: 'translate(-50%, -50%)'
          }}
        ></div>
        
        {/* Design Element */}
        {(designImage || designText) && (
          <div 
            ref={designRef}
            className={`absolute ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{
              top: `${designPosition.y}px`,
              left: `${designPosition.x}px`,
              transform: `scale(${scale}) rotate(${rotation}deg)`,
              transformOrigin: 'center center',
              zIndex: 10
            }}
            onMouseDown={handleMouseDown}
          >
            {designImage && (
              <img 
                src={designImage} 
                alt="Custom design" 
                className="max-w-full max-h-full object-contain"
              />
            )}
            
            {designText && (
              <div 
                className="text-center font-bold text-2xl"
                style={{
                  color: 'black',
                  textShadow: '1px 1px 0 white',
                  whiteSpace: 'nowrap'
                }}
              >
                {designText}
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Controls */}
      <div className="flex justify-center mt-4 space-x-2">
        <button 
          onClick={handleZoomIn}
          className="p-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          title="Zoom In"
        >
          <ZoomIn className="h-5 w-5" />
        </button>
        <button 
          onClick={handleZoomOut}
          className="p-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          title="Zoom Out"
        >
          <ZoomOut className="h-5 w-5" />
        </button>
        <button 
          onClick={handleRotate}
          className="p-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          title="Rotate"
        >
          <RotateCw className="h-5 w-5" />
        </button>
        <button 
          onClick={handleReset}
          className="p-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          title="Reset"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
      
      <div className="mt-2 text-sm text-gray-500 text-center">
        <Move className="h-4 w-4 inline-block mr-1" />
        Drag to position your design
      </div>
    </div>
  );
};

export default DesignCanvas;