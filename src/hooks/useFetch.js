import { useState, useEffect } from "react";

const apiKey = process.env.REACT_APP_API_KEY;
const urlValidate = `https://api.themoviedb.org/3/authentication/token/validate_with_login?${apiKey}`;
const urlCreateSession = `https://api.themoviedb.org/3/authentication/session/new?${apiKey}`;


export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [sessionId, setSessionId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [callFetch, setCallFetch] = useState(false);
    const [method, setMethod] = useState(null);
    

    // Requisição na URL para o REQUEST TOKEN
    useEffect(() => {
        
      const fechData = async () => {
        setLoading(true);

        try {
          const res = await fetch(url);
          const json = await res.json();

          setData(json);
        } catch (error) {
          setError("Houve algum erro ao carregar os dados.");
        }

        setLoading(false);
      }

      fechData();
    }, [url, callFetch]);


    // 2 - Recebe o USER e PASSWORD para que com o TOKEN gerado antes seja passado
    // para o BODY
    const validateWithLogin = async (user, password, token) => {
      try {
        const response = await fetch(urlValidate, {
          method: 'POST',
          headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: user, 
            password: password,
            request_token: token,
          }),
        });
        return response.ok; 
      } catch (error) {
        console.error('Erro ao validar o token de solicitação:', error);
      }
      setMethod(method);
      
    };


    // 3 Criar a sessão
    const createSession = async (token) => {
      setLoading(true);
      try {
        const response = await fetch(urlCreateSession, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            request_token: token,
          }),
        });
        const dataSession = await response.json();
        // console.log(dataSession);
        
        return dataSession.session_id;
      } catch (error) {
        console.error('Erro ao criar a sessão:', error);
      }
      setLoading(false);
    };


    
    const authenticateUser = async (user, password, token) => {
      const isValid = await validateWithLogin(user, password, token);
      console.log('Confere a validação da função validateWithLogin ', isValid)
      // console.log(user)
      // console.log(password)
      // console.log(token)
      if (isValid) {
        const sessionId = await createSession(token);
        setSessionId(sessionId);
        localStorage.setItem('sessionId', sessionId);
      } else {
        console.error('Autenticação falhou');
      }
    };


    

    // const logoutSession = async (url) => {
    //   console.log(url);

    //   try {
    //     const urlDelete = await fetch(url, {
    //       method: 'DELETE',
    //       headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //       },
    //     });
    //     const dataLogout = await urlDelete.json();
    //     console.log(dataLogout);

    //     return dataLogout.session_id;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    
  return {data, validateWithLogin, createSession, authenticateUser, sessionId, loading, error};
}