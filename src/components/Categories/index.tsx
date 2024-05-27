import { useDispatch, useSelector } from "react-redux";
import { setCategoryIndex } from "../../redux/slices/filterSlice";
import { RootState } from "../../redux/store";

const Categories = () => {
  const categories: string[] = [
    "All",
    "Meat",
    "Vegeterian",
    "BBQ",
    "Spicy",
    "Wrapped",
  ];
  const { categoryIndex } = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            className={categoryIndex === index ? "active" : ""}
            key={category}
            onClick={() => dispatch(setCategoryIndex(index))}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
