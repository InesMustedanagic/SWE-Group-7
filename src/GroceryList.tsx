

import React, { useState } from 'react';
import './GroceryList.css';

interface GroceryListProps {
  groceryItems: any[];
  onAddToCart: (item: string) => void;
  onBackToDashboard: () => void;
}

const GroceryList: React.FC<GroceryListProps> = ({ groceryItems, onAddToCart, onBackToDashboard }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // To track which category is selected

  // Options for each category
  const categories = {
    Beverages: ["Milk", "Chocolate Milk", "Apple Juice", "Orange Juice", "Grape Juice", "Sweet Tea", "Coffee"],
    Bread_Bakery: ["White Bread", "Whole Grain Bread"],
    Canned_Goods: ["Beans"],
    Dairy: ["Cheese", "Milk"],
    Dry_Goods: ["Sugar", "Flour"],
    Frozen_Foods: ["Pizza"],
    Meats: ["Steak"],
    Fruits: ["Apples", "Oranges"],
    Vegetables: ["Lettuce", "Tomatoes", "Onions"],
    Paper_Goods: ["Toilet Paper"],
    Cleaners: ["Windex"],
    Personal_Care: ["Shampoo", "Conditioner"],
    Others: ["Batteries"]
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  return (
    <div className="grocery-list-container">
      <div className="grocery-list-content">
        {/* Category ListView */}
        <ul className="category-list">
          <li>
            <div className="category-item" onClick={() => handleCategoryClick("Beverages")}>
              <strong>Beverages</strong>
            </div>
            {selectedCategory === "Beverages" && (
              <ul className="item-list">
                {categories.Beverages.map((item, index) => (
                  <li key={index} className="item">
                    <span>{item}</span>
                    <button onClick={() => onAddToCart(item)}>Add to Cart</button>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <div className="category-item" onClick={() => handleCategoryClick("Bread_Bakery")}>
              <strong>Bread/Bakery</strong>
            </div>
            {selectedCategory === "Bread_Bakery" && (
              <ul className="item-list">
                {categories.Bread_Bakery.map((item, index) => (
                  <li key={index} className="item">
                    <span>{item}</span>
                    <button onClick={() => onAddToCart(item)}>Add to Cart</button>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <div className="category-item" onClick={() => handleCategoryClick("Canned_Goods")}>
              <strong>Canned_Goods</strong>
            </div>
            {selectedCategory === "Canned_Goods" && (
              <ul className="item-list">
                {categories.Canned_Goods.map((item, index) => (
                  <li key={index} className="item">
                    <span>{item}</span>
                    <button onClick={() => onAddToCart(item)}>Add to Cart</button>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <div className="category-item" onClick={() => handleCategoryClick("Dairy")}>
              <strong>Dairy</strong>
            </div>
            {selectedCategory === "Dairy" && (
              <ul className="item-list">
                {categories.Dairy.map((item, index) => (
                  <li key={index} className="item">
                    <span>{item}</span>
                    <button onClick={() => onAddToCart(item)}>Add to Cart</button>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <div className="category-item" onClick={() => handleCategoryClick("Dry_Goods")}>
              <strong>Dry Goods</strong>
            </div>
            {selectedCategory === "Dry_Goods" && (
              <ul className="item-list">
                {categories.Dry_Goods.map((item, index) => (
                  <li key={index} className="item">
                    <span>{item}</span>
                    <button onClick={() => onAddToCart(item)}>Add to Cart</button>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <div className="category-item" onClick={() => handleCategoryClick("Frozen_Foods")}>
              <strong>Frozen Foods</strong>
            </div>
            {selectedCategory === "Frozen_Foods" && (
              <ul className="item-list">
                {categories.Frozen_Foods.map((item, index) => (
                  <li key={index} className="item">
                    <span>{item}</span>
                    <button onClick={() => onAddToCart(item)}>Add to Cart</button>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <div className="category-item" onClick={() => handleCategoryClick("Meats")}>
              <strong>Meats</strong>
            </div>
            {selectedCategory === "Meats" && (
              <ul className="item-list">
                {categories.Meats.map((item, index) => (
                  <li key={index} className="item">
                    <span>{item}</span>
                    <button onClick={() => onAddToCart(item)}>Add to Cart</button>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <div className="category-item" onClick={() => handleCategoryClick("Fruits")}>
              <strong>Fruits</strong>
            </div>
            {selectedCategory === "Fruits" && (
              <ul className="item-list">
                {categories.Fruits.map((item, index) => (
                  <li key={index} className="item">
                    <span>{item}</span>
                    <button onClick={() => onAddToCart(item)}>Add to Cart</button>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <div className="category-item" onClick={() => handleCategoryClick("Vegetables")}>
              <strong>Vegetables</strong>
            </div>
            {selectedCategory === "Vegetables" && (
              <ul className="item-list">
                {categories.Vegetables.map((item, index) => (
                  <li key={index} className="item">
                    <span>{item}</span>
                    <button onClick={() => onAddToCart(item)}>Add to Cart</button>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <div className="category-item" onClick={() => handleCategoryClick("Paper_Goods")}>
              <strong>Paper Goods</strong>
            </div>
            {selectedCategory === "Paper_Goods" && (
              <ul className="item-list">
                {categories.Paper_Goods.map((item, index) => (
                  <li key={index} className="item">
                    <span>{item}</span>
                    <button onClick={() => onAddToCart(item)}>Add to Cart</button>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <div className="category-item" onClick={() => handleCategoryClick("Cleaners")}>
              <strong>Cleaners</strong>
            </div>
            {selectedCategory === "Cleaners" && (
              <ul className="item-list">
                {categories.Cleaners.map((item, index) => (
                  <li key={index} className="item">
                    <span>{item}</span>
                    <button onClick={() => onAddToCart(item)}>Add to Cart</button>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <div className="category-item" onClick={() => handleCategoryClick("Personal_Care")}>
              <strong>Personal Care</strong>
            </div>
            {selectedCategory === "Personal_Care" && (
              <ul className="item-list">
                {categories.Personal_Care.map((item, index) => (
                  <li key={index} className="item">
                    <span>{item}</span>
                    <button onClick={() => onAddToCart(item)}>Add to Cart</button>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <div className="category-item" onClick={() => handleCategoryClick("Others")}>
              <strong>Others</strong>
            </div>
            {selectedCategory === "Others" && (
              <ul className="item-list">
                {categories.Others.map((item, index) => (
                  <li key={index} className="item">
                    <span>{item}</span>
                    <button onClick={() => onAddToCart(item)}>Add to Cart</button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>

        {/* Back to Dashboard Button */}
        <button className="back-to-dashboard" onClick={onBackToDashboard}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default GroceryList;
