// src/components/ModulosIngredientes/CadastroModal.tsx
'use client'

import React, { useState } from 'react' // Importar React
import styles from './Modal.module.css'
// Renomeei 'typesIngrediente' para 'IngredienteLocal' apenas para clareza, se for seu arquivo de tipos local.
// No entanto, para consistência, o ideal é que você use IngredientRequestBody e IngredientResponse.
// Se você tem um arquivo 'typesIngrediente.ts' com uma interface 'Ingrediente',
// verifique se ela é compatível com o IngredientRequestBody para o estado do formulário.
// Pelo erro, a interface 'Ingrediente' que você importava antes pode ter 'measure: number'.
// Vamos nos basear nas interfaces IngredientRequestBody e IngredientResponse do seu arquivo 'ingredient.ts'.
import { IngredientRequestBody, IngredientResponse } from '../../interfaces/ingredients' // <<<<<<<<< Importar IngredientResponse aqui

// --- CORREÇÃO DA INTERFACE DE PROPS ---
interface Props {
  // onCadastrarAction deve esperar o que o backend retorna (IngredientResponse),
  // pois é o que handleCadastrarSucesso em page.tsx espera.
  // Você também precisa importar a função addIngredient do serviço.
  onCadastrarAction: (novoIngrediente: IngredientResponse) => void
  onCloseAction: () => void
}

// Importar a função de serviço da API
import { addIngredient } from '../../services/ingredientService';

export default function CadastroModal({ onCadastrarAction, onCloseAction }: Props) {
  // --- CORREÇÃO DO ESTADO DO FORMULÁRIO ---
  // O estado do formulário deve refletir o que o backend espera no request body (IngredientRequestBody)
  // Certifique-se que 'measure' seja string aqui, pois o backend espera string.
  const [form, setForm] = useState<IngredientRequestBody>({
    name: '',
    measure: '', // <<<<<<< AJUSTADO PARA STRING
    value: 0,
    quantity: 0,
    image_path: '', 
    mark: undefined,
    description: undefined,
    validity: '', // <<<<<<< Inicializar validity como string
    min_quantity: undefined // <<<<<<< Inicializar min_quantity como undefined para opcional
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { // Adicionado HTMLTextAreaElement
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]:
        name === 'value' || name === 'quantity' || name === 'min_quantity'
          ? parseFloat(value) // ou parseInt para quantity, min_quantity
          : value // Todos os outros campos, incluindo 'measure', 'name', 'validity' etc., são strings
    }));
  };

  const handleSubmit = async () => { // Adicionado 'async'
    setError(null);
    setIsLoading(true);

    // Validação básica
    if (!form.name || !form.measure || form.value <= 0 || form.quantity <= 0 || !form.validity) {
      setError('Por favor, preencha todos os campos obrigatórios e válidos.');
      setIsLoading(false);
      return;
    }

    try {
      // Chamar a API usando a função do serviço
      const newIngredientResponse = await addIngredient(form);
      // Passar a resposta COMPLETA da API para a função de sucesso no page.tsx
      onCadastrarAction(newIngredientResponse);
      onCloseAction(); // Fechar o modal após sucesso
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Erro ao cadastrar ingrediente.');
      } else {
        setError('Erro desconhecido ao cadastrar ingrediente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Cadastro de Ingrediente</h2>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.form}>
          <input name="name" placeholder="Nome" onChange={handleChange} value={form.name} />
          <input name="measure" placeholder="Medida (kg, unidade)" onChange={handleChange} value={form.measure} /> {/* AJUSTADO PARA STRING */}
          <input name="value" placeholder="Valor" onChange={handleChange} type="number" step="0.01" value={form.value} />
          <input name="quantity" placeholder="Quantidade" onChange={handleChange} type="number" value={form.quantity} />
          <input name="image_path" placeholder="URL da Imagem (Opcional)" onChange={handleChange} value={form.image_path || ''} />
          <input name="mark" placeholder="Marca (Opcional)" onChange={handleChange} value={form.mark || ''} />
          <input name="min_quantity" placeholder="Quantidade Mínima (Opcional)" onChange={handleChange} type="number" value={form.min_quantity || 0} />
          <input name="validity" placeholder="Validade (YYYY-MM-DD)" onChange={handleChange} type="date" value={form.validity} />
          <textarea name="description" placeholder="Descrição (Opcional)" onChange={handleChange} value={form.description || ''} /> {/* Usar textarea para descrição */}
        </div>
        <div className={styles.actions}>
          <button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
          <button onClick={onCloseAction} disabled={isLoading}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}