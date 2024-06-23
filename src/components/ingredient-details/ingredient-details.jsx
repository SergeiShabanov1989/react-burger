import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ingredientDetailsStyles from './ingredient-details.module.css';
import { Preloader } from '../preloader/preloader';

export const IngredientDetails = () => {
  const { viewableIngredient } = useSelector(
    (state) => state.viewableIngredient
  );
  const { id } = useParams();
  const { ingredients, isLoading } = useSelector((state) => state.ingredients);

  const getIngredientById = (id) => {
    return ingredients.find((ingredient) => ingredient._id === id);
  };

  const ingredient = viewableIngredient
    ? viewableIngredient
    : getIngredientById(id);

  return isLoading ? (
    <Preloader />
  ) : (
    <div
      className={`${ingredientDetailsStyles.ingredient_wrapper} mt-15 mb-15`}
    >
      <h3 className="text text_type_main-large">Детали ингредиента</h3>
      <img src={ingredient?.image_large || ''} alt={ingredient?.name || ''} />
      <h4 className="text text_type_main-medium">{ingredient?.name || ''}</h4>
      <ul className={ingredientDetailsStyles.calories_wrapper}>
        <li className={ingredientDetailsStyles.info}>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал:
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient?.calories || ''}
          </p>
        </li>
        <li className={ingredientDetailsStyles.info}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г:
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient?.proteins || ''}
          </p>
        </li>
        <li className={ingredientDetailsStyles.info}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г:
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient?.fat || ''}
          </p>
        </li>
        <li className={ingredientDetailsStyles.info}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г:
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient?.carbohydrates || ''}
          </p>
        </li>
      </ul>
    </div>
  );
};
