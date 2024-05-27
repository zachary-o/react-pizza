import qs from "qs"
import React, { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Categories from "../../components/Categories"
import Pagination from "../../components/Pagination"
import PizzaBlock from "../../components/PizzaBlock"
import Skeleton from "../../components/PizzaBlock/Skeleton"
import Sort, { sortOptions } from "../../components/Sort"
import { useGetPizzasQuery } from "../../redux/services/pizzaApi"
import { setFilters } from "../../redux/slices/filterSlice"

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isMounted = useRef(false)
  const isSearch = useRef(false)
  const { categoryIndex, sortIndex, currentPage, searchValue } = useSelector(
    (state) => state.filter
  )

  const category = categoryIndex > 0 ? `category=${categoryIndex}` : ""
  const sortBy = sortIndex.sortBy.replace("-", "")
  const order = sortIndex.sortBy.includes("-") ? "asc" : "desc"
  const search = searchValue ? `&search=${searchValue}` : ""
  const { data, error, isLoading } = useGetPizzasQuery({
    category,
    sortBy,
    order,
    search,
    currentPage,
  })

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))

      const sortIndex = sortOptions.find(
        (sortOption) => sortOption.sortBy === params.sortBy
      )

      dispatch(
        setFilters({
          ...params,
          sortIndex,
        })
      )
      isSearch.current = true
    }
  }, [dispatch])

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortBy: sortIndex.sortBy,
        categoryIndex,
        currentPage,
      })

      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoryIndex, sortIndex, currentPage, navigate])

  useEffect(() => {
    window.scrollTo(0, 0)
    isSearch.current = false
  }, [categoryIndex, sortIndex, searchValue, currentPage])

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      {error ? null : <h2 className="content__title">All Pizzas</h2>}
      {error ? (
        <div className="content__error-info">
          <h2>
            An Error occured <icon>😕</icon>
          </h2>
          <p>
            Failed to load pizzas.
            <br />
            Reload the page or try again later.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {isLoading
            ? [...Array(4)].map((_, index) => <Skeleton key={index} />)
            : data.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
        </div>
      )}

      <Pagination />
    </div>
  )
}

export default Home
