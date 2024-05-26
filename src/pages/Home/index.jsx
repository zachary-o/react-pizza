import axios from "axios";
import qs from "qs";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Categories from "../../components/Categories";
import Pagination from "../../components/Pagination";
import PizzaBlock from "../../components/PizzaBlock";
import Skeleton from "../../components/PizzaBlock/Skeleton";
import Sort, { sortOptions } from "../../components/Sort";
import { setFilters } from "../../redux/slices/filterSlice";

const Home = () => {
  const [pizzaList, setPizzaList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { categoryIndex, sortIndex, currentPage, searchValue } = useSelector(
    (state) => state.filter
  );
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sortIndex = sortOptions.find(
        (sortOption) => sortOption.sortBy === params.sortBy
      );

      dispatch(
        setFilters({
          ...params,
          sortIndex,
        })
      );
      isSearch.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortBy: sortIndex.sortBy,
        categoryIndex,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryIndex, sortIndex, currentPage, navigate]);

  const fetchPizzas = async () => {
    const category = categoryIndex > 0 ? `category=${categoryIndex}` : "";
    const sortBy = sortIndex.sortBy.replace("-", "");
    const order = sortIndex.sortBy.includes("-") ? "asc" : "desc";
    const search = searchValue ? `&search=${searchValue}` : "";
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://6646d17c51e227f23aafed62.mockapi.io/pizza?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      );
      setPizzaList(data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryIndex, sortIndex, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">All Pizzas</h2>
      <div className="content__items">
        {isLoading
          ? [...Array(4)].map((_, index) => <Skeleton key={index} />)
          : pizzaList.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
      <Pagination />
    </div>
  );
};

export default Home;
