import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const users = [
  { username: 'miguel', password: '123456' },
  { username: 'wagner', password: '123456' },
  { username: 'juan', password: '123456' },
];

function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const handleLogin = () => {
    const username = watch('username');
    const password = watch('password');

    const userExists = users.some((user) => user.username === username && user.password === password);

    if (userExists) {
      localStorage.setItem('authToken', username);
      navigate('/');
    } else {
      alert('Username or password is incorrect');
    }
  };

  return (
    <div className="bg-gray-900 flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit(handleLogin)} className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm">
        <div className="mb-4">
          <label className="block text-gray-400" htmlFor="username">Usuário: </label>
          <input
            type="text"
            id="username"
            aria-label="Usuário"
            {...register('username', {
              required: 'Este campo é obrigatório',
              minLength: {
                value: 4,
                message: 'O nome de usuário deve ter no mínimo 4 caracteres'
              }
            })}
            className="w-full p-2 mt-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-400" htmlFor="password">Senha: </label>
          <input
            type="password"
            id="password"
            aria-label="Senha"
            {...register('password', {
              required: 'Este campo é obrigatório',
              minLength: {
                value: 6,
                message: 'A senha deve ter no mínimo 6 caracteres'
              }
            })}
            className="w-full p-2 mt-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
        </div>
        <button
          type="submit"
          className="w-full py-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-200"
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => navigate('/register')}
          className="w-full py-2 mt-4 bg-green-600 hover:bg-green-700 text-white rounded-md transition duration-200"
        >
          Registrar Novo Usuário
        </button>
      </form>
    </div>
  );
}

export default Login;
