import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Categories, SortPopup, PizzaBlock } from '../components';
import { setCategory, setSortBy } from '../redux/actions/filters';
import { fetchPizzas } from '../redux/actions/pizzas';

import { LoadingBlock } from '../components';


// так как у нас в проекте не будет меняться этот массив, то можем вынести его в константы
// теперь у нас в "items" всегда будет храниться одна и та же ссылка, даже если у нас "Home", 
// то ссылка на "category" всегда одна и та же
const categoryNames = [
  'Мясные',
  'Вегетарианские',
  'Гриль',
  'Острые',
  'Закрытые'
];
const sortItems = [             
  {name: 'популярности', type: 'popular', order: 'desc'},
  {name: 'цене', type: 'price', order: 'desc'},
  {name: 'алфавиту', type: 'name', order: 'asc'}];


function Home() {

  // const { items } = useSelector(({ pizzas }) => {
  //   return {
  //     items: pizzas.items,
  //   }
  // });

  const dispatch = useDispatch();

  // так как мы не передаём объект, нам не нужно писать деструктуризацию и оттуда вытаскивать свойство "items"
  // в этой переменной булет храниться массив, который будет тут "pizzas.items"
  // useSelector выполнил эту ф-и: из стейта вытащил "pizzas" и вернул массив
  const items = useSelector(({ pizzas }) => pizzas.items);

  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
  const { category, sortBy } = useSelector(({ filters }) => filters);

  // React.useEffect(() => {
  //   axios.get('http://localhost:3001/pizzas').then(({ data }) => {
  //     // отправляем  экшен в редакс
  //     dispatch(setPizzas(data));
  //     // этот диспатч должен выполняться после этого ГЕТ запроса. 
  //     // то есть, когда у нас произойдёт первый рендер "[]", отправь на сервер этот запрос (по этой ссылке).
  //     // дождись получения данных и когда они будут плучены, выполни ф-ю и потом вызови диспатч.
  //     // диспатч должен передаёт "setPizzas" (он передаёт объект), далее эта ф-я получает все пиццы, создаёт объект
  //     // и этот объект передаёт диспатч и диспатч уже это всё передаёт внутрь редакса...
  //   });
  // }, []);

  // теперь нас запрос находится в "pizzas" (actions). У нас там асинхронная ф-и и потому мы юзали "redux-thunk"
  React.useEffect(() => {
    dispatch(fetchPizzas(sortBy, category));
  }, [category, sortBy]);


  // оборачиваем в "useCallback", при этом когда ты её создашь один раз при первом рендере, больше её не меняй
  const onSelectCategory = React.useCallback((index) => {
    dispatch(setCategory(index))
  }, []);

  // ф-я получает название типа, которое будет менять
  // получает тип и будет передавать его в редакс
  const onSelectSortType = React.useCallback((type) => {
    dispatch(setSortBy(type))
  }, []);


    return (
        <div className="container">
          <div className="content__top">
        
            <Categories onClickCategory={onSelectCategory}
                        activeCategory={category}
                        items={categoryNames}/>

          <SortPopup items={sortItems}
                     activeSortType={sortBy.type}
                     onClickSortType={onSelectSortType}/>
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">

            {/* если "isLoaded" - true, то отобрази этот массив (который мы берём из редакса) 
                если же у нас "false", то мы отображаем загрузку */}
            {isLoaded 
              ? items.map((obj) => 
              <PizzaBlock key={obj.id} isLoading={true} {...obj} />) 
              : Array(10)
                .fill(0)
                .map((_, index) => ( <LoadingBlock key={index}/> ))}
              {/* вместо "_" будут 0 */}

            {/* создать 10 элементов и заполнить их вот этим вот компонентом */}
            {/* {Array(10).fill(<LoadingBlock/>)} */}

          </div>
        </div>
    )
}

export default Home;
