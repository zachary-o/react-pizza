import { Link } from "react-router-dom"
import img from "../../assets/img/empty-cart.png"

const CartEmpty = () => {
  return (
    <div className="cart cart--empty">
      <h2>
        Your cart is empty <span>😕</span>
      </h2>
      <p>
        You haven't added any products yet
        <br />
        To order pizza, go to the home page.
      </p>
      <img src={img} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Go back</span>
      </Link>
    </div>
  )
}
export default CartEmpty
