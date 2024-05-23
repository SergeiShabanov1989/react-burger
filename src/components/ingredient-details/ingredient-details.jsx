import ingredientDetailsStyles from './ingredient-details.module.css';

export const IngredientDetails = (isChoseIngredient) => {
  const { name, image_large, calories, proteins, fat, carbohydrates } =
    isChoseIngredient.ingredient;
  return (
    <div
      className={`${ingredientDetailsStyles.ingredient_wrapper} mt-15 mb-15`}
    >
      <h3 className="text text_type_main-large">Детали ингредиента</h3>
      <img src={image_large} alt={ingredientDetailsStyles.name} />
      <h4 className="text text_type_main-medium">{name}</h4>
      <ul className={ingredientDetailsStyles.calories_wrapper}>
        <li>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал:
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {calories}
          </p>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г:
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {proteins}
          </p>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г:
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {fat}
          </p>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г:
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
};
