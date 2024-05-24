import React from "react"

const Categories = ({ categoryIndex, setCategoryIndex }) => {
  const categories = ["All", "Meat", "Vegeterian", "BBQ", "Spicy", "Wrapped"]

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            className={categoryIndex === index ? "active" : ""}
            key={category}
            onClick={() => setCategoryIndex(index)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
