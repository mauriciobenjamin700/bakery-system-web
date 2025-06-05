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
        <Link
          href="/products"
          className={pathname.startsWith('/products') ? styles.active : ''}
        >
          Produtos
        </Link>
        <Link
          href="/vendas"
          className={pathname.startsWith('/vendas') ? styles.active : ''}
        >
          Vendas
        </Link>
        <Link
          href="/ingredients"
          className={pathname.startsWith('/ingredients') ? styles.active : ''}
        >
          Ingredientes
        </Link>
        <Link
          href="/relatorios"
          className={pathname.startsWith('/relatorios') ? styles.active : ''}
        >
          Relatório
        </Link>
      </nav>
      <button className={styles.logout} onClick={handleLogout} title="Sair">
        <Image
          src="/sair 1.svg"
          alt="Sair"
          className={styles.logoutIcon}
          width={24}
          height={24}
        />
      </button>
    </header>
  )
}