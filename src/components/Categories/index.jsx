import React from "react";

const Categories = ({ сategoryIndex, setCategoryIndex }) => {
  const categories = ["All", "Meat", "Vegeterian", "BBQ", "Spicy", "Wrapped"];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            className={сategoryIndex === index ? "active" : ""}
            key={category}
            onClick={() => setCategoryIndex(index)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
