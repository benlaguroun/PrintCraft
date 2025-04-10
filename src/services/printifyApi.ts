import axios from "axios";

// Printify API base URL
const API_BASE_URL = "https://api.printify.com/v1";

// This would typically be stored in environment variables
const PRINTIFY_API_KEY =
  process.env.PRINTIFY_API_KEY ||
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6ImE2YTUxZWU0NGI5NTE3OTFiZjU3ZmY3YWQ5ZTI2ZjE1MDcxMWQwOWRhMmJjYmI4NzRmNDJlY2Q0OWNlMmJmMzcwOThiYWZkNzE1ZjNjMDM2IiwiaWF0IjoxNzQxOTA0MDA3LjMxNTgzOCwibmJmIjoxNzQxOTA0MDA3LjMxNTg0LCJleHAiOjE3NzM0NDAwMDcuMzAyODczLCJzdWIiOiIyMjM0ODY3OCIsInNjb3BlcyI6WyJzaG9wcy5tYW5hZ2UiLCJzaG9wcy5yZWFkIiwiY2F0YWxvZy5yZWFkIiwib3JkZXJzLnJlYWQiLCJvcmRlcnMud3JpdGUiLCJwcm9kdWN0cy5yZWFkIiwicHJvZHVjdHMud3JpdGUiLCJ3ZWJob29rcy5yZWFkIiwid2ViaG9va3Mud3JpdGUiLCJ1cGxvYWRzLnJlYWQiLCJ1cGxvYWRzLndyaXRlIiwicHJpbnRfcHJvdmlkZXJzLnJlYWQiLCJ1c2VyLmluZm8iXX0.AGFSpmTqgbNgL2MR1tMeO5m8MrrBjNr3tK--2bD5urJLxkqnv-ZfiY0UwNluUJRanhEzbmTdApEWUn1rFhs";

// Create axios instance with default config
const printifyApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${PRINTIFY_API_KEY}`,
    "Content-Type": "application/json",
  },
});

// Get all shops
export const getShops = async () => {
  try {
    const response = await printifyApi.get("/shops");
    return response.data;
  } catch (error) {
    console.error("Error fetching shops:", error);
    throw error;
  }
};

// Get all products for a shop
export const getProducts = async (shopId: string) => {
  try {
    const response = await printifyApi.get(`/shops/${shopId}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Get a single product
export const getProduct = async (shopId: string, productId: string) => {
  try {
    const response = await printifyApi.get(
      `/shops/${shopId}/products/${productId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

// Get all print providers
export const getPrintProviders = async () => {
  try {
    const response = await printifyApi.get("/catalog/print-providers");
    return response.data;
  } catch (error) {
    console.error("Error fetching print providers:", error);
    throw error;
  }
};

// Get all blueprints (product templates)
export const getBlueprints = async (printProviderId: string) => {
  try {
    const response = await printifyApi.get(
      `/catalog/print-providers/${printProviderId}/blueprints`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching blueprints:", error);
    throw error;
  }
};

// Get blueprint variants
export const getBlueprintVariants = async (
  printProviderId: string,
  blueprintId: string
) => {
  try {
    const response = await printifyApi.get(
      `/catalog/print-providers/${printProviderId}/blueprints/${blueprintId}/variants`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching blueprint variants:", error);
    throw error;
  }
};

// Create a new product
export const createProduct = async (shopId: string, productData: any) => {
  try {
    const response = await printifyApi.post(
      `/shops/${shopId}/products`,
      productData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

// Update an existing product
export const updateProduct = async (
  shopId: string,
  productId: string,
  productData: any
) => {
  try {
    const response = await printifyApi.put(
      `/shops/${shopId}/products/${productId}`,
      productData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Publish a product
export const publishProduct = async (shopId: string, productId: string) => {
  try {
    const response = await printifyApi.post(
      `/shops/${shopId}/products/${productId}/publish`
    );
    return response.data;
  } catch (error) {
    console.error("Error publishing product:", error);
    throw error;
  }
};

// Create an order
export const createOrder = async (shopId: string, orderData: any) => {
  try {
    const response = await printifyApi.post(
      `/shops/${shopId}/orders`,
      orderData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

// Get order details
export const getOrder = async (shopId: string, orderId: string) => {
  try {
    const response = await printifyApi.get(
      `/shops/${shopId}/orders/${orderId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};

// Get shipping costs
export const getShippingCosts = async (shopId: string, addressData: any) => {
  try {
    const response = await printifyApi.post(
      `/shops/${shopId}/shipping`,
      addressData
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching shipping costs:", error);
    throw error;
  }
};

// Upload an image to Printify
export const uploadImage = async (shopId: string, imageData: any) => {
  try {
    const response = await printifyApi.post(
      `/shops/${shopId}/uploads/images`,
      imageData
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export default {
  getShops,
  getProducts,
  getProduct,
  getPrintProviders,
  getBlueprints,
  getBlueprintVariants,
  createProduct,
  updateProduct,
  publishProduct,
  createOrder,
  getOrder,
  getShippingCosts,
  uploadImage,
};
