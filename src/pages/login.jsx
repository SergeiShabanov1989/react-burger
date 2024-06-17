import { useState, useEffect } from 'react';
import loginStyles from './login.module.css';
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { validateEmail } from '../components/utils/validate';

export function LoginPage() {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState({
    email: null,
    password: null,
  });
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
    setFormValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    validateInput(e);
  };

  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: '' };

      switch (name) {
        case 'email':
          if (!value || !validateEmail(value)) {
            stateObj[name] = 'Некорректная почта';
          } else {
            stateObj[name] = '';
          }
          break;

        case 'password':
          if (!value || value.length < 6) {
            stateObj[name] = 'Минимальная длина пароля 6 символов';
          } else {
            stateObj[name] = '';
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  const handleIconClick = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('хаю хай');
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
          value={formValue.email}
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
          value={formValue.password}
          onChange={handleInput}
          onIconClick={handleIconClick}
          required
          minLength={6}
          errorText={error.password}
          {...(error.password && { error: true })}
        />

        <Button disabled={isDisabled} htmlType="submit" extraClass="mb-20">
          Войти
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mb-4">
        Вы новый пользователь?{' '}
        <Link
          to="/register"
          className={`${loginStyles.link} text text_type_main-default`}
        >
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль?{' '}
        <Link
          to="/forgot-password"
          className={`${loginStyles.link} text text_type_main-default`}
        >
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
}
