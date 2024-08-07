import { useSelector } from '../../services/reducer';
import { useParams } from 'react-router-dom';
import ingredientDetailsStyles from './ingredient-details.module.css';
import { Preloader } from '../preloader/preloader';
import { TIngredient } from '../utils/types';

export const IngredientDetails = (): JSX.Element => {
  const { viewableIngredient } = useSelector(
    (state) => state.viewableIngredient
  );
  const { id = '' } = useParams();
  const { ingredients, isLoading } = useSelector((state) => state.ingredients);

  const getIngredientById = (id: string): TIngredient => {
    const foundIngredient = ingredients.find(
      (ingredient: TIngredient) => ingredient._id === id
    );
    return foundIngredient || ({} as TIngredient);
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
      <h4 data-testid="ingredient-name" className="text text_type_main-medium">{ingredient?.name || ''}</h4>
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
