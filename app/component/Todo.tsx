"use client";

import { useForm } from "react-hook-form";
import { useTodoStore } from "../store/TodoStore";
import {  FiEdit } from 'react-icons/fi';
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useState } from "react";

function Todo() {
  const { todo, addTodo ,removeTodo,updateTodo} = useTodoStore();
  const { register, handleSubmit, reset ,formState: { errors },setValue} = useForm();
  const [editing,setEditing]=useState(null)
  const MAX_TODO_LIMIT = 10;
  
  const onSubmit = (data:any) => {
    if (editing) {
      updateTodo(editing, data.text);
      setEditing(null);
    } else if (todo.length < MAX_TODO_LIMIT) {
      addTodo(data.text);
    } else {
      alert("Todo limit exceeded!complete ur list and then add new (Max 10)");
    }
    reset();
  };
  const handleEdit = (id:any, text:string) => {
    setEditing(id);
    setValue('text', text);
  };

  return (
    <div>
      <div>
        <div className="flex justify-center mt-6 ">
          <h1 className=" font-bold text-2xl ">TODO List</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center translate-y-32">
            <input
              className=" border rounded-md p-2 font-medium"
              {...register("text",{required:"Enter your Todo list",maxLength:{value:50,message:"max 50 characters"}})}
              type="text"
              id="text"
              placeholder="Enter ToDo program"
              autoFocus
            />

            <button
              className="translate-x-6 border-2 border-white rounded-xl px-4 bg-slate-200 hover:bg-slate-50 hover:border-black font-semibold shadow-sm"
              type="submit"
            >
              Add
            </button>
          </div>
          {errors.text &&<p className="text-red-600 flex justify-center translate-y-32 -translate-x-12">{errors.text.message}</p>}
        </form>

<div className=" flex justify-center translate-y-44">
        <ul>
          {todo.map((item) => (
            <li className="m-2" key={item.id}>{item.id} : {item.text} 
            
           <button className="translate-x-6"onClick={() => handleEdit(item.id, item.text)}> <FiEdit/> </button> 
           <button className="translate-x-10" onClick={() => removeTodo(item.id)}> <RiDeleteBin2Fill/> </button>
            </li>
            
          ))}
        </ul>
        </div>
      </div>
   
    </div>
  );
}

export default Todo;
