// import React, { useState } from 'react';
// import './GroceryList.css';

// interface GroceryItem {
//   id: string;
//   name: string;
//   price: number;
// }

// interface GroceryListProps {
//   groceryItems: GroceryItem[];  // Use the full GroceryItem type
//   onAddToCart: (item: GroceryItem) => void;  // Change the expected type here to GroceryItem
//   onBackToDashboard: () => void;
// }

// // Define the shape of each category's items
// interface CategoryItem {
//   name: string;
//   price: number;
// }

// // Define the categories object with keys of specific strings (literal types) and array of CategoryItem objects
// const categories: Record<string, CategoryItem[]> = {
//   Beverages: [
//     { name: "Milk", price: 2.5 },
//     { name: "Chocolate Milk", price: 3.0 },
//     { name: "Apple Juice", price: 2.0 },
//     { name: "Orange Juice", price: 2.0 },
//     { name: "Grape Juice", price: 2.2 },
//     { name: "Sweet Tea", price: 1.5 },
//     { name: "Coffee", price: 4.0 }
//   ],
//   Bread_Bakery: [
//     { name: "White Bread", price: 1.5 },
//     { name: "Whole Grain Bread", price: 2.0 }
//   ],
//   Canned_Goods: [
//     { name: "Beans", price: 1.0 }
//   ],
//   Dairy: [
//     { name: "Cheese", price: 3.5 },
//     { name: "Milk", price: 2.5 }
//   ],
//   Dry_Goods: [
//     { name: "Sugar", price: 1.8 },
//     { name: "Flour", price: 1.5 }
//   ],
//   Frozen_Foods: [
//     { name: "Pizza", price: 5.0 }
//   ],
//   Meats: [
//     { name: "Steak", price: 10.0 }
//   ],
//   Fruits: [
//     { name: "Apples", price: 1.2 },
//     { name: "Oranges", price: 1.3 }
//   ],
//   Vegetables: [
//     { name: "Lettuce", price: 2.0 },
//     { name: "Tomatoes", price: 2.5 },
//     { name: "Onions", price: 1.0 }
//   ],
//   Paper_Goods: [
//     { name: "Toilet Paper", price: 3.0 }
//   ],
//   Cleaners: [
//     { name: "Windex", price: 4.5 }
//   ],
//   Personal_Care: [
//     { name: "Shampoo", price: 5.0 },
//     { name: "Conditioner", price: 5.0 }
//   ],
//   Others: [
//     { name: "Batteries", price: 2.0 }
//   ]
// };

// const GroceryList: React.FC<GroceryListProps> = ({ groceryItems, onAddToCart, onBackToDashboard }) => {
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

//   const handleCategoryClick = (category: string) => {
//     setSelectedCategory(category === selectedCategory ? null : category);
//   };

//   const handleAddToCart = (category: string, item: CategoryItem) => {
//     // Generate a unique 'id' when adding to cart (you can use a UUID or other methods)
//     const groceryItem: GroceryItem = {
//       id: `${category}-${item.name}`, // Simple approach to generate a unique ID
//       name: item.name,
//       price: item.price
//     };
//     onAddToCart(groceryItem);
//   };

//   return (
//     <div className="grocery-list-container">
//       <div className="grocery-list-content">
//         <ul className="category-list">
//           {Object.keys(categories).map((category, categoryIndex) => (
//             <li key={categoryIndex}>
//               <div className="category-item" onClick={() => handleCategoryClick(category)}>
//                 <strong>{category.replace('_', ' ')}</strong>
//               </div>
//               {selectedCategory === category && (
//                 <ul className="item-list">
//                   {categories[category].map((item, index) => (
//                     <li key={index} className="item">
//                       <span>{item.name} - ${item.price.toFixed(2)}</span>
//                       {/* Pass the category and item to the add to cart handler */}
//                       <button onClick={() => handleAddToCart(category, item)}>Add to Cart</button>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </li>
//           ))}
//         </ul>

//         <button className="back-to-dashboard" onClick={onBackToDashboard}>
//           Back to Dashboard
//         </button>
//       </div>
//     </div>
//   );
// };

// export default GroceryList;






import React, { useState } from 'react';
import './GroceryList.css';

interface GroceryItem {
  id: string;
  name: string;
  price: number;
}

interface GroceryListProps {
  groceryItems: GroceryItem[];
  onAddToCart: (item: GroceryItem) => void;
  onBackToDashboard: () => void;
}

interface CategoryItem {
  name: string;
  price: number;
}

const categories: Record<string, CategoryItem[]> = {
  Beverages: [
    { name: "Milk", price: 2.5 },
    { name: "Chocolate Milk", price: 3.0 },
    { name: "Apple Juice", price: 2.0 },
    { name: "Orange Juice", price: 2.0 },
    { name: "Grape Juice", price: 2.2 },
    { name: "Sweet Tea", price: 1.5 },
    { name: "Coffee", price: 4.0 }
  ],
  Bread_Bakery: [
    { name: "White Bread", price: 1.5 },
    { name: "Whole Grain Bread", price: 2.0 },
    { name: "Bimbo Bread", price: 1.2 },
    { name: "Bagels", price: 2.5 },
    { name: "Corn Tortillas", price: 2.0 },
    { name: "Flour Tortillas", price: 2.3 }
  ],
  Canned_Goods: [
    { name: "Beans", price: 1.0 },
    { name: "Green Beans", price: .9 },
    { name: "Spaghetti Sauce", price: 3.0 },
    { name: "Ketchup", price: 2.5 },
    { name: "Mustard", price: 2.5 },
    { name: "Mayonese", price: 2.5 }
  ],
  Dairy: [
    { name: "Milk", price: 3.5 },
    { name: "American Cheese", price: 1.5 },
    { name: "Pepper Jack Cheese", price: 2.0 },
    { name: "Oaxaca Cheese", price: 2.5 },
    { name: "Eggs", price: 4.0 },
    { name: "Strawberry Yogurt", price: 2.1 },
    { name: "Banana Yogurt", price: 2.1 },
    { name: "Butter", price: 1.3 }
  ],
  Dry_Goods: [
    { name: "Sugar", price: 1.8 },
    { name: "Flour", price: 1.5 },
    { name: "Froot Loops Cereal", price: 4.5 },
    { name: "Lucky Charms Cereal", price: 4.5 },
    { name: "Cheerios Cereal", price: 4.5 },
    { name: "Pasta", price: 7.5 }
  ],
  Frozen_Foods: [
    { name: "Pizza", price: 5.0 },
    { name: "Waffles", price: 4.0 },
    { name: "Chocolate Ice Cream", price: 3.0 },
    { name: "Strawberry Ice Cream", price: 3.0 },
    { name: "Vanilla Ice Cream", price: 3.0 }
  ],
  Meats: [
    { name: "Steak", price: 10.0 },
    { name: "Beef", price: 7.0 },
    { name: "Pork", price: 8.5 },
    { name: "Sirloin", price: 15.7 }
  ],
  Fruits: [
    { name: "Apples", price: 1.2 },
    { name: "Oranges", price: 1.3 },
    { name: "Grapes", price: 1.4 },
    { name: "Bananas", price: 1.7 },
    { name: "Strawberries", price: 1.2 },
    { name: "Peaches", price: 1.5 }
  ],
  Vegetables: [
    { name: "Lettuce", price: 2.0 },
    { name: "Tomatoes", price: 2.5 },
    { name: "Onions", price: 1.0 },
    { name: "Pickles", price: 1.3 },
    { name: "Green Peppers", price: 1.1 },
    { name: "Avocado", price: 4.0 }
  ],
  Paper_Goods: [
    { name: "Toilet Paper", price: 3.0 },
    { name: "Paper Towels", price: 2.3 },
    { name: "Kleenex", price: 3.6 },
    { name: "Aluminum Foil", price: 1.5 },
    { name: "Sandwich Bags", price: 0.7 }
  ],
  Cleaners: [
    { name: "Windex", price: 4.5 },
    { name: "Detergent", price: 3.9 },
    { name: "Dishwashing Liquid", price: 3.5 },
    { name: "Sponges", price: 2.0 }
  ],
  Personal_Care: [
    { name: "Shampoo", price: 5.0 },
    { name: "Conditioner", price: 5.0 },
    { name: "Soap", price: 2.5 },
    { name: "Hand Soap", price: 2.2 },
    { name: "Shaving Cream", price: 1.7 }
  ],
  Others: [
    { name: "Batteries", price: 2.0 },
    { name: "Greeting Cards", price: 1.0 },
    { name: "Gift Cards", price: 10.0 },
    { name: "Pedigree", price: 8.5 },
    { name: "Toys", price: 1.5 },
    { name: "Diapers", price: 3.0 }
  ]
};

const GroceryList: React.FC<GroceryListProps> = ({ groceryItems, onAddToCart, onBackToDashboard }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const handleAddToCart = (category: string, item: CategoryItem) => {
    const groceryItem: GroceryItem = {
      id: `${category}-${item.name}`, // Unique ID for each item
      name: item.name,
      price: item.price,
    };
    onAddToCart(groceryItem); // Pass to parent to handle Firestore interaction
  };

  return (
    <div className="grocery-list-container">
      <div className="grocery-list-content">
        <ul className="category-list">
          {Object.keys(categories).map((category, categoryIndex) => (
            <li key={categoryIndex}>
              <div className="category-item" onClick={() => handleCategoryClick(category)}>
                <strong>{category.replace('_', ' ')}</strong>
              </div>
              {selectedCategory === category && (
                <ul className="item-list">
                  {categories[category].map((item, index) => (
                    <li key={index} className="item">
                      <span>{item.name} - ${item.price.toFixed(2)}</span>
                      <button onClick={() => handleAddToCart(category, item)}>Add to Cart</button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <button className="back-to-dashboard" onClick={onBackToDashboard}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default GroceryList;
