import PropTypes from 'prop-types';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { ingredientType } from '../utils/prop-types';

import mainStyles from './main.module.css';

export const Main = ({ ingredients }) => {
  return (
    <div className={mainStyles.main}>
      <BurgerIngredients ingredients={ingredients} />
      <BurgerConstructor ingredients={ingredients} />
    </div>
  );
};

Main.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
};
