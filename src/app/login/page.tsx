// app/login/page.tsx
'use client';

import styles from './login.module.css';
import { FaUser } from 'react-icons/fa';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useState } from 'react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>LOGIN</h2>
        <p className={styles.subtitle}>Preencha os dados do login para acessar</p>

        <div className={styles.inputGroup}>
          <label htmlFor="usuario">Usuário</label>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              id="usuario"
              placeholder="Ex: jhonasrodrigues"
              className={styles.input}
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
            />
            {showPassword ? (
              <FiEye className={styles.icon} onClick={togglePassword} />
            ) : (
              <FiEyeOff className={styles.icon} onClick={togglePassword} />
            )}
          </div>
        </div>

        <button className={styles.button}>ENTRAR</button>
      </div>
    </div>
  );
}
