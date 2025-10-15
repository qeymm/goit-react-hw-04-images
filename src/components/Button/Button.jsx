import style from './Button.module.css';

export const Button = ({ onClick }) => {
  return (
    <div className={style.buttonWrap}>
      <button className={style.button} onClick={onClick}>
        Load More
      </button>
    </div>
  );
};
