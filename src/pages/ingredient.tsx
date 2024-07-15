import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Preloader } from '../components/preloader/preloader';
import { TIngredient } from '../components/utils/types';

import ingredientStyles from './ingredient.module.css';

export const IngredientPage = () => {
  const { id } = useParams();
  //@ts-ignore
  const { ingredients, isLoading } = useSelector((state) => state.ingredients);
  const getIngredientById = (id: string) => {
    return ingredients.find((ingredient: TIngredient): boolean => ingredient._id === id);
  };

  const ingredient = id ? getIngredientById(id) : undefined;

  return isLoading ? (
    <Preloader />
  ) : (
    <div className={`${ingredientStyles.ingredient_wrapper} mt-15 mb-15`}>
      <div className={ingredientStyles.ingredient}>
        <h3 className="text text_type_main-large">Детали ингредиента</h3>
        <img src={ingredient?.image_large} alt={ingredient?.name || ''} />
        <h4 className="text text_type_main-medium">{ingredient?.name || ''}</h4>
        <ul className={ingredientStyles.calories_wrapper}>
          <li className={ingredientStyles.info}>
            <p className="text text_type_main-default text_color_inactive">
              Калории,ккал:
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {ingredient?.calories || ''}
            </p>
          </li>
          <li className={ingredientStyles.info}>
            <p className="text text_type_main-default text_color_inactive">
              Белки, г:
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {ingredient?.proteins || ''}
            </p>
          </li>
          <li className={ingredientStyles.info}>
            <p className="text text_type_main-default text_color_inactive">
              Жиры, г:
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {ingredient?.fat || ''}
            </p>
          </li>
          <li className={ingredientStyles.info}>
            <p className="text text_type_main-default text_color_inactive">
              Углеводы, г:
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {ingredient?.carbohydrates || ''}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};
