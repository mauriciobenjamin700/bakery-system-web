'use client'
import Image from 'next/image'; 
import { useState } from 'react'
import styles from './Produtos.module.css'
import { FiSearch, FiSliders } from 'react-icons/fi'
import Header from '../../components/cabecalho/Header'
import ProdutoDetalhes from '../../components/Modulos/ProdutosDetalhes'
import FiltroModal from '../../components/Modulos/FiltroModal'
import CadastroModal from '../../components/Modulos/CadastroModal' // O CadastroModal dos produtos

// Importe ou defina o ProdutoEditar. Por enquanto, vou usar um placeholder.
// Você precisará criar ou fornecer este componente.
import ProdutoEditar from '../../components/Modulos/ProdutoEditar'; 


// Definição da MeasureEnum, deve ser igual à de ProdutosDetalhes
type MeasureEnum = 'UN' | 'KG' | 'G' | 'L' | 'ML';

// A interface Produto agora deve ser mais completa, correspondendo a ProdutosDetalhes
interface Produto {
  id: number;
  name: string; // Corrigido de 'nome' para 'name'
  price_cost: number;
  price_sale: number;
  measure: MeasureEnum;
  description: string;
  mark: string;
  min_quantity: number;
  recipe: Array<{
    ingrediente?: string; // Mantido como opcional, conforme ProdutosDetalhes
    quantidade?: number; // Mantido como opcional, conforme ProdutosDetalhes
  }> | null;
  quantity: number; // Corrigido de 'quantidade' para 'quantity'
  validity: string | null;
  imagem?: string; // Corrigido de 'imagem' para 'imagem?' (opcional)
}

const produtosMock: Produto[] = [
  {
    id: 1,
    name: 'Pão de Queijo Tradicional', // Corrigido
    quantity: 120, // Corrigido
    price_cost: 0.50, // Adicionado
    price_sale: 0.75, // Corrigido
    measure: 'UN', // Adicionado
    description: 'Pão de queijo tradicional de receita caseira.', // Adicionado
    mark: 'Caseiro', // Adicionado
    min_quantity: 10, // Adicionado
    recipe: null, // Adicionado
    validity: null, // Adicionado
    imagem: 'https://cdn.2rscms.com.br/imgcache/5054/uploads/5054/layout/Linha%20Gold%20Paes/pao-frances-12h.png.webp', 
  },
  {
    id: 2,
    name: 'Pão Integral', // Corrigido
    quantity: 80, // Corrigido
    price_cost: 0.90, // Adicionado
    price_sale: 1.2, // Corrigido
    measure: 'UN', // Adicionado
    description: 'Pão integral 100% natural, rico em fibras.', // Adicionado
    mark: 'Natural Vida', // Adicionado
    min_quantity: 5, // Adicionado
    recipe: null, // Adicionado
    validity: null, // Adicionado
    imagem: 'https://cdn.2rscms.com.br/imgcache/5054/uploads/5054/layout/Linha%20Gold%20Paes/pao-frances-12h.png.webp', 
  },
  {
    id: 3,
    name: 'Croissant de Presunto', // Corrigido
    quantity: 50, // Corrigido
    price_cost: 2.00, // Adicionado
    price_sale: 2.5, // Corrigido
    measure: 'UN', // Adicionado
    description: 'Croissant folhado com recheio de presunto e queijo.', // Adicionado
    mark: 'Delícias da Padaria', // Adicionado
    min_quantity: 3, // Adicionado
    recipe: null, // Adicionado
    validity: null, // Adicionado
    imagem: 'https://cdn.2rscms.com.br/imgcache/5054/uploads/5054/layout/Linha%20Gold%20Paes/pao-frances-12h.png.webp', 
  },
]

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>(produtosMock)
  const [search, setSearch] = useState('')
  const [detalhesProduto, setDetalhesProduto] = useState<Produto | null>(null)
  const [showFiltro, setShowFiltro] = useState(false)
  const [showCadastro, setShowCadastro] = useState(false)
  // CORREÇÃO: Novo estado para editar PRODUTO, não ingrediente
  const [editarProduto, setEditarProduto] = useState<Produto | null>(null);

  const produtosFiltrados = produtos.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) 
  )

  const aplicarFiltro = (nome: string, min: number, max: number) => {
    setProdutos(
      produtosMock.filter((p) =>
        p.name.toLowerCase().includes(nome.toLowerCase()) && 
        p.price_sale >= min && 
        p.price_sale <= max 
      )
    )
    setShowFiltro(false)
  }

  const cadastrarProduto = (novoProduto: Omit<Produto, 'id'>) => {
    const novo: Produto = {
      ...novoProduto,
      id: produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1 
    }
    setProdutos([novo, ...produtos])
  }

  // CORREÇÃO: Função para remover produto, ID deve ser number
  const removerProduto = (id: number) => {
    setProdutos(produtos.filter((p) => p.id !== id));
  }

  // NOVA FUNÇÃO: Para atualizar um produto (passada para ProdutoEditar)
  const atualizarProduto = (produtoEditado: Produto) => {
    const atualizados = produtos.map((p) =>
      p.id === produtoEditado.id ? produtoEditado : p
    );
    setProdutos(atualizados);
    setEditarProduto(null); // Fecha o modal de edição
  };


  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <div className={styles.topBar}>
          <h2 className={styles.title}>Produtos</h2>

          <div className={styles.searchContainer}>
            <div className={styles.searchWrapper}>
              <input
                type="text"
                placeholder="Pesquise pelos produtos"
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
          {produtosFiltrados.map((produto) => (
            <div className={styles.card} key={produto.id}> {/* Adicionei key aqui se já não houver uma */}
              <div className={styles.imageWrapper}>
                <Image 
                  src={produto.imagem || 'https://placehold.co/300x200/CCCCCC/000000?text=Sem+Imagem'} 
                  alt={produto.name} 
                  className={styles.image} 
                  width={300}
                  height={200} 
                  objectFit="cover"
                />
                <button
                      className={styles.iconOverlay}
                      onClick={() => setDetalhesProduto(produto)}
                      title="Ver detalhes"
                    >
                      <Image width="20" height="20" src="https://img.icons8.com/ios-filled/50/search--v1.png" alt="search--v1" />
                    </button>

              </div>


              <div className={styles.cardContent}>
                
                <h3>{produto.name}</h3> 
                <p>Quantidade: {produto.quantity}</p> 
                <p>Preço: R$ {produto.price_sale.toFixed(2)}</p> 
              </div>

              <div className={styles.cardFooter}>
                  <button
                    className={styles.remover}
                    onClick={() => removerProduto(produto.id)} 
                    title="Remover"
                  >
                    <Image
                      width="20"
                      height="20"
                      src="https://img.icons8.com/ios-glyphs/30/filled-trash.png"
                      alt="Remover"
                    />
                  </button>

                  <button
                    className={styles.acessar}
                    onClick={() => setEditarProduto(produto)} 
                    title="Editar"
                  >
                    <Image
                      width="20"
                      height="20"
                      src="https://img.icons8.com/material-outlined/24/pencil--v1.png"
                      alt="Editar"
                      className={styles.icon}
                    />
                    <span>Editar</span>
                  </button>
              </div>
            </div> // CORREÇÃO: Fechar div do styles.card
          ))} {/* CORREÇÃO: Fechar o parêntese do map */}
        </div> {/* Fecha div do styles.grid */}
      </main>

      {detalhesProduto && (
        <ProdutoDetalhes produto={detalhesProduto} onCloseAction={() => setDetalhesProduto(null)} /> 
      )}

      {showFiltro && (
        <FiltroModal onFilter={aplicarFiltro} onClose={() => setShowFiltro(false)} />
      )}

      {showCadastro && (
        <CadastroModal onCadastrarAction={cadastrarProduto} onCloseAction={() => setShowCadastro(false)} />
      )}

      {/* NOVO: Modal de Edição de Produto */}
      {editarProduto && (
        <ProdutoEditar
          produto={editarProduto}
          onSaveAction={atualizarProduto}
          onCloseAction={() => setEditarProduto(null)}
        />
      )}
    </div>
  )
}
