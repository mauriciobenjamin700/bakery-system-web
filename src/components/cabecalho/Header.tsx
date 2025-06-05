'use client'
import Image from 'next/image';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Header.module.css'

export default function Header() {
  const pathname = usePathname()

  function handleLogout() {
    // Adicione aqui a lógica para limpar tokens/cookies se necessário
    window.location.href = '/login'
  }

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
        <Link href="/relatorios" className={pathname === '/relatorios' ? styles.active : ''}>
          Relatório
        </Link>
      </nav>
      <button className={styles.logout} onClick={handleLogout} title="Sair">
        <Image src="/sair 1.svg" alt="Sair" className={styles.logoutIcon} />
      </button>
    </header>
  )
}