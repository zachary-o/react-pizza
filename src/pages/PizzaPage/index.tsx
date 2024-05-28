import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useGetPizzaByIdQuery } from "../../redux/services/pizzaApi"

type Pizza = {
  name: string
  imageUrl: string
  price: number | null
}

const PizzaPage = () => {
  const [pizza, setPizza] = useState<Pizza>({
    name: "",
    imageUrl: "",
    price: null,
  })
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, isLoading, error } = useGetPizzaByIdQuery(id as string)

  useEffect(() => {
    if (data && data.length > 0) {
      const { name, imageUrl, price } = data[0]
      setPizza({ name, imageUrl, price })
    }
  }, [data])

  if (error) {
    navigate("/")
  }

  return (
    <div className="container">
      {isLoading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2>Loading...</h2>
        </div>
      ) : (
        <>
          <img src={pizza?.imageUrl} alt="Pizza" />
          <h2>{pizza?.name}</h2>
          <h4>${pizza?.price}</h4>
          <button className="button button--black" onClick={() => navigate(-1)}>
            &larr; Go back
          </button>
        </>
      )}
    </div>
  )
}

export default PizzaPage
