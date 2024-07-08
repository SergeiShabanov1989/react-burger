import { ChangeEvent, useState } from 'react';
import { validateEmail } from '../components/utils/validate';

type TInputValues = {
  name?: string | null;
  email?: string | null;
  password?: string | null;
  token?: string | null;
};

export function useForm(inputValues: TInputValues) {
  const [values, setValues] = useState<TInputValues>(inputValues);

  const [error, setError] = useState<TInputValues>({
    name: null,
    email: null,
    password: null,
    token: null,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });

    validateInput(event);
  };

  const validateInput = (e: ChangeEvent<HTMLInputElement>): void => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name as keyof typeof prev]: '' };

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
