export default function Item({ item, handleTogglePacked, handleDeleteItem }) {
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