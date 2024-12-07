// AddGroceryItem.tsx
// import React, { useState } from 'react';
// import { addGroceryItem } from './firebase-config'; // Make sure the path is correct

// const AddGroceryItem: React.FC = () => {
//   const [itemName, setItemName] = useState<string>('');
//   const [itemPrice, setItemPrice] = useState<number>(0);

//   const handleAddItem = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!itemName || itemPrice <= 0) {
//       alert('Please provide valid item details.');
//       return;
//     }

//     try {
//       await addGroceryItem(itemName, itemPrice);
//       setItemName('');
//       setItemPrice(0); // Reset form after successful item addition
//       alert('Item added successfully!');
//     } catch (error) {
//       console.error('Error adding grocery item:', error);
//       alert('Error adding grocery item!');
//     }
//   };

//   return (
//     <div>
//       <h2>Add Grocery Item</h2>
//       <form onSubmit={handleAddItem}>
//         <div>
//           <label>Item Name</label>
//           <input
//             type="text"
//             value={itemName}
//             onChange={(e) => setItemName(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Item Price</label>
//           <input
//             type="number"
//             value={itemPrice}
//             onChange={(e) => setItemPrice(Number(e.target.value))}
//             required
//           />
//         </div>
//         <button type="submit">Add Item</button>
//       </form>
//     </div>
//   );
// };

// export default AddGroceryItem;
