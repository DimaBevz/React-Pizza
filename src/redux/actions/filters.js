// эта ф-я будет получать какое-то значение.
// это значение будет передавать уже в этот объект.
// в этом объекте объясняет, что есть тип 'SET_SORT_BY' и
// значение в этом объекте "popular, price, alphabet"

// Action Creator
export const setSortBy = ({ type, order }) => ({
    type: 'SET_SORT_BY',
    payload: { type, order }
});

// Action
// export const setSortBy = ({
//     type: 'SET_SORT_BY',
//     payload: name
// });


export const setCategory = (catIndex) => ({
    type: 'SET_CATEGORY',
    payload: catIndex
});

