import axios from "axios"
import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Cart from "./pages/Cart"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import "./scss/app.scss"

function App() {
  const [pizzaList, setPizzaList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchPizzas = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.get(
        "https://6646d17c51e227f23aafed62.mockapi.io/pizza"
      )
      setPizzaList(data)
    } catch (error) {
      console.log("error", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPizzas()
    window.scrollTo(0, 0)
  }, [])

  return (
    <div class="wrapper">
      <Header />
      <div class="content">
        <Routes>
          <Route path="/" element={<Home isLoading={isLoading} pizzaList={pizzaList} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
