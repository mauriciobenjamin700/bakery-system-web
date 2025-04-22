'use client'
import { useState, useEffect, useRef } from 'react'
import styles from './Modal.module.css'

interface Props {
  onFilter: (nome: string, min: number, max: number) => void
  onClose: () => void
}

export default function FiltroModal({ onFilter, onClose }: Props) {
  const [nome, setNome] = useState('')
  const [min, setMin] = useState('')
  const [max, setMax] = useState('')

  const nomeRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    nomeRef.current?.focus()
  }, [])

  const aplicarFiltro = () => {
    onFilter(nome, min === '' ? 0 : Number(min), max === '' ? Infinity : Number(max))
  }

  const limpar = () => {
    setNome('')
    setMin('')
    setMax('')
    onFilter('', 0, Infinity)
    onClose()
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>🔍 Filtro de Produtos</h2>
        <input
          ref={nomeRef}
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <div className={styles.row}>
          <input
            type="number"
            placeholder="Preço mínimo"
            value={min}
            onChange={(e) => setMin(e.target.value)}
          />
          <input
            type="number"
            placeholder="Preço máximo"
            value={max}
            onChange={(e) => setMax(e.target.value)}
          />
        </div>
        <div className={styles.actions}>
          <button className={styles.apply} onClick={aplicarFiltro}>✅ Aplicar</button>
          <button className={styles.clear} onClick={limpar}>♻ Limpar Filtros</button>
          <button className={styles.close} onClick={onClose}>❌ Fechar</button>
        </div>
      </div>
    </div>
  )
}
