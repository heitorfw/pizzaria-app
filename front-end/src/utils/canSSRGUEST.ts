import { GetServerSideProps, GetServerSidePropsResult, GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";

export function canSSRGuest <P>(fn: GetServerSideProps<P>){
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> =>{
        
        const cookies = parseCookies(ctx);
        const token  = cookies['@nextauth.token']
         // se o usuario tentar acessar a pagina porem ja está logado
         console.log(token)
        if(token){
            return{
                redirect:{
                    destination: '/dashboard',
                    permanent: false,
                }
            }
        }
       return await fn(ctx);
    }
}