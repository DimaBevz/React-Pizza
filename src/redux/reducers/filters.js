// тут иннициализируемые значения, то есть
// на момент первого создания(вызова) редьюсера "filters"
// мы будем пихать в "state" "initialState"
const initialState = {
    category: null, // у нас это храниться в виде индекса
    sortBy: { 
      type: 'popular',
      order: 'desc'
    }
};


// идёт проверка, что если пришло действие 'SET_SORT_BY', 
// то тогда возьми все старые значения из стейта, 
// и замени свойство "sortBy" на новое значение то, 
// что хранится в "payload".
// при первом вызове "state" будет хранить "initialState", 
// потом уже в дальнейшем "state" будет меняться

const filters = (state = initialState, action) => {
    if (action.type === 'SET_SORT_BY') {
      return {
        ...state,
        sortBy: action.payload,
      };
    }
    if (action.type === 'SET_CATEGORY') {
      return {
        ...state,
        category: action.payload,
      };
    }
    return state;
  };

export default filters;