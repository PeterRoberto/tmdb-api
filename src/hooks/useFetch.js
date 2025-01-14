import { useState, useEffect } from "react";


export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [callFetch, setCallFetch] = useState(false);

    useEffect(() => {
        
        const fechData = async () => {
            setLoading(true);

            try {
                const res = await fetch(url);
                console.log(res);
                const json = await res.json();

                setData(json);
            } catch (error) {
                setError("Houve algum erro ao carregar os dados.");
            }

            setLoading(false);
        }

        fechData();
    }, [url, callFetch]);

    
    return {data, loading, error};
}