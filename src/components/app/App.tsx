import appStyles from './App.module.css';
import { useEffect, useState } from 'react';
import { AppHeader } from '../app-header/app-header';
import { Main } from '../main/main';
import { getIngredientsFromServer } from '../utils/api';

function App() {
  const [state, setState] = useState({
    isLoading: false,
    isError: false,
    ingredients: [],
  });

  useEffect(() => {
    setState({
      ...state,
      isError: false,
      isLoading: true,
    });
    getIngredientsFromServer()
      .then((ingredients) => {
        setState({
          ...state,
          isLoading: false,
          isError: false,
          ingredients: ingredients.data,
        });
      })
      .catch(() => {
        setState({
          ...state,
          isLoading: false,
          isError: true,
        });
      });
    // делаем запрос к api при запуске приложения один раз, поэтому убрал проверку eslint
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AppHeader />
      {state.isLoading ? (
        <div className={appStyles.preloader}></div>
      ) : state.isError ? (
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
        <Main ingredients={state.ingredients} />
      )}
    </>
  );
}

export default App;
