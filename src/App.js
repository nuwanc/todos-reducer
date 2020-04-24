import React , { useReducer } from "react";
import "./styles.css";

let id = 0;

function init(todos) {
  return { todos };
}

function reducer(state, action) {
  let todos = [];
  let id = null;
  switch (action.type) {
      case 'add':
          const {todo} = action.payload;
          todos = [...state.todos,todo];
          return { todos };
      case 'remove':
          id = action.payload.id;
          todos = state.todos.filter((todo) => todo.id !== id)
          return { todos };
      case 'check' : 
          id = action.payload.id;
          const checked = action.payload.checked;
          todos = state.todos.map((todo) => {
            if ( todo.id === id) {
              todo.checked = checked;
              return todo;
            } else {
              return todo;
            }
          })
          return { todos };
      case 'reset':
          todos = action.payload;
          return init(todos);
      default:
          throw new Error();
  }
}

export default function App() {
  const [state,dispatch] = useReducer(reducer,[],init);

  const addTodo = () => {
    const text = prompt('Enter your todo:');
    id ++;
    let todo = {};
    todo.text = text;
    todo.id = id;
    todo.checked = false;

    dispatch({type : 'add', payload : {todo} });
  }

  return (
    <div className="App">
      <button onClick={addTodo} >Add Todo</button>
      <div><span>Total Number of Todos:{state.todos.length}</span> <span>Unchecked Todos:{state.todos.filter(todo => !todo.checked).length}</span></div>
      {state.todos.map(todo => <Todo key={todo.id} todo={todo} dispatch={dispatch} />)}
    </div>
  );
}

const Todo = ({todo,dispatch})=> (
  <div>
    <input type="checkbox" onChange={e=>dispatch({type : 'check', payload : { id : todo.id , checked : e.target.checked}})} checked={todo.checked}/>
    <span>{todo.text}</span>
    <button onClick={e=>dispatch({type : 'remove', payload : { id : todo.id}})}>x</button>
  </div>
)

