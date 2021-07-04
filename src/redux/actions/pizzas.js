import axios from 'axios';


// эта ф-я будет передавать в наш редьюсер "pizzas" true или false, который будет менять статус загрузки
export const setLoaded = (payload) => ({
  type: 'SET_LOADED',
  payload
});

export const fetchPizzas = (sortBy, category) => (dispatch) => {
  // когда "fetchPizzas" будет выполняться, до того как выполнится этот "axios" запрос, делаем
  // dispatch(setLoaded(false));
  // а когда "setPizzas" выполнится, то ставится "true"
  // то есть не важно флаг "isLoaded" true или false, мы в любом случае говорим, что если вызывается ф-я "fetchPizzas", 
  // сразу же ставь "setLoaded(false)", не важно стоит в флаге true или false

  dispatch({
    type: 'SET_LOADED',
    payload: false
  });

  // и потом уже, когда запросс выполнится и всё будет хорошо , выполняется второй экшен "setPizzas"
  // он сохраняет пиццы и ставит флаг о том, что всё загружено
  axios
    .get(
      `http://localhost:3001/pizzas?${
        category !== null ? `category=${category}` : ''
      }&_sort=${sortBy.type}&_order=${sortBy.order}`,
    )
    .then(({
      data
    }) => {
      // отправляем  экшен в редакс
      dispatch(setPizzas(data));
    });

}

// эта ф-я должна взять массив пиц и создать объект.
// этот объект будет "type: 'SET_PIZZAS'" и получать 
// "payload" с массивом пиц
export const setPizzas = (items) => ({
  type: 'SET_PIZZAS',
  payload: items
});