// components/CadastroModal.tsx
'use client'
import { useState } from 'react'
import styles from './Modal.module.css'

interface Props {
  onCadastrar: (produto: {
    nome: string
    preco: number
    quantidade: number
    imagem: string
  }) => void
  onClose: () => void
}

export default function CadastroModal({ onCadastrar, onClose }: Props) {
  const [nome, setNome] = useState('')
  const [preco, setPreco] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [imagem, setImagem] = useState('')

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Cadastro de Produto</h2>
        <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input placeholder="Preço" type="number" value={preco} onChange={(e) => setPreco(e.target.value)} />
        <input placeholder="Quantidade" type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
        <input placeholder="Link da imagem" value={imagem} onChange={(e) => setImagem(e.target.value)} />
        <div className={styles.actions}>
          <button className={styles.cadastrarButton} onClick={() => {
            onCadastrar({
              nome,
              preco: Number(preco),
              quantidade: Number(quantidade),
              imagem
            })
            onClose()
          }}>Cadastrar</button>
          <button className={styles.closeButton} onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
