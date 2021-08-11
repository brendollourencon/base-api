import {useState} from "react";
import {useAuth} from "../AuthContext";

export default function Login() {
    const {login, logout, user} = useAuth();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    return (
        <div>
            {user && user.email ? user.email : ''} <br/>
            <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder={"Usuário"}/> <br/>
            <input type="text" onChange={(e) => setPassword(e.target.value)} placeholder={"Senha"}/> <br/>
            <button onClick={() => login({email,password})}>Login</button>
            <br/>
            <button onClick={() => logout()} >Fazer logoff</button>
            <a href="/">Voltar para a home</a>
        </div>
    )
}