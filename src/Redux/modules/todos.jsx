// 예상기매니저님의 6월 4일자 강의 코드
// 가볍게 CRD 손풀기로 시작할때 Go

// action type
const ADD_TODO = "todos/ADD_TODO"
const DELETE_TODO = "todos/DELETE_TODO"

const GET_TODOS = 'todos/GET_TODOS'

// action creator
export const addTodo = (payload) =>({type: ADD_TODO, payload});
export const deleteTodo = (payload) =>({type: DELETE_TODO, payload});
const getTodos = (payload) => ({type: GET_TODOS, payload});

// history - 이런 라이브러리가 있다
export const __getTodos =  () =>  async(dispatch, getState) =>{
    // 내가 하고싶음 작업 (서버에서 todos 불러오기)
    const data = await (
        await fetch("https://jsonplaceholder.typicode.com/todos?_page=1")
    ).json();
    // 이어서 dispatch
    dispatch(getTodos(data));
    
}

const initialState = {
    todos:[],
};

//reducer
const todos = (state = initialState, {payload, type}) => {
    //console.log(type)
    switch(type){
        case ADD_TODO:
            return{
                ...state, // 불변성을 위해?
                todos: [
                    ...state.todos, 
                    {id: state.todos.length+1,title: payload}
                ]
            };
        case DELETE_TODO:
            return {
                ...state, // 불변성을 위해?
                todos: state.todos.filter((todo)=>{
                    return todo.id !== payload;
                })
            };

        case GET_TODOS:
            return {
                ...state, todos: payload,
            }
        default:
            return state;
    }
}

export default todos;