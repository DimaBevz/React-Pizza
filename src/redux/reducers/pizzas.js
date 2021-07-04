const initialState = {
    items: [],
    isLoaded: false // то есть если загружен, то отображаем пиццы, а иначе отображаем загрузку
    // ставим "false" ибо когда у нас только приложение запускается, то идёт загрузка (не загружено ещё)
};


const pizzas = (state = initialState, action) => {

    switch (action.type) {
        case 'SET_PIZZAS':
            return {
                ...state,
                items: action.payload,
                // в "action.payload" у нас будет храниться массив всех пицц
    
                isLoaded: true
            }
    
        case 'SET_LOADED':
        // если пришёл экшен "SET_LOADED", то тогда нужно "isLoaded" поменять на то, что указано в "payload"
        // то есть то, что мы передаём в "SET_LOADED", то и будет пихаться в "isLoaded"
            return {
                ...state,
                isLoaded: action.payload
            }

        default:
            return state;
        // если же ничего не нужно менять, то верни старые значения
    }
};


export default pizzas;