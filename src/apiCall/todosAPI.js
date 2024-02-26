
export async function getTodos(){
    console.log("get called");
    const res = await fetch("http://localhost:3001/");
    const data=await res.json();
    return data;
 
  }

export async function deleteTodos(id){
    console.log("delete called"+id);
    try{
      const res = await fetch(`http://localhost:3001/delete/${id}`,{
        method:"DELETE"
      });
      const data=await res.json();
      return res;
    } catch(error){
      console.log(error);
    } 
  }

export async function addTodos(data){
    const passData = {todo:data};
    console.log("called API");
   
    try{
      const res = await fetch("http://localhost:3001/add",{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(passData),
      });
      const data= await res.json();
      return res;
    } catch(error){
      console.log(error);
    } 
   
  }


  export async function updateTodo(data){
    const passData = {todo:data.todo,done:data.done,id:data.id};
   console.log("entered update");
    try{
      const res = await fetch("http://localhost:3001/update/"+passData.id,{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(passData),
      });
      const data= await res.json();
      return res;
    } catch(error){
      console.log(error);
    } 
   
  }

  
