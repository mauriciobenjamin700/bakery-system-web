'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Modal.module.css'; // Reutilizando os estilos do modal existente

import { IngredientResponse as Ingrediente } from '../../interfaces/ingredients'; 
import { IngredientRequestBody } from '../../interfaces/ingredients'; 
import { updateIngredient } from '../../services/ingredientService'; 

interface IngredienteEditarProps {
  ingrediente: Ingrediente; // Ingrediente original a ser editado
  onSaveAction: (ingredienteEditado: Ingrediente) => void; // Callback para atualizar o estado no page.tsx
  onCloseAction: () => void;
}

export default function IngredienteEditar({ ingrediente, onSaveAction, onCloseAction }: IngredienteEditarProps) {
  // Use os estados locais para os campos do formulário de edição
  const [name, setName] = useState(ingrediente.name);
  // CORREÇÃO: measure agora é string para corresponder à API
  const [measure, setMeasure] = useState(ingrediente.measure); 
  const [value, setValue] = useState(ingrediente.value);
  const [quantity, setQuantity] = useState(ingrediente.quantity);
  const [mark, setMark] = useState(ingrediente.mark || '');
  const [description, setDescription] = useState(ingrediente.description || '');
  const [validity, setValidity] = useState(ingrediente.validity || '');
  const [minQuantity, setMinQuantity] = useState(ingrediente.min_quantity || 0);
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    setName(ingrediente.name);
    setMeasure(ingrediente.measure); // Atualiza para string
    setValue(ingrediente.value);
    setQuantity(ingrediente.quantity);
    setMark(ingrediente.mark || '');
    setDescription(ingrediente.description || '');
    setValidity(ingrediente.validity || '');
    setMinQuantity(ingrediente.min_quantity || 0);
    setError(null); 
  }, [ingrediente]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const updatedData: IngredientRequestBody = {
      name,
      measure, // Enviando como string
      value,
      quantity,
      mark: mark || '', 
      description: description || '',
      validity: validity || '',
      min_quantity: minQuantity || undefined, 
    };

    try {
      const updatedIngredientResponse = await updateIngredient(ingrediente.id, updatedData);
      onSaveAction(updatedIngredientResponse);
      onCloseAction(); 
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Erro desconhecido ao atualizar ingrediente.');
      } else {
        setError('Erro desconhecido ao atualizar ingrediente.');
      }
      console.error('Erro ao atualizar ingrediente:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>✏️ Editar Ingrediente</h2>
        {error && <p className={styles.errorText}>{error}</p>}
        <form onSubmit={handleSubmit}>
          {ingrediente.image_path && (
            <Image
              src={ingrediente.image_path}
              alt={ingrediente.name || 'Imagem do ingrediente'}
              className={styles.image}
              width={200}
              height={140}
            />
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="editName">Nome:</label>
            <input type="text" id="editName" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="editMeasure">Medida:</label>
            {/* CORREÇÃO: Input de medida agora é tipo 'text' e aceita strings */}
            <input type="text" id="editMeasure" name="measure" value={measure} onChange={(e) => setMeasure(e.target.value)} required />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="editValue">Valor:</label>
            <input type="number" step="0.01" id="editValue" name="value" value={value} onChange={(e) => setValue(parseFloat(e.target.value))} required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="editQuantity">Quantidade:</label>
            <input type="number" id="editQuantity" name="quantity" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} required />
          </div>
           <div className={styles.inputGroup}>
            <label htmlFor="editMinQuantity">Quantidade Mínima:</label>
            <input type="number" id="editMinQuantity" name="min_quantity" value={minQuantity} onChange={(e) => setMinQuantity(parseInt(e.target.value))} />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="editValidity">Validade (AAAA-MM-DD):</label>
            <input type="date" id="editValidity" name="validity" value={validity} onChange={(e) => setValidity(e.target.value)} />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="editMark">Marca:</label>
            <input type="text" id="editMark" name="mark" value={mark} onChange={(e) => setMark(e.target.value)} />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="editDescription">Descrição:</label>
            <textarea id="editDescription" name="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>

          <div className={styles.modalActions}>
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Salvando...' : 'Salvar Alterações'}
            </button>
            <button type="button" onClick={onCloseAction} disabled={isLoading}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
