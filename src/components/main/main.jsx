import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import mainStyles from './main.module.css';

export const Main = () => {
  return (
    <div className={mainStyles.main}>
      <BurgerIngredients />
      <BurgerConstructor />
    </div>
  );
};
