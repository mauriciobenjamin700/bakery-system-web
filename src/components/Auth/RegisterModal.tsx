// src/components/Auth/RegisterModal.tsx
'use client';

import React, { useState } from 'react';
import styles from '../ModulosIngredientes/Modal.module.css'; // Reutilizando os estilos do modal existente
import { UserCreateRequest, UserResponse } from '../../interfaces/auth';
import { createUser } from '../../services/authService';

interface RegisterModalProps {
  onCloseAction: () => void; // <<<<<<< ESPERA 'onClose'
  onRegisterSuccessAction: (user: UserResponse) => void; // <<<<<<< ESPERA 'onRegisterSuccess' e UserResponse
}

export default function RegisterModal({ onCloseAction, onRegisterSuccessAction }: RegisterModalProps) {
  const [form, setForm] = useState<UserCreateRequest>({
    name: '',
    phone: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Validação básica
    if (!form.name || !form.phone || !form.email || !form.password) {
      setError('Por favor, preencha todos os campos.');
      setIsLoading(false);
      return;
    }

    try {
      const newUser = await createUser(form);
      onRegisterSuccessAction(newUser);
      onCloseAction();
    } catch (err: unknown) { // <<<<<<<<<<< CORRIGIDO AQUI (linha 45:19)
      if (err instanceof Error) {
        setError(err.message || 'Erro desconhecido ao cadastrar. Tente novamente.');
      } else {
        setError('Erro desconhecido ao cadastrar. Tente novamente.');
      }
      console.error('Erro de cadastro:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>✨ Cadastrar Novo Usuário</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Nome:</label>
            <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="phone">Telefone:</label>
            <input type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange} required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Senha:</label>
            <input type="password" id="password" name="password" value={form.password} onChange={handleChange} required />
          </div>
          <div className={styles.modalActions}>
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
            <button type="button" onClick={onCloseAction} disabled={isLoading}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}