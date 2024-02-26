import { useState } from "react";

function DisplayTodo(props){
    const [editTodo,setEditTodo] = useState({todo:props.todo,id:props.id,done:props.done});
    const [editHidden,setEditHidden] = useState(false);
    const [doneHidden,setDoneHidden] = useState(true);
    const [checked,setChecked] = useState(props.done);

    function handleEdit(event){
        const {value,name} = event.target;
        
        setEditTodo((prev)=>{
            return{ ...prev,
             [name]:value}
            }
       )
        setEditHidden(true);
        setDoneHidden(false);
    }

    function updateCheckBoxChange(event){
        const checked = event.target.checked;
        setChecked(checked);
        
        setEditTodo((prev)=>{
            return (
                {
                    ...prev,
                    done:checked
                }
            )
        })
        props.update({...editTodo,done:checked});
    }

    function updateData(){
        setEditHidden(false);
        setDoneHidden(true);

        props.update(editTodo);

    }
    return (
        <div className="listElemet">
       
        <input type="checkbox" name="done" checked={checked} value={checked} onChange={updateCheckBoxChange} className="checkbox"/>
        <input type="text" placeholder="" value={editTodo.todo} onChange={handleEdit} name="todo" readOnly={!editHidden} className="diplayItem"/>
        <button onClick={handleEdit} value="edit" hidden={editHidden}><img src="../images/editButton.png"/></button>
        <button onClick={updateData} hidden={doneHidden} name="editDone"><img src="../images/doneButton.png"/></button>
        <button onClick={()=>{
            props.deleteTodo(props.id);
        }} className="deleteButton"><img src="../images/deleteButton.png"/></button>
        </div>
    )
}

export default DisplayTodo;