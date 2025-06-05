// app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import { FaUser } from 'react-icons/fa';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import UserService from '@/services/user';
import { useSetUser } from '@/hooks/user';


export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const setUser = useSetUser();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    const service = new UserService()
    const request: UserLogin = {
      email: username,
      password: password,
    }
    const response = await service.login(request)
    if (response.user) {
        setUser(response.user)
        router.push('/products');
    } else {
      setError('Usuário ou senha inválidos!');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>LOGIN</h2>
        <p className={styles.subtitle}>Preencha os dados do login para acessar</p>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.inputGroup}>
          <label htmlFor="usuario">E-mail</label>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              id="usuario"
              placeholder="Ex: vc@gmail.com"
              className={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FaUser className={styles.icon} />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="senha">Senha</label>
          <div className={styles.inputWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              id="senha"
              placeholder="Ex: senhadeacesso"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <FiEye className={styles.icon} onClick={togglePassword} />
            ) : (
              <FiEyeOff className={styles.icon} onClick={togglePassword} />
            )}
          </div>
        </div>

        <button className={styles.button} onClick={handleLogin}>ENTRAR</button>
      </div>
    </div>
  );
}
