import debounce from "lodash.debounce"
import { ChangeEvent, useCallback, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { setSearchValue } from "../../redux/slices/filterSlice"
import styles from "./Search.module.scss"

const Search = () => {
  const [inputValue, setInputValue] = useState("")
  const dispatch = useDispatch()
  const inputRef = useRef<HTMLInputElement>(null)

  const debouncedSearch = useCallback(
    debounce((searchQuery) => {
      dispatch(setSearchValue(searchQuery))
    }, 1000),
    [dispatch]
  )

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
    debouncedSearch(event.target.value)
  }

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        height="512px"
        id="Layer_1"
        enableBackground="new 0 0 512 512"
        version="1.1"
        viewBox="0 0 512 512"
        width="512px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M344.5,298c15-23.6,23.8-51.6,23.8-81.7c0-84.1-68.1-152.3-152.1-152.3C132.1,64,64,132.2,64,216.3  c0,84.1,68.1,152.3,152.1,152.3c30.5,0,58.9-9,82.7-24.4l6.9-4.8L414.3,448l33.7-34.3L339.5,305.1L344.5,298z M301.4,131.2  c22.7,22.7,35.2,52.9,35.2,85c0,32.1-12.5,62.3-35.2,85c-22.7,22.7-52.9,35.2-85,35.2c-32.1,0-62.3-12.5-85-35.2  c-22.7-22.7-35.2-52.9-35.2-85c0-32.1,12.5-62.3,35.2-85c22.7-22.7,52.9-35.2,85-35.2C248.5,96,278.7,108.5,301.4,131.2z" />
      </svg>
      <input
        className={styles.input}
        placeholder="Search..."
        ref={inputRef}
        value={inputValue}
        onChange={onChangeInput}
      />
      {inputValue && (
        <svg
          className={styles.clearIcon}
          onClick={() => {
            setInputValue("")
            dispatch(setSearchValue(""))
            inputRef.current?.focus()
          }}
          height="48"
          viewBox="0 0 48 48"
          width="48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z" />
          <path d="M0 0h48v48H0z" fill="none" />
        </svg>
      )}
    </div>
  )
}

export default Search
