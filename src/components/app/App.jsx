import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import appStyles from './App.module.css';
import { AppHeader } from '../app-header/app-header';
import { Main } from '../main/main';
import { getIngredientsFromServer } from '../utils/api';
import { getIngredients } from '../../services/burger-ingredients/actions';

function App() {
  const dispatch = useDispatch();
  const { isError, isLoading } = useSelector((store) => store.ingredients);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      {isLoading ? (
        <div className={appStyles.preloader}></div>
      ) : isError ? (
        <div className={appStyles.error}>
          <h1 className="text text_type_main-large mb-10">Произошла ошибка!</h1>
          <button
            className={`${appStyles.red_button} text text_type_main-small`}
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

export default App;
