import React from "react"
import styles from "./Loader.module.scss"
import loaderGif from "../../assets/img/pizza-loader.gif"

const Loader = () => {
  return (
    <div className={styles.loaderOverlay}>
      <img className={styles.loaderGif} src={loaderGif} alt="Loading..." />
    </div>
  )
}

export default Loader
