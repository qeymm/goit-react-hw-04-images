import style from './Searchbar.module.css';
import { IoSearchCircleSharp } from 'react-icons/io5';

export const Searchbar = ({ onSubmit }) => {
  return (
    <header className={style.searchBar}>
      <form className={style.searchForm} onSubmit={onSubmit}>
        <button type="submit" className={style.searchFormButton}>
          <IoSearchCircleSharp size={40} color="#3ab0a2" />
          {}
          <span className={style.searchFormButtonLabel}>Search</span>
        </button>

        <input
          type="text"
          className={style.searchFormInput}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
        />
      </form>
    </header>
  );
};
