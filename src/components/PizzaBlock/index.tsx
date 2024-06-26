import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PizzaBlockProps } from "../../pages/Home";
import { addProduct } from "../../redux/slices/cartSlice";
import { RootState } from "../../redux/store";

const pizzaTypes: string[] = ["thin", "traditional"];

const PizzaBlock = ({
  id,
  imageUrl,
  name,
  types,
  sizes,
  price,
}: PizzaBlockProps) => {
  const [activeSizeIndex, setActiveSizeIndex] = useState(0);
  const [activeTypeIndex, setActiveTypeIndex] = useState(0);
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) =>
    state.cart.cartItems.find((cartItem) => cartItem.id === id)
  );
  const addedCount = cartItem ? cartItem.count : 0;
  const handleAddToCart = () => {
    const payload = {
      id,
      imageUrl,
      name,
      price,
      type: pizzaTypes[activeTypeIndex],
      size: sizes[activeSizeIndex],
      count: addedCount,
    };
    dispatch(addProduct(payload));
  };

  return (
    <div className="pizza-block">
      <Link to={`/pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{name}</h4>
      </Link>
      <div className="pizza-block__selector">
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
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">from ${price}</div>
        <div
          className="button button--outline button--add"
          onClick={handleAddToCart}
        >
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
          {addedCount > 0 && <i>{addedCount}</i>}
        </div>
      </div>
    </div>
  );
};

export default memo(PizzaBlock);
