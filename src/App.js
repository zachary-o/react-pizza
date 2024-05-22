import Categories from "./components/Categories"
import Header from "./components/Header"
import PizzaBlock from "./components/PizzaBlock"
import Sort from "./components/Sort"
import "./scss/app.scss"

import pizzaList from "./pizza.json"

function App() {
  return (
    <div class="wrapper">
      <Header />
      <div class="content">
        <div class="container">
          <div class="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 class="content__title">All Pizzas</h2>
          <div class="content__items">
            {pizzaList.map(pizza => (
              <PizzaBlock key={pizza.id} {...pizza} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
