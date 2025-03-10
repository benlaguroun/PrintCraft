import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic T-Shirt',
    description: 'A comfortable cotton t-shirt perfect for everyday wear. Add your custom design to make it uniquely yours.',
    price: 24.99,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    category: 't-shirts',
    variants: [
      { id: '1-1', name: 'White / S', color: 'white', size: 'S', inStock: true },
      { id: '1-2', name: 'White / M', color: 'white', size: 'M', inStock: true },
      { id: '1-3', name: 'White / L', color: 'white', size: 'L', inStock: true },
      { id: '1-4', name: 'White / XL', color: 'white', size: 'XL', inStock: true },
      { id: '1-5', name: 'Black / S', color: 'black', size: 'S', inStock: true },
      { id: '1-6', name: 'Black / M', color: 'black', size: 'M', inStock: true },
      { id: '1-7', name: 'Black / L', color: 'black', size: 'L', inStock: true },
      { id: '1-8', name: 'Black / XL', color: 'black', size: 'XL', inStock: true },
      { id: '1-9', name: 'Gray / S', color: 'gray', size: 'S', inStock: true },
      { id: '1-10', name: 'Gray / M', color: 'gray', size: 'M', inStock: true },
      { id: '1-11', name: 'Gray / L', color: 'gray', size: 'L', inStock: true },
      { id: '1-12', name: 'Gray / XL', color: 'gray', size: 'XL', inStock: true },
    ],
    customizable: true,
    customizationOptions: [
      {
        id: 'text-1',
        name: 'Add Text',
        type: 'text',
        required: false,
      },
      {
        id: 'image-1',
        name: 'Upload Image',
        type: 'image',
        required: false,
      },
      {
        id: 'position-1',
        name: 'Design Position',
        type: 'position',
        required: true,
        options: ['front', 'back', 'left sleeve', 'right sleeve'],
      },
    ],
  },
  {
    id: '2',
    name: 'Premium Hoodie',
    description: 'A warm and cozy hoodie made from high-quality materials. Perfect for cooler weather and casual outings.',
    price: 49.99,
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    category: 'hoodies',
    variants: [
      { id: '2-1', name: 'Black / S', color: 'black', size: 'S', inStock: true },
      { id: '2-2', name: 'Black / M', color: 'black', size: 'M', inStock: true },
      { id: '2-3', name: 'Black / L', color: 'black', size: 'L', inStock: true },
      { id: '2-4', name: 'Black / XL', color: 'black', size: 'XL', inStock: true },
      { id: '2-5', name: 'Navy / S', color: 'navy', size: 'S', inStock: true },
      { id: '2-6', name: 'Navy / M', color: 'navy', size: 'M', inStock: true },
      { id: '2-7', name: 'Navy / L', color: 'navy', size: 'L', inStock: true },
      { id: '2-8', name: 'Navy / XL', color: 'navy', size: 'XL', inStock: true },
      { id: '2-9', name: 'Gray / S', color: 'gray', size: 'S', inStock: true },
      { id: '2-10', name: 'Gray / M', color: 'gray', size: 'M', inStock: true },
      { id: '2-11', name: 'Gray / L', color: 'gray', size: 'L', inStock: true },
      { id: '2-12', name: 'Gray / XL', color: 'gray', size: 'XL', inStock: true },
    ],
    customizable: true,
    customizationOptions: [
      {
        id: 'text-1',
        name: 'Add Text',
        type: 'text',
        required: false,
      },
      {
        id: 'image-1',
        name: 'Upload Image',
        type: 'image',
        required: false,
      },
      {
        id: 'position-1',
        name: 'Design Position',
        type: 'position',
        required: true,
        options: ['front', 'back', 'left sleeve', 'right sleeve'],
      },
    ],
  },
  {
    id: '3',
    name: 'Ceramic Mug',
    description: 'A high-quality ceramic mug that\'s perfect for your morning coffee or tea. Personalize it with your favorite design or photo.',
    price: 14.99,
    images: [
      'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1570784332176-fdd73da66f03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    category: 'mugs',
    variants: [
      { id: '3-1', name: 'White / 11oz', color: 'white', size: '11oz', inStock: true },
      { id: '3-2', name: 'White / 15oz', color: 'white', size: '15oz', inStock: true, price: 16.99 },
      { id: '3-3', name: 'Black / 11oz', color: 'black', size: '11oz', inStock: true },
      { id: '3-4', name: 'Black / 15oz', color: 'black', size: '15oz', inStock: true, price: 16.99 },
    ],
    customizable: true,
    customizationOptions: [
      {
        id: 'text-1',
        name: 'Add Text',
        type: 'text',
        required: false,
      },
      {
        id: 'image-1',
        name: 'Upload Image',
        type: 'image',
        required: false,
      },
    ],
  },
  {
    id: '4',
    name: 'Canvas Print',
    description: 'Turn your photos or artwork into stunning canvas prints. Perfect for decorating your home or office.',
    price: 39.99,
    images: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582574501058-6f3b7c8a9286?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    category: 'wall-art',
    variants: [
      { id: '4-1', name: '8x10 inches', size: '8x10', inStock: true },
      { id: '4-2', name: '12x16 inches', size: '12x16', inStock: true, price: 49.99 },
      { id: '4-3', name: '16x20 inches', size: '16x20', inStock: true, price: 59.99 },
      { id: '4-4', name: '20x30 inches', size: '20x30', inStock: true, price: 79.99 },
    ],
    customizable: true,
    customizationOptions: [
      {
        id: 'image-1',
        name: 'Upload Image',
        type: 'image',
        required: true,
      },
    ],
  },
  {
    id: '5',
    name: 'Phone Case',
    description: 'Protect your phone with a custom case featuring your favorite design, photo, or artwork.',
    price: 19.99,
    images: [
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541877944-ac82a091518a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    category: 'phone-cases',
    variants: [
      { id: '5-1', name: 'iPhone 13', size: 'iPhone 13', inStock: true },
      { id: '5-2', name: 'iPhone 13 Pro', size: 'iPhone 13 Pro', inStock: true },
      { id: '5-3', name: 'iPhone 13 Pro Max', size: 'iPhone 13 Pro Max', inStock: true },
      { id: '5-4', name: 'iPhone 14', size: 'iPhone 14', inStock: true },
      { id: '5-5', name: 'iPhone 14 Pro', size: 'iPhone 14 Pro', inStock: true },
      { id: '5-6', name: 'iPhone 14 Pro Max', size: 'iPhone 14 Pro Max', inStock: true },
      { id: '5-7', name: 'Samsung Galaxy S22', size: 'Samsung Galaxy S22', inStock: true },
      { id: '5-8', name: 'Samsung Galaxy S22+', size: 'Samsung Galaxy S22+', inStock: true },
      { id: '5-9', name: 'Samsung Galaxy S22 Ultra', size: 'Samsung Galaxy S22 Ultra', inStock: true },
    ],
    customizable: true,
    customizationOptions: [
      {
        id: 'text-1',
        name: 'Add Text',
        type: 'text',
        required: false,
      },
      {
        id: 'image-1',
        name: 'Upload Image',
        type: 'image',
        required: false,
      },
    ],
  },
];