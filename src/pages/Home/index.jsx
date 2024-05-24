import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { SearchContext } from "../../App"
import Categories from "../../components/Categories"
import Pagination from "../../components/Pagination"
import PizzaBlock from "../../components/PizzaBlock"
import Skeleton from "../../components/PizzaBlock/Skeleton"
import Sort from "../../components/Sort"

const Home = () => {
  const { searchValue } = useContext(SearchContext)
  const [pizzaList, setPizzaList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [categoryIndex, setCategoryIndex] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortIndex, setSortIndex] = useState({
    name: "popularity ⬇️",
    sortBy: "rating",
  })

  useEffect(() => {
    const category = categoryIndex > 0 ? `category=${categoryIndex}` : ""
    const sortBy = sortIndex.sortBy.replace("-", "")
    const order = sortIndex.sortBy.includes("-") ? "asc" : "desc"
    const search = searchValue ? `&search=${searchValue}` : ""

    const fetchPizzas = async () => {
      setIsLoading(true)
      try {
        const { data } = await axios.get(
          `https://6646d17c51e227f23aafed62.mockapi.io/pizza?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        )
        setPizzaList(data)
      } catch (error) {
        console.log("error", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPizzas()
    window.scrollTo(0, 0)
  }, [categoryIndex, sortIndex, searchValue, currentPage])

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryIndex={categoryIndex}
          setCategoryIndex={setCategoryIndex}
        />
        <Sort sortIndex={sortIndex} setSortIndex={setSortIndex} />
      </div>
      <h2 className="content__title">All Pizzas</h2>
      <div className="content__items">
        {isLoading
          ? [...Array(4)].map((_, index) => <Skeleton key={index} />)
          : pizzaList.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
      <Pagination setCurrentPage={setCurrentPage} />
    </div>
  )
}

export default Home
