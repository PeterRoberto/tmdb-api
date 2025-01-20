import { useState, useEffect } from "react";


export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [callFetch, setCallFetch] = useState(false);
    const [method, setMethod] = useState(null);
    const [config, setConfig] = useState(null);

    useEffect(() => {
        
      const fechData = async () => {
          setLoading(true);

          try {
              const res = await fetch(url);
              // console.log(res);
              const json = await res.json();

              setData(json);
          } catch (error) {
              setError("Houve algum erro ao carregar os dados.");
          }

          setLoading(false);
      }

      fechData();
  }, [url, callFetch]);

    
    const validateWithLogin = async (urlValidate, user, password, method, token) => {
      console.log(user)
      console.log(password)
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

        
        console.log(response)
        return response.ok; 
      } catch (error) {
        console.error('Erro ao validar o token de solicitação:', error);
      }
      setMethod(method);
    };

    const createSession = async (urlSession, token) => {
      // console.log(urlSession)
      // console.log(token)
        try {
          const response = await fetch(urlSession, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              request_token: token,
            }),
          });
          const data = await response.json();
          return data.session_id;
        } catch (error) {
          console.error('Erro ao criar a sessão:', error);
        }
      };

      // const authenticateUser = async (username, password, token) => {
      //   const requestToken = await token;
      //   const isValid = await validateWithLogin(username, password, token);
      //   if (isValid) {
      //     const sessionId = await createSession(token);
      //     setSessionId(sessionId);
      //     localStorage.setItem('sessionId', sessionId);
      //   } else {
      //     console.error('Autenticação falhou');
      //   }
      // };


      // const authenticateUser = async (username, password, token) => {
      //   const requestToken = await token;
      // }

    
    return {data, validateWithLogin, createSession, loading, error};
}