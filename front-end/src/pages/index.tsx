import { useContext, FormEvent, useState } from "react";
import { Inter } from "next/font/google";
import styles from '../styles/Home.module.scss'
import Head from 'next/head'
import logoImg from '../../public/logo.svg'
import Image from 'next/image';
import  { Input } from  '../components/ui/input'
import { Button } from '../components/ui/Button'
import { AuthContext } from "@/pages/Contexts/AuthContext";
import { toast } from "react-toastify";
import { canSSRGuest } from "@/utils/canSSRGUEST";

import Link from 'next/link'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const {signIn} = useContext(AuthContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent){
    event.preventDefault();

    if(email === '' || password === ''){
      toast.warning('PREENCHA SEUS DADOS')
      return;
    }
    setLoading(true)

    let data = {
     email,
     password
    }
    await signIn(data)
    setLoading(false);
  }
  return (
    <>
      <Head>
        <title>Titulo</title>
      </Head>
    
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo Sujeito Pizzaria"/>
      <div className={styles.login}>
        <form onSubmit={handleLogin}>
          <Input
          placeholder="Digite Seu Email"
          type="text"
          value={email}
          onChange={ (e) => setEmail(e.target.value)}
          />

          <Input
          placeholder="Sua Senha"
          type="password"
          value={password}
          onChange={ (e) => setPassword(e.target.value)}
          />

          <Button
          type="submit"
          loading={loading}
          >
            Cadastrar
          </Button>

        </form>
        <Link href="/signup" className={styles.text}>
        Não Possui uma conta? Cadastre-se
        </Link> 
      </div>
    </div>
    </>
    
  );
}

export  const getServerSideProps = canSSRGuest(async (ctx) =>{
  return{
    props:{}
  }
})