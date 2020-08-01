import { useReducer, useCallback } from "react";
import { fetchReducer, initialState } from "../../reducers/fetchReducer/fetchReducer"

const useFetch = () => {
    const [{ isLoading, data, error, reqIdentifier, reqExtra }, dispatch] = useReducer(fetchReducer, initialState);

    const clear = useCallback(() => dispatch({ type: 'CLEAR' }), [])

    const sendRequest = useCallback((identifier, url, method, reqExtra, body, query = '') => {
        dispatch({ type: 'SEND' })
        fetch(url + query, {
            method: method,
            body: body,
            header: {
                "Content-type": "application/json",
            },
        })
            .then(response => response.json())
            .then(data => dispatch({ type: 'FINISHED', data: data, reqIdentifier: identifier, reqExtra: reqExtra }))
            .catch(error => dispatch({ type: 'ERROR', errorMessage: error }))
    }, []);

    return [isLoading, data, error, reqIdentifier, reqExtra, sendRequest, clear];
};

export default useFetch;
