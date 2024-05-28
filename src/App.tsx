import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import Loader from "./components/Loader"
import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import "./scss/app.scss"

const Cart = lazy(() => import("./pages/Cart"))
const PizzaPage = lazy(() => import("./pages/PizzaPage"))

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<Loader />}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<Loader />}>
              <PizzaPage />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
