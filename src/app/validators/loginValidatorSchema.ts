import * as yup from 'yup';

export default yup.object().shape({
  email: yup
    .string()
    .email('Неверный почтовый адрес')
    .required('Введите почтовый адрес'),
  password: yup.string().required('Введите пароль'),
});
