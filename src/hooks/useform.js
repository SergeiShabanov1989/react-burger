import { useState } from 'react';
import { validateEmail } from '../components/utils/validate';

export function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);

  const [error, setError] = useState({
    name: null,
    email: null,
    password: null,
    token: null,
  });

  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });

    validateInput(event);
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

        case 'token':
          if (!value) {
            stateObj[name] = 'Обязательное поле';
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
  return { values, handleChange, setValues, error, setError };
}
