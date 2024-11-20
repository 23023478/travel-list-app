import React, { useState } from "react";

// Initial packing items
const initialItems = [
  { id: 1, description: "Shirt", quantity: 5, packed: false },
  { id: 2, description: "Pants", quantity: 2, packed: false },
];

function Logo() {
  return <h1>My Travel List</h1>;
}

function Form({ handleAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Handle form submission and add new item
  function handleSubmit(e) {
    e.preventDefault();

    if (!description.trim()) return;

    const newItem = {
        id: Date.now(),
        description,
        quantity,
        packed: false,
      };

    handleAddItem(newItem);

    setDescription("");
    setQuantity(1);
    }
  

    return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>
      <label htmlFor="quantity">Quantity:</label>
      <select
        id="quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>

      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">ADD</button>
    </form>
  );
}

function Item({ item, handleTogglePacked, handleDeleteItem }) {
  return (
    <li>
      <span style={{ textDecoration: item.packed ? "line-through" : "none" }} >
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => handleTogglePacked(item.id)}
      />
      {item.description} ({item.quantity})
      </span>
      <button
        onClick={() => handleDeleteItem(item.id)}
        style={{
          marginLeft: "8px",
          background: "transparent",
          border: "none",
          color: "black",
          cursor: "pointer",
          fontSize: "40px",
        }}
        aria-label="Delete item"
      >
        ☠
      </button>
    </li>
  );
}


function PackingList({ items, handleTogglePacked, handleDeleteItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            handleTogglePacked={handleTogglePacked}
            handleDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Stats({ items }) {
  const totalItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const packedPercentage = totalItems
    ? Math.round((packedItems / totalItems) * 100)
    : 0;

  return (
    <footer className="stats">
      <em>
        You have {totalItems} items in the list. You already packed {packedItems}{" "}
        ({packedPercentage}%).
      </em>
    </footer>
  );
}

function App() {
  const [items, setItems] = useState(initialItems);

  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleTogglePacked = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const handleDeleteItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="app">
      <Logo />
      <Form handleAddItem={handleAddItem} />
      <PackingList
        items={items}
        handleTogglePacked={handleTogglePacked}
        handleDeleteItem={handleDeleteItem}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
