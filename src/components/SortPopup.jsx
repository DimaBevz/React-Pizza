import React from 'react';
import PropTypes from 'prop-types';


const SortPopup = React.memo(function SortPopup({ items, activeSortType, onClickSortType }) {

    const [visiblePopup, setVisiblePopup] = React.useState(false);

    // пояснение "useRef" в конспекте. 
    // эта ф-я нужна для скрытия попап если клик был вне окна меню
    const sortRef = React.useRef(); 

    // берём находим какой-то один объект и вытаскиваем "name" 
    const activeLabel = items.find((obj) => obj.type === activeSortType).name;


    // эта ф-я нужна для оптимизации. Чтобы эта вот переменная хранила ссылку на одну и ту жу ф-ю
    // и при ререндере, когда будет происходить апдейт компонента реакт будет понимать, что ссылка на эту ф-ю не изменилась
    // и лишний ререндер не будет происходить
    const toggleVisiblePopup = () => {
        setVisiblePopup(!visiblePopup)
    };

    const handleOutsideClick = (e) => {

        // если в пути не содержиться ссылки на нужный блок, то закрой Попап 
        // если же произойдёт клик в области окна, то эта часть выполняться не будет
        if(!e.path.includes(sortRef.current)) {
            setVisiblePopup(false);

            // console.log('outside');
        }
    };


    // контролирует отображение и скрытие поп-апа
    const onSelectItem = (index) => {
        onClickSortType(index);

        // скрываем блок после выбора категории
        setVisiblePopup(false);
    };

    React.useEffect(() => {
        document.body.addEventListener('click', handleOutsideClick)
    }, []);


    return (
        <div ref={sortRef} className="sort">
            {/* ref={(ref) => {
                sortRef.current = ref;
            }} */}

            <div className="sort__label">
            <svg className={visiblePopup ? 'rotated' : ''}
                 width="10"
                 height="6"
                 viewBox="0 0 10 6"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg"
            >
                <path5
                d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                fill="#2C2C2C"
                />
            </svg>
            <b>Сортировка по:</b>

            {/* ставь "true" или "false" на "visiblePopup" */}
            <span onClick={toggleVisiblePopup}>{activeLabel}</span>

            </div>
            { visiblePopup && (
                <div className="sort__popup">
                    <ul>
                        {
                            items &&
                                items.map((obj, index) =>(
                                    <li onClick={() => onSelectItem(obj)}
                                    // obj.type - урок 8 (1:57:30)
                                        className={activeSortType === obj.type ? 'active' : ''}
                                        key={`${obj.type}_${index}`}>
                                            
                                            {obj.name}
                                        </li>
                                ))
                        }
                    </ul>
                </div>
            )}
        </div>
    )
});


SortPopup.propTypes = {
    activeSortType: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClickSortType: PropTypes.func.isRequired
};

SortPopup.defaultProps = {
    items: [],
}

export default SortPopup;
