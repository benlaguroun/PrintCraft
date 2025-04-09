import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import { products } from "../data/products";
import { Product } from "../types";

const ProductsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get("category");

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryParam
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    sort: true,
  });

  // Get all unique categories
  const categories = [...new Set(products.map((product) => product.category))];

  // Filter and sort products
  useEffect(() => {
    let result = [...products];

    // Apply category filter
    if (selectedCategory) {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Apply price filter
    result = result.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // 'featured' - no sorting needed
        break;
    }

    setFilteredProducts(result);
  }, [selectedCategory, priceRange, sortBy]);

  // Update URL when category changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (selectedCategory) {
      params.set("category", selectedCategory);
    } else {
      params.delete("category");
    }

    const newUrl = `${location.pathname}${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    window.history.replaceState({}, "", newUrl);
  }, [selectedCategory, location]);

  // Initialize from URL params
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setIsMobileFilterOpen(false);
  };

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange([min, max]);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const clearAllFilters = () => {
    setSelectedCategory(null);
    setPriceRange([0, 100]);
    setSortBy("featured");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {selectedCategory
          ? `${selectedCategory
              .replace("-", " ")
              .replace(/\b\w/g, (l) => l.toUpperCase())}`
          : "All Products"}
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-md"
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>

          <div className="flex items-center space-x-2">
            <label htmlFor="mobile-sort" className="text-sm">
              Sort by:
            </label>
            <select
              id="mobile-sort"
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="border rounded-md p-2 text-sm"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
        </div>

        {/* Sidebar Filters */}
        <aside
          className={`w-full md:w-64 ${
            isMobileFilterOpen ? "block" : "hidden"
          } md:block`}
        >
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                onClick={clearAllFilters}
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                Clear All
              </button>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <div
                className="flex justify-between items-center cursor-pointer mb-2"
                onClick={() => toggleSection("categories")}
              >
                <h3 className="font-medium">Categories</h3>
                {expandedSections.categories ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </div>

              {expandedSections.categories && (
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="all-categories"
                      name="category"
                      checked={selectedCategory === null}
                      onChange={() => handleCategoryChange(null)}
                      className="mr-2"
                    />
                    <label htmlFor="all-categories">All Categories</label>
                  </div>

                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        type="radio"
                        id={`category-${category}`}
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => handleCategoryChange(category)}
                        className="mr-2"
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="capitalize"
                      >
                        {category.replace("-", " ")}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <div
                className="flex justify-between items-center cursor-pointer mb-2"
                onClick={() => toggleSection("price")}
              >
                <h3 className="font-medium">Price Range</h3>
                {expandedSections.price ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </div>

              {expandedSections.price && (
                <div>
                  <div className="flex justify-between mb-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange[1]}
                    onChange={(e) =>
                      handlePriceChange(priceRange[0], parseInt(e.target.value))
                    }
                    className="w-full"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handlePriceChange(0, 25)}
                      className={`px-2 py-1 text-xs rounded ${
                        priceRange[0] === 0 && priceRange[1] === 25
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      Under $25
                    </button>
                    <button
                      onClick={() => handlePriceChange(25, 50)}
                      className={`px-2 py-1 text-xs rounded ${
                        priceRange[0] === 25 && priceRange[1] === 50
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      $25 - $50
                    </button>
                    <button
                      onClick={() => handlePriceChange(50, 100)}
                      className={`px-2 py-1 text-xs rounded ${
                        priceRange[0] === 50 && priceRange[1] === 100
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      $50+
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sort By (Desktop) */}
            <div className="hidden md:block">
              <div
                className="flex justify-between items-center cursor-pointer mb-2"
                onClick={() => toggleSection("sort")}
              >
                <h3 className="font-medium">Sort By</h3>
                {expandedSections.sort ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </div>

              {expandedSections.sort && (
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="sort-featured"
                      name="sort"
                      checked={sortBy === "featured"}
                      onChange={() => handleSortChange("featured")}
                      className="mr-2"
                    />
                    <label htmlFor="sort-featured">Featured</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="sort-price-low"
                      name="sort"
                      checked={sortBy === "price-low"}
                      onChange={() => handleSortChange("price-low")}
                      className="mr-2"
                    />
                    <label htmlFor="sort-price-low">Price: Low to High</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="sort-price-high"
                      name="sort"
                      checked={sortBy === "price-high"}
                      onChange={() => handleSortChange("price-high")}
                      className="mr-2"
                    />
                    <label htmlFor="sort-price-high">Price: High to Low</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="sort-name-asc"
                      name="sort"
                      checked={sortBy === "name-asc"}
                      onChange={() => handleSortChange("name-asc")}
                      className="mr-2"
                    />
                    <label htmlFor="sort-name-asc">Name: A to Z</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="sort-name-desc"
                      name="sort"
                      checked={sortBy === "name-desc"}
                      onChange={() => handleSortChange("name-desc")}
                      className="mr-2"
                    />
                    <label htmlFor="sort-name-desc">Name: Z to A</label>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Close Button */}
            <div className="md:hidden mt-4">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-gray-200 py-2 rounded-md flex items-center justify-center"
              >
                <X className="h-4 w-4 mr-2" />
                Close Filters
              </button>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">
                No products found matching your criteria.
              </p>
              <button
                onClick={clearAllFilters}
                className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <Link to={`/products/${product.id}`}>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                  </Link>
                  <div className="p-4">
                    <Link to={`/products/${product.id}`}>
                      <h3 className="text-lg font-semibold mb-2">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">
                        ${product.price.toFixed(2)}
                      </span>
                      <Link
                        to={`/products/${product.id}`}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
