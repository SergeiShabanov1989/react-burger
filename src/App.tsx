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
    setState({
      ...state,
      isError: false,
      isLoading: true,
    });
    fetch(URL)
      .then((response) => response.json())
      .then((ingredients) => {
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
      })
      .catch((e) => {
        setState({
          ...state,
          isLoading: false,
          isError: true,
        });
      });
  }, []);

  return (
    <>
      <AppHeader />
      {state.isLoading ? (
        <div className="preloader"></div>
      ) : (
        <Main isIngredients={state.isIngredients} />
      )}
    </>
  );
}

export default App;
