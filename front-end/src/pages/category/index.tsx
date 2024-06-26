import styles from './styles.module.scss'
import Head from "next/head"
import { Header } from "@/components/Header"
import { canSSRAuth } from '@/utils/canSSRAuth'
import { FormEvent, useState } from 'react'
import { setAPIClient } from '@/services/api'
import { toast } from 'react-toastify'

export default function Category(){
    const [name, setName] = useState('');

   async function handleRegister(event: FormEvent){
        event.preventDefault();
        if(name === ''){
            toast.warning('Preencha a categoria!')
            return;
        }
        const apiClient = setAPIClient();
        console.log(name)
        await apiClient.post('/category', {
            name: name
        })
        toast.success('Categoria cadastrada com Sucesso !')

        setName('');

   }
    return(
        <>
            <Head>
                <title>Categorias - Sujeito Pizzaria</title>
            </Head>

            <div>
                <Header/>
                
                <main className={styles.container}>
                    <h1>Cadastrar Categorias</h1>

                    <form className={styles.form} onSubmit={handleRegister} >
                        <input type="text" 
                            placeholder='Digite o nome da categoria'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={styles.input}/>

                        <button type="submit" className={styles.buttonAdd}>Cadastrar</button>

                    </form>

                </main>
            </div>
        </>
    )
}

export  const getServerSideProps = canSSRAuth(async (ctx) =>{
    return{
      props:{}
    }
  })

