import React from 'react';
import PropTypes from 'prop-types';


// пишем так, чтобы "Categories" не делал ререндер и проверял, что нужно ему делать ререндер или же нет
const Categories = React.memo(function Categories({activeCategory, items, onClickCategory}) {
  // console.log(items);

  return (
      <div>
          <div className="categories">
            <ul>
              <li className={activeCategory === null ? 'active' : ''}
                  onClick={() => onClickCategory(null)}>Все</li>
              {
                items && // пояснение в конспекте
                
                  // нужно добавлять "key" иначе будет ошибка, а он уникализирует каждый новый создаваемый элемент
                  // просто передавать "index" нельзя ибо реакт может не понять, что нужно перерендерить
                  items.map( (name, index) => ( <li className={activeCategory === index ? 'active' : ''}
                                                    onClick={() => onClickCategory(index)}
                                                    key={`${name}_${index}`}>{name}</li> ))
              }
            </ul>
          </div>
      </div>
  )

});


// описываем какие пропсы передавать в компонент и какой тип у них может быть
Categories.propTypes = {
  // activeCategory: PropTypes.oneOf([PropTypes.number, null]),
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickCategory: PropTypes.func.isRequired,
};

Categories.defaultProps = { activeCategory: null, items: [] };


export default Categories;
