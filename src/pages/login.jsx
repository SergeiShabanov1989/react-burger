import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import loginStyles from './login.module.css';
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { login } from '../services/user/actions';
import { getIsError, getIsLoading, setIsError } from '../services/user/reducer';
import { Preloader } from '../components/preloader/preloader';
import { useForm } from '../hooks/useform';

export function LoginPage() {
  const { values, handleChange, error } = useForm({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const isError = useSelector(getIsError);
  const isLoading = useSelector(getIsLoading);
  const [showPassword, setShowPassword] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (error.email !== '' || error.password !== '') {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [error]);

  const handleInput = (e) => {
    e.preventDefault();
    handleChange(e);
  };

  const handleIconClick = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    console.log(values);
    e.preventDefault();
    dispatch(login(values));
  };

  return isLoading ? (
    <Preloader />
  ) : (
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
          value={values.email}
          errorText={error.email}
          required
          onChange={handleInput}
          {...(error.email && { error: true })}
        />
        <Input
          {...(showPassword ? { icon: 'HideIcon' } : { icon: 'ShowIcon' })}
          extraClass="mb-6"
          {...(showPassword ? { type: 'text' } : { type: 'password' })}
          placeholder="Пароль"
          name="password"
          value={values.password}
          onChange={handleInput}
          onIconClick={handleIconClick}
          required
          minLength={6}
          errorText={error.password}
          {...(error.password && { error: true })}
        />
        {isError && (
          <p className="text text_type_main-default text_color_error mb-6">
            Некорректная почта или пароль
          </p>
        )}
        <Button disabled={isDisabled} htmlType="submit" extraClass="mb-20">
          Войти
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mb-4">
        Вы новый пользователь?
        <Link
          to="/register"
          className={`${loginStyles.link} text text_type_main-default ml-2`}
          onClick={() => dispatch(setIsError(false))}
        >
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль?
        <Link
          to="/forgot-password"
          className={`${loginStyles.link} text text_type_main-default ml-2`}
        >
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
}
