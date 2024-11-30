// // GroceryList.tsx
// import React, { useState } from 'react';

// interface GroceryListProps {
//   groceryItems: any[]; 
//   onAddToCart: (item: string) => void; // Define the type for onAddToCart prop
//   onBackToDashboard: () => void; // Define the type for onBackToDashboard prop
// }

// const GroceryList: React.FC<GroceryListProps> = ({ groceryItems, onAddToCart, onBackToDashboard }) => {
//   const [availableItems] = useState(["Apples", "Bananas", "Bread", "Milk", "Eggs"]);
//   const [currentList, checkCurrentList] = useState<string[]>([]);
//   const [availableMeals] = useState(["Burgers", "Chicken Tenders", "Lasagna", "Salad"]);
//   const [chosenMeals, checkMeals] = useState<string[]>([]);

//   const [Burgers] = useState(["Bread", "Lettuce", "Meat", "Tomato", "Onions"]);
//   const [Chicken_Tenders] = useState(["Chicken", "Fries", "Ketchup"]);
//   const [Lasagna] = useState(["Tomato", "Cheese", "Meat"]);
//   const [Salad] = useState(["Lettuce", "Tomato", "Dressing", "Cheese"]);

//   const addItem = (item: string) => {
//     checkCurrentList(prevList => [...prevList, item]);
//     onAddToCart(item); // Call onAddToCart when an item is added
//   };

//   const addMeal = (item: string) => {
//     checkMeals(prevList => {
//       if (prevList.includes(item)) {
//         return prevList.filter(meal => meal !== item);
//       } else {
//         return [...prevList, item];
//       }
//     });
//   };

//   const [favorite, checkFavorite] = useState<string[]>([]);
//   const addFavorite = (item: string) => {
//     checkFavorite(prevList => {
//       if (prevList.includes(item)) {
//         return prevList.filter(fav => fav !== item);
//       } else {
//         return [...prevList, item];
//       }
//     });
//   };

//   const [Review, checkReview] = useState('');
//   const Reviews = (value: string) => {
//     checkReview(value);
//   };

//   const addReview = (item: string) => {
//     console.log('Review added:', Review);
//     checkReview('');
//   };

//   return (
//     <div className='picks'>
//       {/* <button onClick={onBackToDashboard}>Back to Dashboard</button> Back to Dashboard button */}

//       <div className='available'>
//         <h2>Available picks!</h2>
//         <ul>
//           {availableItems.map((item, index) => (
//             <li key={index}>
//               <button onClick={() => addFavorite(item)}>❤️</button>
//               {item}
//               <button onClick={() => addItem(item)}>Add</button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className='favorite'>
//         <h2>Favorites</h2>
//         <ul>
//           {favorite.map((item, index) => (
//             <li key={index}>{item}</li>
//           ))}
//         </ul>
//       </div>

//       <div className='current'>
//         <h2>Current picks</h2>
//         <ul>
//           {currentList.map((item, index) => (
//             <li key={index}>{item}</li>
//           ))}
//         </ul>
//       </div>

//       <div className='mealoptions'>
//         <h2>Meal Plan Options</h2>
//         <ul>
//           {availableMeals.map((item, index) => (
//             <li key={index}>{item}<button onClick={() => addMeal(item)}>Choose</button></li>
//           ))}
//         </ul>
//       </div>

//       <div className='mealchosen'>
//         <h2>Meal Plans Chosen</h2>
//         <ul>
//           {chosenMeals.map((item, index) => (
//             <li key={index}>{item}<li>ingredients:</li>
//               {item === "Burgers" ? Burgers.map((item, index) => (<li key={index}>{item}</li>)) :
//               item === "Chicken Tenders" ? Chicken_Tenders.map((item, index) => (<li key={index}>{item}</li>)) :
//               item === "Lasagna" ? Lasagna.map((item, index) => (<li key={index}>{item}</li>)) :
//               item === "Salad" ? Salad.map((item, index) => (<li key={index}>{item}</li>)) : null}<p></p></li>
//           ))}
//         </ul>
//       </div>

//       <div className='userreview'>
//         <h2>User Reviews</h2>
//         <ul>
//           <input value={Review} onChange={(form) => Reviews(form.target.value)} />
//           <button onClick={() => addReview(Review)}>Add</button>
//         </ul>
//       </div>

//       <button className="back-to-dashboard-btn" onClick={onBackToDashboard}>Back to Dashboard</button>
//     </div>
//   );
// };

// export default GroceryList;



import React, { useState } from 'react';
import './GroceryList.css';  // Import the CSS file

interface GroceryListProps {
  groceryItems: any[]; // The list of grocery items (if applicable)
  onAddToCart: (item: string) => void; // Function to add an item to the cart
  onBackToDashboard: () => void; // Function to navigate back to the dashboard
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
    setSelectedCategory(category === selectedCategory ? null : category); // Toggle the category visibility
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
