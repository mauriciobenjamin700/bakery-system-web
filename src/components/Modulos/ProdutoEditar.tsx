// bakery-system-web/src/components/Modulos/ProdutoEditar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import styles from './Modal.module.css'; // Reutilizando os estilos do modal
import Image from 'next/image';

// Definição da MeasureEnum, deve ser igual à de ProdutosDetalhes
type MeasureEnum = 'UN' | 'KG' | 'G' | 'L' | 'ML';

interface Produto {
  id: number;
  name: string;
  price_cost: number;
  price_sale: number;
  measure: MeasureEnum;
  description: string;
  mark: string;
  min_quantity: number;
  recipe: Array<{
    ingrediente?: string;
    quantidade?: number;
  }> | null;
  quantity: number;
  validity: string | null;
  imagem?: string;
}

interface ProdutoEditarProps {
  produto: Produto;
  onSaveAction: (produtoEditado: Produto) => void;
  onCloseAction: () => void;
}

export default function ProdutoEditar({ produto, onSaveAction, onCloseAction }: ProdutoEditarProps) {
  // Estados locais para os campos do formulário
  const [name, setName] = useState(produto.name);
  const [priceCost, setPriceCost] = useState(produto.price_cost.toString());
  const [priceSale, setPriceSale] = useState(produto.price_sale.toString());
  const [measure, setMeasure] = useState<MeasureEnum>(produto.measure);
  const [description, setDescription] = useState(produto.description);
  const [mark, setMark] = useState(produto.mark);
  const [minQuantity, setMinQuantity] = useState(produto.min_quantity.toString());
  const [quantity, setQuantity] = useState(produto.quantity.toString());
  const [validity, setValidity] = useState(produto.validity || '');
  const [imagem, setImagem] = useState(produto.imagem || '');
  // Opcional: estado para a receita, se for editável
  // const [recipe, setRecipe] = useState(produto.recipe);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Efeito para atualizar os estados locais se o produto mudar (se o modal for reutilizado)
  useEffect(() => {
    setName(produto.name);
    setPriceCost(produto.price_cost.toString());
    setPriceSale(produto.price_sale.toString());
    setMeasure(produto.measure);
    setDescription(produto.description);
    setMark(produto.mark);
    setMinQuantity(produto.min_quantity.toString());
    setQuantity(produto.quantity.toString());
    setValidity(produto.validity || '');
    setImagem(produto.imagem || '');
    setError(null);
  }, [produto]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Prepara os dados atualizados
    const updatedProduto: Produto = {
      ...produto, // Mantém o ID e outras propriedades não editáveis
      name,
      price_cost: parseFloat(priceCost),
      price_sale: parseFloat(priceSale),
      measure,
      description,
      mark,
      min_quantity: parseInt(minQuantity),
      quantity: parseInt(quantity),
      validity: validity || null,
      imagem,
      // recipe: recipe, // Incluir se for editável
    };

    try {
      // TODO: Aqui você faria a chamada real para a API para atualizar o produto
      // await updateProdutoAPI(updatedProduto.id, updatedProduto); 

      // Simulação de delay para a API
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log("Produto atualizado (simulação):", updatedProduto);

      onSaveAction(updatedProduto); // Chama a ação de salvar no componente pai
      onCloseAction(); // Fecha o modal
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Erro desconhecido ao atualizar produto.');
      } else {
        setError('Erro desconhecido ao atualizar produto.');
      }
      console.error('Erro ao atualizar produto:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>✏️ Editar Produto</h2>
        {error && <p className={styles.errorText}>{error}</p>}
        <form onSubmit={handleSubmit}>
          {produto.imagem && (
            <Image
              src={produto.imagem}
              alt={produto.name || 'Imagem do produto'}
              className={styles.image}
              width={200}
              height={140}
              objectFit="cover"
            />
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="editName">Nome:</label>
            <input type="text" id="editName" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="editPriceCost">Preço de Custo:</label>
            <input type="number" step="0.01" id="editPriceCost" value={priceCost} onChange={(e) => setPriceCost(e.target.value)} required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="editPriceSale">Preço de Venda:</label>
            <input type="number" step="0.01" id="editPriceSale" value={priceSale} onChange={(e) => setPriceSale(e.target.value)} required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="editMeasure">Medida:</label>
            <select id="editMeasure" value={measure} onChange={(e) => setMeasure(e.target.value as MeasureEnum)}>
              <option value="UN">Unidade</option>
              <option value="KG">Quilo</option>
              <option value="G">Grama</option>
              <option value="L">Litro</option>
              <option value="ML">Mililitro</option>
            </select>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="editDescription">Descrição:</label>
            <textarea id="editDescription" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="editMark">Marca:</label>
            <input type="text" id="editMark" value={mark} onChange={(e) => setMark(e.target.value)} />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="editMinQuantity">Quantidade Mínima:</label>
            <input type="number" id="editMinQuantity" value={minQuantity} onChange={(e) => setMinQuantity(e.target.value)} />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="editQuantity">Quantidade:</label>
            <input type="number" id="editQuantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="editValidity">Validade (AAAA-MM-DD):</label>
            <input type="date" id="editValidity" value={validity} onChange={(e) => setValidity(e.target.value)} />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="editImagem">Link da Imagem:</label>
            <input type="text" id="editImagem" value={imagem} onChange={(e) => setImagem(e.target.value)} />
          </div>

          <div className={styles.actions}>
            <button className={styles.apply} type="submit" disabled={isLoading}>
              💾 Salvar
            </button>
            <button className={styles.close} type="button" onClick={onCloseAction} disabled={isLoading}>❌ Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
