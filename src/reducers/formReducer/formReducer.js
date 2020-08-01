const initialState = {
    title: '',
    description: '',
    error: false,
    open: false,
    thingToEdit: null
}

const formReducer = (currentForm, action) => {
    switch (action.type) {
        case 'SET_ALL':
            return { open: true, id: action.id, title: action.title, description: action.description }
        case 'SET_TITLE':
            return { ...currentForm, title: action.title };
        case 'SET_DESCRIPTION':
            return { ...currentForm, description: action.description };
        case 'CLEAR':
            return initialState;
        case 'BAD_INPUT':
            return { ...currentForm, error: true };
        case "NEW":
            return { open: true, thingToEdit: null };
        case "EDIT":
            return { thingToEdit: action.thingToEdit };
        default:
            throw new Error("You should add new case");
    }
}

export { initialState, formReducer }