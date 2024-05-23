import PropTypes from 'prop-types';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import mainStyles from './main.module.css';

export const Main = ({ isIngredients }) => {
  return (
    <div className={mainStyles.main}>
      <BurgerIngredients isIngredients={isIngredients} />
      <BurgerConstructor isIngredients={isIngredients} />
    </div>
  );
};



Main.propTypes  = {
  isIngredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      price: PropTypes.number,
      image: PropTypes.string,
      image_mobile: PropTypes.string,
      image_large: PropTypes.string,
    })
  ),
}