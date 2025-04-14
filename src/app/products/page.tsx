'use client'

import { useState } from 'react'
import styles from './Produtos.module.css'
import { FiSearch, FiSliders } from 'react-icons/fi'
import Header from '../../components/cabecalho/Header'
import ProdutoDetalhes from '../../components/Modulos/ProdutosDetalhes'
import FiltroModal from '../../components/Modulos/FiltroModal'
import CadastroModal from '../../components/Modulos/CadastroModal'

interface Produto {
  id: number
  nome: string
  quantidade: number
  preco: number
  imagem: string
}

const produtosMock: Produto[] = [
  {
    id: 1,
    nome: 'Pão de Queijo Tradicional',
    quantidade: 120,
    preco: 0.75,
    imagem: 'https://www.panetteria.com.br/images/Marraqueta.jpg',
  },
  {
    id: 2,
    nome: 'Pão Integral',
    quantidade: 80,
    preco: 1.2,
    imagem: 'https://www.panetteria.com.br/images/Marraqueta.jpg',
  },
  {
    id: 3,
    nome: 'Croissant de Presunto',
    quantidade: 50,
    preco: 2.5,
    imagem: 'https://www.panetteria.com.br/images/Marraqueta.jpg',
  },
]

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>(produtosMock)
  const [search, setSearch] = useState('')
  const [detalhesProduto, setDetalhesProduto] = useState<Produto | null>(null)
  const [showFiltro, setShowFiltro] = useState(false)
  const [showCadastro, setShowCadastro] = useState(false)

  const produtosFiltrados = produtos.filter((p) =>
    p.nome.toLowerCase().includes(search.toLowerCase())
  )

  const aplicarFiltro = (nome: string, min: number, max: number) => {
    setProdutos(
      produtosMock.filter((p) =>
        p.nome.toLowerCase().includes(nome.toLowerCase()) &&
        p.preco >= min &&
        p.preco <= max
      )
    )
    setShowFiltro(false)
  }

  const cadastrarProduto = (novoProduto: Omit<Produto, 'id'>) => {
    const novo: Produto = {
      ...novoProduto,
      id: produtos.length + 1
    }
    setProdutos([novo, ...produtos])
  }

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
            <div className={styles.card} key={produto.id}>
              <img src={produto.imagem} alt={produto.nome} className={styles.image} />
              <div className={styles.cardContent}>
                <h3>{produto.nome}</h3>
                <p>Quantidade: {produto.quantidade}</p>
                <p>Preço: R$ {produto.preco.toFixed(2)}</p>
              </div>
              <div className={styles.cardFooter}>
                <button
                  className={styles.acessar}
                  onClick={() => setDetalhesProduto(produto)}
                >
                  Acessar
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {detalhesProduto && (
        <ProdutoDetalhes produto={detalhesProduto} onClose={() => setDetalhesProduto(null)} />
      )}

      {showFiltro && (
        <FiltroModal onFilter={aplicarFiltro} onClose={() => setShowFiltro(false)} />
      )}

      {showCadastro && (
        <CadastroModal onCadastrar={cadastrarProduto} onClose={() => setShowCadastro(false)} />
      )}
    </div>
  )
}
