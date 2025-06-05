'use client'
import Image from 'next/image'; 
import { useState, useEffect } from 'react'
import styles from './ingredients.module.css'
import { FiSearch, FiSliders } from 'react-icons/fi'
import Header from '../../components/cabecalho/Header'
import IngredienteEditar from '../../components/ModulosIngredientes/IngredienteEditar'
import IngredienteDetalhes from '../../components/ModulosIngredientes/IngredienteDetalhes'
import FiltroModal from '../../components/ModulosIngredientes/FiltroModal'
import CadastroModal from '../../components/ModulosIngredientes/CadastroModal'

interface Ingrediente {
  id: string
  name: string
  measure: number
  image_path?: string
  mark?: string
  description?: string
  value: number
  validity?: string
  quantity: number
  min_quantity?: number
}

export default function Ingredientes() {
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([])
  const [search, setSearch] = useState('')
  const [editarIngrediente, setEditarIngrediente] = useState<Ingrediente | null>(null)
  const [detalhesIngrediente, setDetalhesIngrediente] = useState<Ingrediente | null>(null)
  const [showFiltro, setShowFiltro] = useState(false)
  const [showCadastro, setShowCadastro] = useState(false)

  useEffect(() => {
    const data: Ingrediente[] = [
      {
        id: '1',
        name: 'Tomate',
        measure: 1,
        value: 2.5,
        quantity: 500,
        min_quantity: 100,
        image_path: 'https://jpimg.com.br/uploads/2025/02/conheca-os-beneficios-do-tomate-para-a-saude.jpg',
        mark: 'Marca A',
        description: 'Tomate fresco de boa qualidade.',
        validity: '2025-12-31',
      },
      {
        id: '2',
        name: 'Cebola',
        measure: 1,
        value: 1.8,
        quantity: 400,
        min_quantity: 50,
        image_path: 'https://ceagesp.gov.br/wp-content/uploads/2023/03/Cebola-capa.jpg',
        mark: 'Marca B',
        description: 'Cebola roxa, ideal para tempero.',
        validity: '2025-10-15',
      }
    ]
    setIngredientes(data)
  }, [])

  const ingredientesFiltrados = ingredientes.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase())
  )

  const aplicarFiltro = (nome: string, min: number, max: number) => {
    const filtrados = ingredientes.filter(
      (i) =>
        i.name.toLowerCase().includes(nome.toLowerCase()) &&
        i.value >= min &&
        i.value <= max
    )
    setIngredientes(filtrados)
    setShowFiltro(false)
  }

  const cadastrarIngrediente = (novoIngrediente: Omit<Ingrediente, 'id'>) => {
    const novo: Ingrediente = {
      ...novoIngrediente,
      id: (ingredientes.length + 1).toString(),
    }
    setIngredientes((prev) => [novo, ...prev])
    setShowCadastro(false)
  }

  const removerIngrediente = (id: string) => {
    setIngredientes(ingredientes.filter((i) => i.id !== id))
  }

  const atualizarIngrediente = (ingredienteEditado: Ingrediente) => {
    const atualizados = ingredientes.map((i) =>
      i.id === ingredienteEditado.id ? ingredienteEditado : i
    )
    setIngredientes(atualizados)
    setEditarIngrediente(null)
  }

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
          {ingredientesFiltrados.length > 0 ? (
            ingredientesFiltrados.map((ing) => (
              <div className={styles.card} key={ing.id}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={ing.image_path || 'https://via.placeholder.com/150'}
                    alt={ing.name}
                    className={styles.image}
                    width={150}
                    height={100}
                  />
                  <button
                    className={styles.iconOverlay}
                    onClick={() => setDetalhesIngrediente(ing)}
                    title="Ver detalhes"
                  >
                    <Image width="20" height="20" src="https://img.icons8.com/ios-filled/50/search--v1.png" alt="search--v1" />
                  </button>
                </div>

                <div className={styles.cardContent}>
                  <h3>{ing.name}</h3>
                  <p>Marca: {ing.mark ?? '---'}</p>
                  <p>Qtd: {ing.quantity}g | Min: {ing.min_quantity ?? '---'}g</p>
                  <p>Valor: R$ {ing.value.toFixed(2)}</p>
                </div>

                <div className={styles.cardFooter}>
                  <button
                    className={styles.remover}
                    onClick={() => removerIngrediente(ing.id)}
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
                    onClick={() => setEditarIngrediente(ing)}
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
          onSave={atualizarIngrediente}
          onClose={() => setEditarIngrediente(null)}
        />
      )}

      {showFiltro && (
        <FiltroModal onFilter={aplicarFiltro} onClose={() => setShowFiltro(false)} />
      )}

      {showCadastro && (
        <CadastroModal onCadastrar={cadastrarIngrediente} onClose={() => setShowCadastro(false)} />
      )}
    </div>
  )
}
