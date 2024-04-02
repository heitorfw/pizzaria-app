import { GetServerSideProps, GetServerSidePropsResult, GetServerSidePropsContext } from "next";
import { destroyCookie, parseCookies } from "nookies";
import { AuthTokenError } from "@/services/errors/AuthTokenError";

export function canSSRAuth <P>(fn: GetServerSideProps<P>){
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> =>{
        
        const cookies = parseCookies(ctx);
        const token  = cookies['@nextauth.token']
         // se o usuario tentar acessar a pagina porem ja está logado
         console.log(token)
        if(!token){
            return{
                redirect:{
                    destination: '/',
                    permanent: false,
                }
            }
        }try{
       return await fn(ctx);
        }
        catch(err){
            if(err instanceof AuthTokenError){
                destroyCookie(ctx, '@nextauth.token');
                return{
                    redirect:{
                        destination: '/',
                        permanent: false,
                    }
                }
            }
        }
    }
}