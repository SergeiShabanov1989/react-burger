import { useState, useEffect, ChangeEvent } from 'react';
import forgotStyles from './forgot-password.module.css';
import { useDispatch } from 'react-redux';
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { forgotPassword } from '../components/utils/api';
import { setIsEmailChecked } from '../services/user/reducer';
import { useForm } from '../hooks/useform';

export function ForgotPage(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { values, handleChange, error } = useForm({
    email: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (error.email !== '') {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [error]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    handleChange(e);
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (values.email) {
      forgotPassword({ email: values.email })
        .then((res) => {
          if (res.success) {
            return dispatch(setIsEmailChecked(true));
          }
        })
        .then(() => {
          navigate('/reset-password');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className={forgotStyles.body}>
      <h1 className={`${forgotStyles.title} text text_type_main-large mb-6`}>
        Восстановление пароля
      </h1>
      <form className={`${forgotStyles.form} mb-6`} onSubmit={handleSubmit}>
        <Input
          onPointerEnterCapture
          onPointerLeaveCapture
          extraClass="mb-6"
          placeholder="Укажите e-mail"
          type="email"
          name="email"
          value={values?.email || ''}
          errorText={error?.email || ''}
          required
          onChange={handleInput}
          {...(error.email && { error: true })}
        />

        <Button disabled={isDisabled} htmlType="submit" extraClass="mb-20">
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
