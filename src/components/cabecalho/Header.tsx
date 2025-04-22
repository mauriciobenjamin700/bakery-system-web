// app/components/Header.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Header.module.css'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className={styles.header}>
      <div className={styles.logo}>LOGO</div>
      <nav className={styles.nav}>
        <Link href="/products" className={pathname === '/produtos' ? styles.active : ''}>
          Produtos
        </Link>
        <Link href="/vendas" className={pathname === '/vendas' ? styles.active : ''}>
          Vendas
        </Link>
        <Link href="/ingredients" className={pathname === '/ingredientes' ? styles.active : ''}>
          Ingredientes
        </Link>
        <Link href="/relatorio" className={pathname === '/relatorio' ? styles.active : ''}>
          Relatório
        </Link>
      </nav>
    </header>
  )
}
