import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';


// hook
import { useFetch } from '../../hooks/useFetch';


const apiKey = process.env.REACT_APP_API_KEY;
const createToken = `https://api.themoviedb.org/3/authentication/token/new?${apiKey}`;


const Login = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    // CHAMAR o Custom Hook
    const { data, validateWithLogin, authenticateUser, loading, error } = useFetch(createToken);

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