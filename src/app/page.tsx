// app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import { FaUser } from 'react-icons/fa';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const users = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'funcionario', password: 'func123', role: 'funcionario' }
];

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      // Redireciona para a página apropriada com base no tipo de usuário
      if (user.role === 'admin') {
        router.push('/products'); // Página de relatórios do administrador
      } else {
        router.push('/products'); // Página do funcionário
      }
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
          <label htmlFor="usuario">Usuário</label>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              id="usuario"
              placeholder="Ex: jhonasrodrigues"
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
