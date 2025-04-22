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
        <Link href="/products" className={pathname === '/products' ? styles.active : ''}>
          Produtos
        </Link>
        <Link href="/vendas" className={pathname === '/vendas' ? styles.active : ''}>
          Vendas
        </Link>
        <Link href="/ingredients" className={pathname === '/ingredients' ? styles.active : ''}>
          Ingredientes
        </Link>
        <Link href="/relatorios" className={pathname === '/relatorios' ? styles.active : ''}>
          Relatório
        </Link>
      </nav>
    </header>
  )
}
