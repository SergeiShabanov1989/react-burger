import './App.css';
import { useEffect, useState } from 'react';
import { AppHeader } from './components/app-header/app-header';
import { Main } from './components/main/main';
import { ModalOverlay } from './components/modal-overlay/modal-overlay';
import { Modal } from './components/modal/modal';

function App() {
  const [state, setState] = useState({
    isLoading: false,
    isError: false,
    isIngredients: [],
  });

  const URL = 'https://norma.nomoreparties.space/api/ingredients';

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

  console.log(state.isIngredients);

  return (
    <>
      <AppHeader />
      {state.isLoading ? (
        <div className="preloader"></div>
      ) : (
        <Main isIngredients={state.isIngredients} />
      )}
      <ModalOverlay>
        <Modal>
          <p>Произошла ошибка</p>
        </Modal>
      </ModalOverlay>
    </>
  );
}

export default App;
