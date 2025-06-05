// src/components/ModulosIngredientes/CadastroModal.tsx
'use client'; // Mantenha isso se o arquivo for um Client Component

import React, { useState } from 'react';
import { addIngredient } from '../../services/ingredientService'; // Importe a função do serviço
import { IngredientRequestBody, IngredientResponse } from '../../interfaces/ingredients'; // Importe as interfaces
import styles from './CadastroModal.module.css'; // Assumindo que você tem um CSS para o modal



interface CadastroModalProps {
    onCloseAction: () => void;
    // Agora, onCadastrar receberá o Ingrediente REAL do backend, com ID e tudo.
    onCadastrarSucessoAction: (ingrediente: IngredientResponse) => void;
}

export default function CadastroModal({ onCloseAction, onCadastrarSucessoAction }: CadastroModalProps) {
    const [name, setName] = useState('');
    const [measure, setMeasure] = useState(''); // Ajustado para string para compatibilidade com backend
    const [mark, setMark] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState<number>(0);
    const [minQuantity, setMinQuantity] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);
    const [validity, setValidity] = useState(''); // Formato "YYYY-MM-DD"
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // Previne o recarregamento da página

        setError(null); // Limpa erros anteriores
        setIsLoading(true); // Ativa o estado de carregamento

        // Validação básica no frontend (ajuste conforme necessário)
        if (!name || !measure || value <= 0 || quantity <= 0 || !validity) {
            setError('Por favor, preencha todos os campos obrigatórios.');
            setIsLoading(false);
            return;
        }

        // Prepara os dados para enviar ao backend, conforme IngredientRequestBody
        const ingredientData: IngredientRequestBody = {
            name,
            measure, // Já é string
            mark: mark || undefined, // Envia undefined se vazio para campos opcionais
            description: description || undefined,
            value,
            min_quantity: minQuantity,
            quantity,
            validity, // Já deve estar no formato YYYY-MM-DD do input type="date"
        };

        try {
            const newIngredient = await addIngredient(ingredientData); // Chama a API
            onCadastrarSucessoAction(newIngredient); // Passa o ingrediente retornado pelo backend para o pai
            onCloseAction(); // Fecha o modal
        } catch (err: unknown) {
            let errorMessage = 'Erro desconhecido ao cadastrar ingrediente.';
            if (err && typeof err === 'object' && 'message' in err) {
                errorMessage = String((err as { message: unknown }).message);
            }
            setError(errorMessage);
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Cadastrar Novo Ingrediente</h2>
                {error && <p className={styles.error}>{error}</p>} {/* Estilize o erro */}
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="name">Nome:</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="measure">Medida (ex: kg, unidade):</label>
                        <input type="text" id="measure" value={measure} onChange={(e) => setMeasure(e.target.value)} required />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="value">Valor (R$):</label>
                        <input type="number" id="value" step="0.01" value={value} onChange={(e) => setValue(parseFloat(e.target.value))} required />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="quantity">Quantidade Atual:</label>
                        <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} required />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="minQuantity">Quantidade Mínima:</label>
                        <input type="number" id="minQuantity" value={minQuantity} onChange={(e) => setMinQuantity(parseInt(e.target.value))} />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="validity">Validade (AAAA-MM-DD):</label>
                        <input type="date" id="validity" value={validity} onChange={(e) => setValidity(e.target.value)} required />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="mark">Marca (Opcional):</label>
                        <input type="text" id="mark" value={mark} onChange={(e) => setMark(e.target.value)} />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="description">Descrição (Opcional):</label>
                        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
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