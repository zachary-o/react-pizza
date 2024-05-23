import axios from "axios";
import React, { useEffect, useState } from "react";
import Categories from "../../components/Categories";
import PizzaBlock from "../../components/PizzaBlock";
import Skeleton from "../../components/PizzaBlock/Skeleton";
import Sort from "../../components/Sort";

const Home = () => {
  const [pizzaList, setPizzaList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [сategoryIndex, setCategoryIndex] = useState(0);
  const [sortIndex, setSortIndex] = useState({
    name: "popularity ⬇️",
    sortBy: "rating",
  });

  useEffect(() => {
    const category = сategoryIndex > 0 ? `category=${сategoryIndex}` : "";
    const sortBy = sortIndex.sortBy.replace("-", "");
    const order = sortIndex.sortBy.includes("-") ? "asc" : "desc";

    const fetchPizzas = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `https://6646d17c51e227f23aafed62.mockapi.io/pizza?${category}&sortBy=${sortBy}&order=${order}`
        );
        setPizzaList(data);
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPizzas();
    window.scrollTo(0, 0);
  }, [сategoryIndex, sortIndex]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          сategoryIndex={сategoryIndex}
          setCategoryIndex={setCategoryIndex}
        />
        <Sort sortIndex={sortIndex} setSortIndex={setSortIndex} />
      </div>
      <h2 className="content__title">All Pizzas</h2>
      <div className="content__items">
        {isLoading
          ? [...Array(9)].map((_, index) => <Skeleton key={index} />)
          : pizzaList.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </div>
  );
};

export default Home;
