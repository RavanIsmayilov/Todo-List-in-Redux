import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateList } from "../../redux/action/action";

function EditForm({id,initialValue,onCancel}) {
    const [editValue,setEditValue] = useState(initialValue)
    const dispatch = useDispatch()

    const handleUpdate = async (e) => {
        e.preventDefault()
        if(!editValue.trim())
        return

    try {
        await axios.put(`http://localhost:3000/users/${id}`, {
        name:editValue
        })
        dispatch(updateList({id,name:editValue}))
        onCancel()
        
    } catch (error) {
        console.log("Error updating data",error);
    }
    }

    return(
        <form onSubmit={handleUpdate}>
            <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)}/>
            <button type="submit">Update</button>
            <button type="button">Cancel</button>
        </form>
    )
}

export default EditForm

