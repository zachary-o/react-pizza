import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useGetPizzaByIdQuery } from "../../redux/services/pizzaApi"

const PizzaPage = () => {
  const [pizza, setPizza] = useState({
    name: "",
    imageUrl: "",
    price: "",
  })
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, isLoading, error } = useGetPizzaByIdQuery(id)

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
        <h2>Loading...</h2>
      ) : (
        <>
          <button onClick={() => navigate(-1)}>&larr; Go back</button>
          <img src={pizza?.imageUrl} alt="Pizza" />
          <h2>{pizza?.name}</h2>
          <h4>${pizza?.price}</h4>
        </>
      )}
    </div>
  )
}

export default PizzaPage
