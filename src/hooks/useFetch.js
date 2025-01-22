import { useState, useEffect } from "react";


export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [callFetch, setCallFetch] = useState(false);
    const [method, setMethod] = useState(null);
    const [config, setConfig] = useState(null);
    const [userSession, setUserSession] = useState(null);
    const [sessionId, setSessionId] = useState(null);
    

    const validateWithLogin = async (urlValidate, user, password, method, token) => {
      try {
        const response = await fetch(urlValidate, {
          method: method,
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

    const createSession = async (urlSession, token) => {
      try {
        const response = await fetch(urlSession, {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            request_token: token,
          }),
        });
        const dataSession = await response.json();
        console.log(dataSession)
        return dataSession.session_id;
      } catch (error) {
        console.error('Erro ao criar a sessão:', error);
      }
      debugger
    };
    
    // const authenticateUser = async (user, password, token) => {
    //   // const requestToken = await data.request_token;
    //   const isValid = await validateWithLogin(url, user, password, "POST", token);
    //   console.log(user)
    //   console.log(password)
    //   console.log(token)
    //   console.log(isValid)
      
    //   if (isValid) {
    //     const sessionId = await createSession(token);
    //     setSessionId(sessionId);
    //     localStorage.setItem('sessionId', sessionId);
    //   } else {
    //     console.error('Autenticação falhou');
    //   }
    //   
    // };


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

    
  return {data, validateWithLogin, createSession, loading, error};
}