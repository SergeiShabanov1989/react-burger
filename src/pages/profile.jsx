import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import profileStyles from './profile.module.css';
import { updateUserProfile } from '../services/user/actions';
import { getIsLoading } from '../services/user/reducer';
import { Preloader } from '../components/preloader/preloader';
import { useForm } from '../hooks/useform';

export function ProfilePage() {
  const { user } = useSelector((state) => state.user);
  const isLoading = useSelector(getIsLoading);
  const dispatch = useDispatch();
  const { values, handleChange, error, setError, setValues } = useForm({
    name: '',
    email: '',
    password: '',
  });
  const [isInputDisabled, setInputDisabled] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (user) {
      setValues({
        name: user.name,
        email: user.email,
        password: '',
      });
    }
  }, [user, setValues]);

  useEffect(() => {
    if (user.email === values.email && user.name === values.name) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [values, user]);

  const handleInput = (e) => {
    e.preventDefault();
    handleChange(e);
  };

  const handleIconClick = () => {
    setInputDisabled(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(values));

    setInputDisabled(true);
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <div>
      <form className={`${profileStyles.form} mb-6`} onSubmit={handleSubmit}>
        <Input
          minLength={4}
          extraClass="mb-6"
          placeholder="Имя"
          type="text"
          {...(isInputDisabled && { icon: 'EditIcon' })}
          name="name"
          value={values.name || user?.name}
          onIconClick={handleIconClick}
          onChange={handleInput}
          {...(error.name && { error: true })}
          errorText={error.name}
          {...(isInputDisabled && { disabled: true })}
        />
        <Input
          extraClass="mb-6"
          {...(isInputDisabled && { icon: 'EditIcon' })}
          placeholder="Логин"
          type="email"
          name="email"
          value={values.email || user?.email}
          errorText={error.email}
          onIconClick={handleIconClick}
          onChange={handleInput}
          {...(error.email && { error: true })}
          {...(isInputDisabled && { disabled: true })}
        />
        <Input
          {...(isInputDisabled && { disabled: true })}
          extraClass="mb-6"
          type="password"
          placeholder="Пароль"
          name="password"
          value={values.password}
          onChange={handleInput}
          onIconClick={handleIconClick}
          {...(isInputDisabled && { icon: 'EditIcon' })}
          minLength={6}
          errorText={error.password}
          {...(error.password && { error: true })}
        />

        {!isInputDisabled && (
          <div className={profileStyles.buttons_wrapper}>
            <button
              className={`${profileStyles.button} text text_type_main-default mr-4`}
              type="button"
              onClick={() => {
                setInputDisabled(true);
                setValues({ name: user.name, email: user.email, password: '' });
                setError({ name: '', email: '', password: '' });
              }}
            >
              Отмена
            </button>
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              disabled={isDisabled}
            >
              Сохранить
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
