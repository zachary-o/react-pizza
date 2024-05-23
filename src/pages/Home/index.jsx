import React from "react"
import Categories from "../../components/Categories"
import PizzaBlock from "../../components/PizzaBlock"
import Skeleton from "../../components/PizzaBlock/Skeleton"
import Sort from "../../components/Sort"

const Home = ({ isLoading, pizzaList }) => {
  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">All Pizzas</h2>
      <div className="content__items">
        {isLoading
          ? [...Array(9)].map((_, index) => <Skeleton key={index} />)
          : pizzaList.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </div>
  )
}

export default Home
