import style from './Loader.module.css';
import { PacmanLoader } from 'react-spinners';

export const Loader = () => {
  return (
    <div className={style.loader}>
      <PacmanLoader
        color="#58d7a1"
        cssOverride={{}}
        loading
        margin={2}
        size={25}
        speedMultiplier={1}
      />
    </div>
  );
};
