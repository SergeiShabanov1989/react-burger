import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from '../services/reducer';
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import registerStyles from './register.module.css';
import { register } from '../services/user/actions';
import { getIsError, setIsError } from '../services/user/reducer';
import { useForm } from '../hooks/useform';

export function RegisterPage(): JSX.Element {
  const dispatch = useDispatch();
  const isError = useSelector(getIsError);
  const { values, handleChange, error } = useForm({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (error.email !== '' || error.password !== '' || error.name !== '') {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [error]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    handleChange(e);
  };

  const handleIconClick = (): void => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (values.name && values.email && values.password) {
      dispatch(
        register({
          name: values.name,
          email: values.email,
          password: values.password,
        })
      );
    }
  };

  return (
    <div className={registerStyles.body}>
      <h1 className={`${registerStyles.title} text text_type_main-large mb-6`}>
        Регистрация
      </h1>
      <form className={`${registerStyles.form} mb-6`} onSubmit={handleSubmit}>
        <Input
          onPointerEnterCapture
          onPointerLeaveCapture
          minLength={4}
          extraClass="mb-6"
          placeholder="Имя"
          type="text"
          name="name"
          value={values?.name || ''}
          required
          onChange={handleInput}
          {...(error.name && { error: true })}
          errorText={error?.name || ''}
        />
        <Input
          onPointerEnterCapture
          onPointerLeaveCapture
          extraClass="mb-6"
          placeholder="e-mail"
          type="email"
          name="email"
          value={values?.email || ''}
          errorText={error?.email || ''}
          required
          onChange={handleInput}
          {...(error.email && { error: true })}
        />
        <Input
          onPointerEnterCapture
          onPointerLeaveCapture
          {...(showPassword ? { icon: 'HideIcon' } : { icon: 'ShowIcon' })}
          extraClass="mb-6"
          {...(showPassword ? { type: 'text' } : { type: 'password' })}
          placeholder="Пароль"
          name="password"
          value={values?.password || ''}
          onChange={handleInput}
          onIconClick={handleIconClick}
          required
          minLength={6}
          errorText={error?.password || ''}
          {...(error.password && { error: true })}
        />
        {isError && (
          <p className="text text_type_main-default text_color_error mb-6">
            Такой пользователь уже существует
          </p>
        )}
        <Button disabled={isDisabled} htmlType="submit" extraClass="mb-20">
          Зарегистрироваться
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mb-4">
        Уже зарегистрированы?
        <Link
          to="/login"
          className={`${registerStyles.link} text text_type_main-default ml-2`}
          onClick={() => dispatch(setIsError(false))}
        >
          Войти
        </Link>
      </p>
    </div>
  );
}
