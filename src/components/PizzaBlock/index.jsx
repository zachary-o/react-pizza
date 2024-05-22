import React, { useState } from "react"

const pizzaTypes = ["thin", "traditional"]

const PizzaBlock = ({
  imageUrl,
  name,
  types,
  sizes,
  price,
  category,
  rating,
}) => {
  const [activeSizeIndex, setActiveSizeIndex] = useState(0)
  const [activeTypeIndex, setActiveTypeIndex] = useState(0)

  return (
    <div class="pizza-block">
      <img class="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 class="pizza-block__title">{name}</h4>
      <div class="pizza-block__selector">
        <ul>
          {types.map((type) => (
            <li
              className={activeTypeIndex === type ? "active" : ""}
              key={type}
              onClick={() => setActiveTypeIndex(type)}
            >
              {pizzaTypes[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li
              className={activeSizeIndex === index ? "active" : ""}
              key={size}
              onClick={() => setActiveSizeIndex(index)}
            >
              {size} cm.
            </li>
          ))}
        </ul>
      </div>
      <div class="pizza-block__bottom">
        <div class="pizza-block__price">from ${price}</div>
        <div class="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Add</span>
          <i>0</i>
        </div>
      </div>
    </div>
  )
}

export default PizzaBlock
