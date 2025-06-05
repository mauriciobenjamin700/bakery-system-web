// components/ProdutoDetalhes.tsx
'use client'
import styles from './Modal.module.css'
import Image from 'next/image';
interface Props {
  produto: {
    nome: string
    quantidade: number
    preco: number
    imagem: string
  }
  onClose: () => void
}

export default function ProdutoDetalhes({ produto, onClose }: Props) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Detalhes do Produto</h2>
        <Image src={produto.imagem} alt={produto.nome} className={styles.image} />
        <p><strong>Nome:</strong> {produto.nome}</p>
        <p><strong>Quantidade:</strong> {produto.quantidade}</p>
        <p><strong>Preço:</strong> R$ {produto.preco.toFixed(2)}</p>
        <button className={styles.closeButton} onClick={onClose}>Fechar</button>
      </div>
    </div>
  )
}
