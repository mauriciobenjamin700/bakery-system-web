// app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import { FaUser } from 'react-icons/fa';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { login, storeAuthToken } from '../services/authService';
import RegisterModal from '../components/Auth/RegisterModal';
import { UserResponse } from '../interfaces/auth'; // Importar UserResponse para tipagem correta


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    setError('');
    setIsLoading(true);

    try {
      const response = await login({ email, password });

      storeAuthToken(response.access_token);
      router.push('/products');

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Erro desconhecido ao fazer login. Por favor, tente novamente.');
      } else {
        setError('Erro desconhecido ao fazer login. Tente novamente.');
      }
      console.error('Erro durante o login:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Mudar 'user: unknown' para 'user: UserResponse' e remover o cast 'as any'
  const handleRegisterSuccess = (user: UserResponse) => { // <<<<<<<<<<< CORRIGIDO AQUI (linha 46:40)
    console.log('Usuário cadastrado com sucesso:', user);
    alert(`Usuário "${user.name}" cadastrado com sucesso! Agora você pode fazer login.`); // Removido 'as any'
    setShowRegisterModal(false);
  };


  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleLogin}>
        <h2 className={styles.title}>LOGIN</h2>
        <p className={styles.subtitle}>Preencha os dados de login para acessar</p>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <div className={styles.inputWrapper}>
            <input
              type="email"
              id="email"
              placeholder="Ex: seu.email@exemplo.com"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Campo de email do usuário"
              disabled={isLoading}
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
              required
              aria-label="Campo de senha"
              disabled={isLoading}
            />
            {showPassword ? (
              <FiEye className={styles.icon} onClick={togglePasswordVisibility} aria-label="Ocultar senha" />
            ) : (
              <FiEyeOff className={styles.icon} onClick={togglePasswordVisibility} aria-label="Mostrar senha" />
            )}
          </div>
        </div>

        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? 'Entrando...' : 'ENTRAR'}
        </button>

        <button
          type="button"
          className={styles.registerButton}
          onClick={() => setShowRegisterModal(true)}
          disabled={isLoading}
        >
          Novo por aqui? Cadastre-se!
        </button>

      </form>

      {showRegisterModal && (
        <RegisterModal
          // --- CORREÇÃO AQUI ---
          // O RegisterModal espera as props 'onClose' e 'onRegisterSuccess'
          onCloseAction={() => setShowRegisterModal(false)} // <<<<<<< CORRIGIDO AQUI (linha 52:32)
          onRegisterSuccessAction={handleRegisterSuccess} // <<<<<<< CORRIGIDO AQUI
          // --- FIM DA CORREÇÃO ---
        />
      )}
    </div>
  );
}