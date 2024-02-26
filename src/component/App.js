import { useEffect, useState} from "react";
import DisplayTodo from "./DisplayTodo";
import { getTodos,addTodos,deleteTodos,updateTodo} from "../apiCall/todosAPI";

function App() {

  const [todos,setTodos] = useState([]);
  const [addToTodo,setAddToTodo] = useState("");

  useEffect(()=>{

    const todoList = async()=>{
      const res = await getTodos();
      setTodos(res);
    }
    
    todoList();

  },[])


  async function addTodo(){
      const res = await addTodos(addToTodo);
      setAddToTodo("");
      if(res.ok){
        const res = await getTodos();
        setTodos(res);
      }

  }

  async function update(data){
    console.log(data);
    const res=await updateTodo(data);
    if(res.ok){
      setTodos((prev)=>{
        if(prev.id===data.id){
          prev.todo=data.todo;
          prev.done=data.done;
        }
        return prev;
      })
    }
  }

  async function deleteTodo(id){
      const res=await deleteTodos(id);
      if(res.ok){
        setTodos(todos.filter((todo)=>todo.id!==id));
      }
  }

  function handleChange(event){
        const value = event.target.value;
        setAddToTodo(value);
  }

  return (
    <div>
      <header>
        <h1>TodoList</h1>
      </header>
      <div className="todoList">
         <div className="addTodo">
          <input placeholder="ADD TODO" type="text" onChange={handleChange} name="newTodo" value={addToTodo}/>
          <button onClick={addTodo}>ADD</button>
         </div>
         <div>
          <ul style={{listStyle:"none",padding:"0px"}}>
            {todos.map((todo)=>(     
            <li key={todo.id}>
                <DisplayTodo 
                todo = {todo.todo}
                done = {todo.done}
                id = {todo.id}
                deleteTodo = {deleteTodo}
                update={update}
                  />
              </li>
            ))}
          </ul>
         </div>
       
      </div>

    </div>
  );
}

export default App;
