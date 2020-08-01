const initialState = {
    isLoading: false,
    data: null,
    error: null,
};

const fetchReducer = (_, actions) => {
    switch (actions.type) {
        case 'SEND':
            return { isLoading: true }
        case 'FINISHED':
            return { isLoading: false, data: actions.data, reqIdentifier: actions.reqIdentifier, reqExtra: actions.reqExtra }
        case 'CLEAR':
            return initialState
        case 'ERROR':
            return { isLoading: false, error: actions.errorMessage, reqIdentifier: "ERROR" }
        default:
            throw new Error("Add new case")
    }
};

export { initialState, fetchReducer }