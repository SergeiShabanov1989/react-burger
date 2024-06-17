import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import profileStyles from './profile.module.css';
import { validateEmail } from '../components/utils/validate';
import { updateUserProfile } from '../services/user/actions';

export function ProfilePage() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState({
    name: null,
    email: null,
    password: null,
  });
  const [isInputDisabled, setInputDisabled] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (user) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: '',
      });
    }
  }, [user]);

  useEffect(() => {
    if (error.email !== '' || error.password !== '' || error.name !== '') {
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
        case 'name':
          if (!value) {
            stateObj[name] = 'Обязательное поле';
          } else if (value.length < 4) {
            stateObj[name] = 'Минимальная длина 4 символа';
          } else {
            stateObj[name] = '';
          }
          break;

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
    setInputDisabled(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValue.name !== user?.name || formValue.email !== user?.email) {
      dispatch(updateUserProfile(formValue));
    }
  };

  return (
    <div>
      <form className={`${profileStyles.form} mb-6`} onSubmit={handleSubmit}>
        <Input
          minLength={4}
          extraClass="mb-6"
          placeholder="Имя"
          type="text"
          {...(isInputDisabled && { icon: 'EditIcon' })}
          name="name"
          value={formValue.name || user?.name}
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
          value={formValue.email || user?.email}
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
          value={formValue.password}
          onChange={handleInput}
          onIconClick={handleIconClick}
          {...(isInputDisabled && { icon: 'EditIcon' })}
          minLength={6}
          errorText={error.password}
          {...(error.password && { error: true })}
        />

        {!isInputDisabled && (
          <>
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              disabled={isDisabled}
            >
              Сохранить
            </Button>
            <Button
              htmlType="button"
              type="primary"
              size="medium"
              onClick={() => {
                setInputDisabled(true);
                setFormValue({
                  name: user?.name,
                  email: user?.email,
                  password: '',
                });
                setError({ name: '', email: '', password: '' });
              }}
            >
              Отмена
            </Button>
          </>
        )}
      </form>
    </div>
  );
}
