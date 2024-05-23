import React from "react"

import ContentLoader from "react-content-loader"

const Skeleton = () => {
  return (
    <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={493}
      viewBox="0 0 280 493"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="140" cy="140" r="110" />
      <rect x="5" y="285" rx="10" ry="10" width="270" height="32" />
      <rect x="0" y="337" rx="10" ry="10" width="280" height="88" />
      <rect x="0" y="461" rx="10" ry="10" width="94" height="26" />
      <rect x="137" y="447" rx="10" ry="10" width="140" height="44" />
    </ContentLoader>
  )
}

export default Skeleton
