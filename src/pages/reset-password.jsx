import { useEffect, useState } from 'react';
import resetStyles from './reset-password.module.css';
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { resetPassword } from '../components/utils/api';
import { useForm } from '../hooks/useform';

export function ResetPage() {
  const navigate = useNavigate();
  const { values, handleChange, error, setError } = useForm({
    password: '',
    token: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (error.password !== '' || error.token !== '') {
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
    e.preventDefault();

    resetPassword(values)
      .then((res) => {
        if (res.success) {
          return navigate('/login');
        }
      })
      .catch((err) => {
        setError({ token: 'некорректный токен' });
      });
  };

  return (
    <div className={resetStyles.body}>
      <h1 className={`${resetStyles.title} text text_type_main-large mb-6`}>
        Восстановление пароля
      </h1>
      <form className={`${resetStyles.form} mb-6`} onSubmit={handleSubmit}>
        <Input
          {...(showPassword ? { icon: 'HideIcon' } : { icon: 'ShowIcon' })}
          extraClass="mb-6"
          {...(showPassword ? { type: 'text' } : { type: 'password' })}
          placeholder="Введите новый пароль"
          name="password"
          value={values.password}
          onChange={handleInput}
          onIconClick={handleIconClick}
          required
          minLength={6}
          errorText={error.password}
          {...(error.password && { error: true })}
        />
        <Input
          extraClass="mb-6"
          placeholder="Введите код из письма"
          type="text"
          name="token"
          value={values.token}
          errorText={error.token}
          required
          onChange={handleInput}
          {...(error.token && { error: true })}
        />

        <Button disabled={isDisabled} htmlType="submit" extraClass="mb-20">
          Сохранить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mb-4">
        Вспомнили пароль?
        <Link
          to="/login"
          className={`${resetStyles.link} text text_type_main-default ml-2`}
        >
          Войти
        </Link>
      </p>
    </div>
  );
}
