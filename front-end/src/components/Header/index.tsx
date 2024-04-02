import styles from './styles.module.scss'
import Link from 'next/link'
import { useContext } from 'react'
import { AuthContext } from '@/pages/Contexts/AuthContext'

import { FiLogOut } from 'react-icons/fi'

export function Header(){
    const {signOut} = useContext(AuthContext);
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <img src="/logo.svg" width={190} height={60} />
                </Link>

                <nav className={styles.menuNav}> 
                    <Link href="/category" className={styles.link}>
                            Categoria
                        </Link>

                    <Link href="/product" className={styles.cardapio}>
                        Cardapio
                    </Link>

                    <button onClick={signOut}>
                        <FiLogOut color="#fff" size={24}/>
                    </button>
                </nav>

            </div>
        </header>
    )
}