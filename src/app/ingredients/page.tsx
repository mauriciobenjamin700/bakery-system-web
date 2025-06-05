// src/app/ingredients/page.tsx
'use client'

import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from './ingredients.module.css';
import { FiSearch, FiSliders } from 'react-icons/fi';
import Header from '../../components/cabecalho/Header';
import IngredienteEditar from '../../components/ModulosIngredientes/IngredienteEditar';
import IngredienteDetalhes from '../../components/ModulosIngredientes/IngredienteDetalhes';
import FiltroModal from '../../components/ModulosIngredientes/FiltroModal';
import CadastroModal from '../../components/ModulosIngredientes/CadastroModal';
import { IngredientResponse } from '../../interfaces/ingredients'; 
import { getIngredients, deleteIngredient } from '../../services/ingredientService'; // Importar deleteIngredient

// A interface Ingrediente agora é um alias para IngredientResponse do backend
type Ingrediente = IngredientResponse;

export default function Ingredientes() {
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  const [search, setSearch] = useState('');
  const [editarIngrediente, setEditarIngrediente] = useState<Ingrediente | null>(null);
  const [detalhesIngrediente, setDetalhesIngrediente] = useState<Ingrediente | null>(null);
  const [showFiltro, setShowFiltro] = useState(false);
  const [showCadastro, setShowCadastro] = useState(false);
  const [isLoadingIngredients, setIsLoadingIngredients] = useState(true); 
  const [errorLoadingIngredients, setErrorLoadingIngredients] = useState<string | null>(null); 

  // Função para buscar ingredientes da API
  async function fetchIngredients() {
    setIsLoadingIngredients(true);
    setErrorLoadingIngredients(null);
    try {
      const fetchedIngredients = await getIngredients(); // Chama a API para buscar ingredientes
      setIngredientes(fetchedIngredients);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorLoadingIngredients(err.message);
      } else {
        setErrorLoadingIngredients('Erro desconhecido ao carregar ingredientes.');
      }
      console.error('Falha ao buscar ingredientes:', err);
    } finally {
      setIsLoadingIngredients(false);
    }
  }

  useEffect(() => {
    fetchIngredients(); // Executa a função ao montar o componente
  }, []); // Array de dependências vazio para rodar apenas uma vez na montagem

  const ingredientesFiltrados = ingredientes.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  const aplicarFiltro = (nome: string, min: number, max: number) => {
    // Para um filtro real, você buscaria do backend com parâmetros ou filtraria na lista completa carregada
    const filtrados = ingredientes.filter(
      (i) =>
        i.name.toLowerCase().includes(nome.toLowerCase()) &&
        i.value >= min &&
        i.value <= max
    );
    setIngredientes(filtrados);
    setShowFiltro(false);
  };

  const handleCadastrarSucesso = (novoIngredienteDoBackend: IngredientResponse) => {
    // Adiciona o ingrediente retornado pelo backend à sua lista local imediatamente
    setIngredientes((prev) => [
      novoIngredienteDoBackend,
      ...prev
    ]);
    setShowCadastro(false);
  };

  // Função para remover ingrediente (agora com chamada à API)
  const handleRemoverIngrediente = async (id: string) => {
    if (window.confirm('Tem certeza que deseja remover este ingrediente?')) {
      try {
        await deleteIngredient(id); // Chama a API para remover
        setIngredientes(ingredientes.filter((i) => i.id !== id)); // Remove da lista local após sucesso
        alert('Ingrediente removido com sucesso!'); // Feedback ao usuário
      } catch (err: unknown) {
        if (err instanceof Error) {
          alert(`Erro ao remover ingrediente: ${err.message}`);
        } else {
          alert('Erro desconhecido ao remover ingrediente.');
        }
        console.error('Erro ao remover ingrediente:', err);
      }
    }
  };

  const atualizarIngrediente = (ingredienteEditado: Ingrediente) => {
    
    const atualizados = ingredientes.map((i) =>
      i.id === ingredienteEditado.id ? ingredienteEditado : i
    );
    setIngredientes(atualizados);
    setEditarIngrediente(null);
  };

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.topBar}>
          <h2 className={styles.title}>Ingredientes</h2>

          <div className={styles.searchContainer}>
            <div className={styles.searchWrapper}>
              <input
                type="text"
                placeholder="Pesquise por ingredientes"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <FiSearch className={styles.searchIcon} />
            </div>

            <button className={styles.buttonIcon} onClick={() => setShowFiltro(true)}>
              <FiSliders />&nbsp;Filtrar
            </button>

            <button className={styles.buttonIcon} onClick={() => setShowCadastro(true)}>
              ➕ Cadastrar
            </button>
          </div>
        </div>

        <div className={styles.grid}>
          {isLoadingIngredients ? (
            <p>Carregando ingredientes...</p>
          ) : errorLoadingIngredients ? (
            <p className={styles.errorText}>Erro ao carregar: {errorLoadingIngredients}</p>
          ) : ingredientesFiltrados.length > 0 ? (
            ingredientesFiltrados.map((ing) => (
              <div className={styles.card} key={ing.id}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={ing.image_path || 'https://via.placeholder.com/150'}
                    alt={ing.name || 'Imagem do ingrediente'}
                    className={styles.image}
                    width={200}
                    height={140}
                  />
                  <button
                    className={styles.iconOverlay}
                    onClick={() => setDetalhesIngrediente(ing)}
                    title="Ver detalhes"
                  >
                    <Image
                      src="https://img.icons8.com/ios-filled/50/search--v1.png"
                      alt="Ícone de busca"
                      width={20}
                      height={20}
                      className={styles.overlayIcon} // CLASSE CSS CORRIGIDA AQUI
                    />
                  </button>
                </div>

                <div className={styles.cardContent}>
                  <h3>{ing.name}</h3>
                  {/* Ajuste para exibir a medida como string */}
                  <p>Marca: {ing.mark ?? '---'}</p>
                  <p>Qtd: {ing.quantity} {ing.measure} | Min: {ing.min_quantity ?? '---'} {ing.measure}</p>
                  <p>Valor: R$ {ing.value.toFixed(2)}</p>
                </div>

                <div className={styles.cardFooter}>
                  <button
                    className={styles.remover}
                    onClick={() => handleRemoverIngrediente(ing.id)} // Usar a nova função de remoção
                    title="Remover"
                  >
                    <Image
                      src= "https://img.icons8.com/ios-glyphs/30/filled-trash.png"
                      alt="Remover"
                      width={20}
                      height={20}
                    />
                  </button>

                  <button
                    className={styles.acessar}
                    onClick={() => setEditarIngrediente(ing)}
                  >
                    <Image
                      src="https://img.icons8.com/material-outlined/24/pencil--v1.png"
                      alt="Editar"
                      width={20}
                      height={20}
                      className={styles.icon}
                    />
                    <span>Editar</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.noResults}>Nenhum ingrediente encontrado.</p>
          )}
        </div>
      </main>

      {detalhesIngrediente && (
        <IngredienteDetalhes
          ingrediente={detalhesIngrediente}
          onCloseAction={() => setDetalhesIngrediente(null)}
        />
      )}

      {editarIngrediente && (
        <IngredienteEditar
          ingrediente={editarIngrediente}
          onSaveAction={atualizarIngrediente} 
          onCloseAction={() => setEditarIngrediente(null)}
        />
      )}

      {showFiltro && (
        <FiltroModal onFilter={aplicarFiltro} onClose={() => setShowFiltro(false)} />
      )}

      {showCadastro && (
        <CadastroModal onCadastrarAction={handleCadastrarSucesso}
        onCloseAction={() => setShowCadastro(false)} />
      )}
    </div>
  );
}
