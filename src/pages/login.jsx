import loginStyles from './login.module.css';
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function LoginPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className={loginStyles.body}>
      <h1 className={`${loginStyles.title} text text_type_main-large mb-6`}>
        Вход
      </h1>
      <form className={`${loginStyles.form} mb-6`} onSubmit={handleSubmit}>
        <Input
          extraClass="mb-6"
          placeholder="e-mail"
          type="email"
          name="email"
        />
        <Input
          icon="ShowIcon"
          extraClass="mb-6"
          type="password"
          placeholder="Пароль"
          name="password"
        />

        <Button extraClass="mb-20">Войти</Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mb-4">
        Вы новый пользователь? <a href="/register">Зарегистрироваться</a>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль? <a href="/forgot-password">Восстановить пароль</a>
      </p>
    </div>
  );
}
