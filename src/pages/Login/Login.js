import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';


// hook
import { useFetch } from '../../hooks/useFetch';


const apiKey = process.env.REACT_APP_API_KEY;
const createToken = `https://api.themoviedb.org/3/authentication/token/new?${apiKey}`;
// const urlValidate = `https://api.themoviedb.org/3/authentication/token/validate_with_login?${apiKey}`;


// PASSO 1 - Criar Request TOKEN, pegar o link abaixo e concatenar com a API
// Pegar essa URL montada e jogar no hook useFetch, que nos retorna o TOKEN no data.request_token
// https://api.themoviedb.org/3/authentication/token/new?+API  (const createToken)


// PASSO 2 - Pegar o Token gerado no primeiro passo e somar a URL abaixo
// https://www.themoviedb.org/authenticate/{SEU_TOKEN}  (const createSession)
// Pegar a url montada na const createSession passar p/ o hook useFetch(createToken);


// PASSO 3 - Pegar a const addToken e somar nela o data.request_token que pegamos do useFetch()


// console.log(createSession)

const Login = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    // CHAMAR o Custom Hook
    const { data, validateWithLogin, createSession, authenticateUser, loading, error } = useFetch(createToken);
  
    useEffect(() => {
        if(data) {
            // PASSO 3
            // const addToken = `https://www.themoviedb.org/authenticate/${data.request_token}/allow`;

            console.log(data);
            
            // console.log(data.request_token);
            // console.log(createSession);
            // httpConfig(null, "POST", data.request_token);
        }
    }, [data]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if(data.request_token) {
            validateWithLogin(user, password, data.request_token);
            authenticateUser(user, password, data.request_token);
        }

        setUser("");
        setPassword("");
    }

  return (
    <div className={styles.login}>
        <p>Faça o login para poder utilizar o sistema</p>
        <form onSubmit={handleSubmit}>
            <label>
            <span>Email:</span>
            <input 
                type="text" 
                name="email"
                required 
                placeholder="E-mail do usuário"
                value={user}
                onChange={(e) => setUser(e.target.value)}
            />
            </label>
            <label>
            <span>Senha:</span>
            <input 
                type="password" 
                name="password" 
                required 
                placeholder="Insira sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </label>
            <button className="btn btn-success">Entrar</button>
        </form>
    </div>
  )
}

export default Login