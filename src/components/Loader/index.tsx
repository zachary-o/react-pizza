import Lottie from "lottie-react"
import loaderGif from "../../assets/img/pizza-loader.json"
import styles from "./Loader.module.scss"

const Loader = () => {
  return (
    <div className={styles.loaderOverlay}>
      <Lottie className={styles.loaderGif} animationData={loaderGif} />
    </div>
  )
}

export default Loader
