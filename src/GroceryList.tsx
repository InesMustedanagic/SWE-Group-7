import React, { useState } from 'react';
import './GroceryList.css';


// interface for our items
// shown previously in project
// stores in firebase
interface GroceryItem {
  id: string;
  name: string;
  price: number;
}


// another reused interface
interface GroceryListProps {
  groceryItems: GroceryItem[];
  onAddToCart: (item: GroceryItem) => void;
  onBackToDashboard: () => void;
}


// new interface
// used to associate items with their category
// for example, milk associated with dairy caregory
interface CategoryItem {
  name: string;
  price: number;
}





// each category being associated with their own record
// string of what the category is named
// followed by whatever item and price
// reused a couple times for each category

const categories: Record<string, CategoryItem[]> = {
  Beverages: [
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




// creating react component
// used for string search
// also used to expand the individual category tab
// if viewing a category, can open and see items in the category
const GroceryList: React.FC<GroceryListProps> = ({ groceryItems, onAddToCart, onBackToDashboard }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);


  // this search option takes the string the users input
  // this turns to lowercase and looks for all items that match the string input by the user
  const filterItems = (items: CategoryItem[]) => {
    return items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  
  // this filters for what matches your search, if empty, doesnt matter
  const filteredItems = Object.values(categories).flatMap(category => filterItems(category));





  // have to comment all html code below from here
  // basic html front end work of formatting
  // matching values with buttons and divs
  // search is updated from each change of the search bar
  // this dynamically updates the search by each change of the bar
  // shows every category if the search is empty
  // shows items in categories once clicked on

  return (
    <div className="grocery-list-container">
      <div className="grocery-list-content">
        {/* search */}
        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for an item..."
            className="search-input"
          />
        </div>


        {/* shows filtered items */}
        {searchTerm && filteredItems.length > 0 && (
          <div className="filtered-items">
            <h3>Filtered Items</h3>
            <ul className="item-list">
              {filteredItems.map((item, index) => (
                <li key={index} className="item">
                  <span>{item.name} - ${item.price.toFixed(2)}</span>
                  <button onClick={() => onAddToCart({ id: item.name, name: item.name, price: item.price })}>
                    Add to Cart
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}



        {/* shows if empty */}
        {!searchTerm && (
          <ul className="category-list">
            {Object.keys(categories).map((category, categoryIndex) => {
              return (
                <li key={categoryIndex}>
                  <div className="category-item" onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}>
                    <strong>{category.replace('_', ' ')}</strong>
                  </div>

                  {/* show item when expanded */}
                  {expandedCategory === category && (
                    <ul className="item-list">
                      {categories[category].map((item, index) => (
                        <li key={index} className="item">
                          <span>{item.name} - ${item.price.toFixed(2)}</span>
                          <button onClick={() => onAddToCart({ id: item.name, name: item.name, price: item.price })}>
                            Add to Cart
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        {/* dashboard button */}
        <button className="back-to-dashboard" onClick={onBackToDashboard}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};


// all code above is functionality of the dashboard
// the search feature, expansion of a category, dashboard button 
export default GroceryList;
