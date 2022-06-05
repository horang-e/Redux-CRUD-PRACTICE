// import React, {useEffect, useState} from "react";
// import { useDispatch, useSelector } from "react-redux";
// import styled from "styled-components";
// import {addTodo, deleteTodo, __getTodos} from './Redux/modules/todos'

// // Mock 

// function App() {
//   console.log("rendered at first")
//   const dispatch = useDispatch(); // 변수 - memo
//   const todos = useSelector(state=>state.todos.todos);
//   const [todoTitle, setTodoTitle] = useState("");

//   const addTodoHandler = () =>{ // 함수 - callback
//     dispatch(addTodo(todoTitle))
//   }

//   const deleteTodoHandler = (id) => {
//     dispatch(deleteTodo(id))
//   };

//   useEffect(()=>{
//     dispatch(__getTodos());
//     console.log("rendered because of useEffect")
//     return () =>{
//       console.log("bye bye")
//     }
//   },[dispatch])
//   return (
//     <>
//       <Header>
//         <div>투두 리스트</div>
//         <div>
//           <input 
//             type="text" 
//             onChange={(event)=>{
//               setTodoTitle(event.target.value)
//           }}/>
//           <button onClick={addTodoHandler}>추가하기</button>
//         </div>
//       </Header>
//       <Container>
//       {
//         todos.map((todo)=>(
//           <Card key={todo.id}>
//             <div>{todo.id}</div>
//             <div>{todo.title}</div>
//             <button onClick={()=>deleteTodoHandler(todo.id)}>삭제 버튼</button>
//           </Card>
//         ))
//       }
//       </Container>
//     </>
//   );
// }

// export default App;

// const Header = styled.header`

// `;

// const Container = styled.div`
//   display: flex;
//   gap: 12px;
//   border: 1px solid black;
//   padding: 50px;
// `;

// const Card = styled.div`
//   border: 1px solid black;
//   border-radius: 8px;
//   width: 100px;
//   height: 100px;
// `;

import React from "react";
import {Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import Detail from './Pages/Detail'
import Update from './Pages/Update'
import Create from './Pages/Create'

// Mock 

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/detail/:id/:num" element={<Detail />}/>
        <Route path="/create" element={<Create />}/>
        <Route path="/update/:id/:num" element={<Update />}/>
      </Routes>
      
    </div>
  )
}
