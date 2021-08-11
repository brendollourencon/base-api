import {useAuth} from "../AuthContext";

export function Home(){
    const {user} = useAuth();
    return (
        <div>
            {user && user.email ? user.email : ''} <br/>
            Página inicial
            <br/>
            <a href="/login">ir para pagina de login</a>
        </div>
    )
}