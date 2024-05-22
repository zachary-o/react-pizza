import React, { useState } from "react"

const categories = ["All", "Meat", "Vegeterian", "BBQ", "Spicy", "Wrapped"]

const Categories = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0)

  const handleChooseCategory = (index) => {
    setActiveCategoryIndex(index)
  }

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            className={activeCategoryIndex === index ? "active" : ""}
            key={category}
            onClick={() => handleChooseCategory(index)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
