export default function PackingList({ items, handleTogglePacked, handleDeleteItem, sortOption, setSortOption }) {
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