
import { Inter } from "next/font/google";
import styles from '../../styles/Home.module.scss'
import Head from 'next/head'
import logoImg from '../../../public/logo.svg'
import Image from 'next/image';
import  { Input } from  '../../components/ui/input'
import { Button } from '../../components/ui/Button'
import { FormEvent, useState, useContext } from "react";
import { AuthContext } from "@/pages/Contexts/AuthContext";
import { toast } from "react-toastify";
import { canSSRGuest } from "@/utils/canSSRGUEST";

import Link from 'next/link'

const inter = Inter({ subsets: ["latin"] });

export default function Signup() {

  const {signUp} = useContext(AuthContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent){
    event.preventDefault();
    if(name === '' || email === '' || password === ''){
      toast.warning('PREENCHA TODOS OS CAMPOS')
      return;
    }
    setLoading(true);

    let data = {
      name,
      email,
      password
    }
   await signUp(data);

   setLoading(false)
  }
  return (
    <>
      <Head>
        <title>Faça seu cadastro agora!</title>
      </Head>
    
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo Sujeito Pizzaria"/>
      <div className={styles.login}>
        <h1>Criando Sua Conta</h1>
        <form onSubmit={handleSignUp}>
        <Input
          placeholder="Digite Seu Nome"
          type="text"
          value={name}
          onChange = { (e) => setName(e.target.value)}
          />
          <Input
          placeholder="Digite Seu Email"
          type="text"
          value={email}
          onChange = { (e) => setEmail(e.target.value)}
          />

          <Input
          placeholder="Sua Senha"
          type="password"
          value={password}
          onChange = { (e) => setPassword(e.target.value)}
          />

          <Button
          type="submit"
          loading={loading}
          >
            Cadastrar
          </Button>

        </form>
        <Link href="/" className={styles.text}>
        Já possui uma conta? Faça o login
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
