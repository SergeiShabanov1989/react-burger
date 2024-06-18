import { useEffect, useState } from 'react';
import resetStyles from './reset-password.module.css';
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { resetPassword } from '../components/utils/api';

export function ResetPage() {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    password: null,
    token: null,
  });
  const [error, setError] = useState({
    password: null,
    token: null,
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    validateInput({ target: { name: 'password' } });
    validateInput({ target: { name: 'token' } });
  }, []);

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
        case 'password':
          if (!value || value.length < 6) {
            stateObj[name] = 'Минимальная длина пароля 6 символов';
          }
          break;

        case 'token':
          if (!value) {
            stateObj[name] = 'Обязательное поле';
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

    resetPassword(formValue)
      .then((res) => {
        if (res.success) {
          return navigate('/login');
        }
      })
      .catch((err) => {
        console.log(err);
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
          value={formValue.password}
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
          value={formValue.token}
          errorText={error.token}
          required
          onChange={handleInput}
          {...(error.token && { error: true })}
        />

        <Button
          {...((error.password || error.token) && { disabled: true })}
          htmlType="submit"
          extraClass="mb-20"
        >
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
