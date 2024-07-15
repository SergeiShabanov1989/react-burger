import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';

import mainStyles from './main.module.css';

export const Main = (): JSX.Element => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={mainStyles.main}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </DndProvider>
  );
};
