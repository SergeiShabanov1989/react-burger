import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import homeStyles from './home.module.css';
import { Main } from '../components/main/main';
import { getIngredientsFromServer } from '../components/utils/api';
import { getIngredients } from '../services/burger-ingredients/actions';
import { Preloader } from '../components/preloader/preloader';

export function HomePage() {
  const dispatch = useDispatch();
  const { isError, isLoading } = useSelector((store) => store.ingredients);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : isError ? (
        <div className={homeStyles.error}>
          <h1 className="text text_type_main-large mb-10">Произошла ошибка!</h1>
          <button
            className={`${homeStyles.red_button} text text_type_main-small`}
            onClick={getIngredientsFromServer}
          >
            Попробовать еще раз
          </button>
        </div>
      ) : (
        <Main />
      )}
    </>
  );
}
