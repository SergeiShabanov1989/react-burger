import { useState } from 'react';
import forgotStyles from './forgot-password.module.css';
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../components/utils/validate';
import { forgotPassword } from '../components/utils/api';

export function ForgotPage() {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    email: '',
  });
  const [error, setError] = useState({
    email: null,
  });

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
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPassword(formValue)
      .then((res) => {
        if (res.success) {
          return navigate('/reset-password');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={forgotStyles.body}>
      <h1 className={`${forgotStyles.title} text text_type_main-large mb-6`}>
        Восстановление пароля
      </h1>
      <form className={`${forgotStyles.form} mb-6`} onSubmit={handleSubmit}>
        <Input
          extraClass="mb-6"
          placeholder="Укажите e-mail"
          type="email"
          name="email"
          value={formValue.email}
          errorText={error.email}
          required
          onChange={handleInput}
          {...(error.email && { error: true })}
        />

        <Button htmlType="submit" extraClass="mb-20">
          Восстановить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mb-4">
        Вспомнили пароль?
        <Link
          to="/login"
          className={`${forgotStyles.link} text text_type_main-default ml-2`}
        >
          Войти
        </Link>
      </p>
    </div>
  );
}
