import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addList, getList, removeList } from "./redux/action/action";
import EditForm from "./components/editForm/edit";


function App() {
    const [inputValue,setInputValue] = useState("")
    const [editId,setEditId] = useState(null)
    const list = useSelector((state) => state.listReducer.list)
    const dispatch = useDispatch()

    const fetchData = async () => {
      try {
        const reponse = await axios.get(`http://localhost:3000/users`)
        dispatch(getList(reponse.data))
        
      } catch (error) {
        console.log("Error fetching data",error);
      }
    }

    const handleAdd = async (e) => {
      e.preventDefault();
        if(!inputValue.trim())
        return
        setInputValue("")

      try {
        const response = await axios.post(`http://localhost:3000/users`,{
          id:(list.length + 1).toString(),
          name: inputValue
        })
        dispatch(addList(response.data))
        
      } catch (error) {
        console.log("Error adding data",error);
        
      }
    }


    const handleEdit = (id) => {
      setEditId(id)
    }


    const handleRemove = async (id) => {
      try {
        await axios.delete(`http://localhost:3000/users/${id}`)
        dispatch(removeList(id))

      } catch (error) {
        console.log("Error removing data",error);
      }
    }


    const handleCancelEdit = () => {
      setEditId(null)
    }

    useEffect(() => {
      fetchData();
    },[])





  return (
   <div className= "container">
    <h1>TODO-LIST</h1>
    <form onSubmit={handleAdd}>
      <input type="text" placeholder="Enter your list" value={inputValue} onChange={(e) => setInputValue(e.target.value) }/>
      <button type="submit">ADD</button>
    </form>

    {list.map((item) => (
      <div key={item.id} className="list-item">
        {editId === item.id ? (<EditForm id={item.id} initialValue={item.name} onCancel={handleCancelEdit}/>) : (
          <>
          <span>{item.name}</span>
          <div>
            <button className="edit-button" onClick={() => handleEdit(item.id)}>Edit</button>
            <button className="remove-button" onClick={() => handleRemove(item.id)}>Remove</button>
          </div>
          </>
        )}
        </div>
    ))}
    </div>
  );
}

export default App;
