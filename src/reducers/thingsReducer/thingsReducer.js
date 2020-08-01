export const thingsReducer = (currentThings, actions) => {
    switch (actions.type) {
        case "SET":
            return [...actions.thingList];
        case "ADD":
            console.log(actions.thing)
            return [actions.thing, ...currentThings];
        case "EDIT":
            return currentThings.map(thing => thing.id === actions.id ? { id: actions.id, ...actions.thing } : thing)
        case "DELETE":
            return currentThings.filter(
                (thing) => thing.id !== actions.selectedThing
            );
        default:
            throw new Error("ADD NEW CASE");
    }
};