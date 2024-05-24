import './App.css';
import { useEffect, useState } from 'react';
import { AppHeader } from './components/app-header/app-header';
import { Main } from './components/main/main';

const URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [state, setState] = useState({
    isLoading: false,
    isError: false,
    isIngredients: [],
  });

  useEffect(() => {
    getIngredientsFromServer();
  }, []);

  const getIngredientsFromServer = async () => {
    try {
      setState({
        ...state,
        isError: false,
        isLoading: true,
      });
      const res = await fetch(URL);
      const ingredients = await res.json();
      if (ingredients.success) {
        setState({
          ...state,
          isLoading: false,
          isError: false,
          isIngredients: ingredients.data,
        });
      } else {
        setState({
          ...state,
          isLoading: false,
          isError: true,
        });
      }
    } catch (err) {
      setState({
        ...state,
        isLoading: false,
        isError: true,
      });
    }
  };

  return (
    <>
      <AppHeader />
      {state.isLoading ? (
        <div className="preloader"></div>
      ) : state.isError ? (
        <div className="error">
          <h1 className="text text_type_main-large mb-10">Произошла ошибка!</h1>
          <button
            className="red-button text text_type_main-small"
            onClick={getIngredientsFromServer}
          >
            Попробовать еще раз
          </button>
        </div>
      ) : (
        <Main isIngredients={state.isIngredients} />
      )}
    </>
  );
}

export default App;
