import React, { useState } from "react";
import Logo from "./logo";
import Form from "./Form";
// import PackingList from "./PackingList";
import Stats from "./Stats";

// Initial packing items
const initialItems = [
  { id: 1, description: "Shirt", quantity: 5, packed: false },
  { id: 2, description: "Pants", quantity: 2, packed: false },
];

function Item({ item, handleTogglePacked, handleDeleteItem }) {
  return (
    <li>
      <span style={{ textDecoration: item.packed ? "line-through" : "none" }}>
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
          fontSize: "20px",
        }}
        aria-label="Delete item"
      >
        ☠
      </button>
    </li>
  );
}

function PackingList({ items, handleTogglePacked, handleDeleteItem, sortOption, setSortOption }) {
  const sortedItems = [...items].sort((a, b) => {
    if (sortOption === "input") return a.id - b.id;
    if (sortOption === "description") return a.description.localeCompare(b.description);
    if (sortOption === "packed") return a.packed - b.packed;
    return 0;
  });

  return (
    <div className="list">
      <div className="sort-options">
        <label htmlFor="sort">Sort by:</label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="input">Input Order</option>
          <option value="description">Description</option>
          <option value="packed">Packed Status</option>
        </select>
      </div>
      <ul>
        {sortedItems.map((item) => (
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

function App() {
  const [items, setItems] = useState(initialItems);
  const [sortOption, setSortOption] = useState("input");

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

  const handleClearAll = () => {
    setItems([]);
  };

  return (
    <div className="app">
      <Logo />
      <Form handleAddItem={handleAddItem} />
      <PackingList
        items={items}
        handleTogglePacked={handleTogglePacked}
        handleDeleteItem={handleDeleteItem}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      <button onClick={handleClearAll} style={{ margin: "10px", padding: "10px" }}>
        Clear All
      </button>
      <Stats items={items} />
    </div>
  );
}

export default App;
