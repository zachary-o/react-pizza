import styles from "./NotFoundBlock.module.scss"

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Nothing found
      </h1>
      <p className={styles.description}>Page does not exist 😞</p>
    </div>
  )
}

export default NotFoundBlock
