'use client';

import React, { useEffect, useState }  from "react";
import { MdDelete, MdEdit } from "react-icons/md";

interface tasks {
    id: number,
    value: string,
    completed: boolean,
}

const Todo =()=> {
    const [userInput, setUserInput] = useState('');
    const [list, setList] = useState<tasks[]>([]);
    const [editIndex, setEditIndex] = useState(null); // Track index of item to edit

    useEffect(() => {
        const list = localStorage.getItem("list");
        if (list) {
          setList(JSON.parse(list));
        }
      }, []);

    // Set a user input value
    const updateInput = (value:any) => {
        setUserInput(value);
    };

    // Add or edit item
    const handleAction = () => {
        if (userInput.trim() === '') return; // Avoid adding empty items

        if (editIndex !== null) {
            // Edit existing item
            const updatedList = list.map((item, index) =>
                index === editIndex ? { ...item, value: userInput } : item
            );
            setList(updatedList);
            setEditIndex(null); // Reset edit mode
        } else {
            // Add new item
            const newItem = {
                id: Math.random(), // Consider using a more reliable ID generator
                value: userInput,
                completed:false
            };
            setList([...list, newItem]);
            localStorage.setItem("list", JSON.stringify([...list, newItem]));

        }

        setUserInput(''); // Clear input field
       
    };

    // Function to delete item from list using id to delete
    const deleteItem = (id:number) => {
        const updatedList = list.filter((item) => item.id !== id);
        setList(updatedList);
        localStorage.setItem("todos", JSON.stringify(updatedList));

    };

    // Function to enable editing mode
    const startEdit = (index:any) => {
        setUserInput(list[index].value);
        setEditIndex(index); // Set the index of the item to be edited
    };
    const updateTask = (id: number) => {
        const newTodos = list.map((t) => {
          if (t.id === id) {
            t.completed = !t.completed;
          }
          return t;
        });
        setList(newTodos);
        localStorage.setItem("todos", JSON.stringify(newTodos));

      };

    return(
        <div className="flex flex-col mx-auto justify-center rounded-md my-5 p-6 w-3/4 bg-white/30">
            <div className="flex  justify-center">
                <input type="text"
                 placeholder="Enter task..."
                value={userInput}
                onChange={(e) => updateInput(e.target.value)}
                 className="px-2 w-full p-3 rounded-sm outline-none bg-white/70"
           
                />
                <button onClick={handleAction} 
                className="p-3  text-white
                 bg-teal-900">{editIndex !== null ? 'Update' : 'Add'}</button>
            </div>
              
                <div className="py-4">
                {list.length > 0 ? (
                    list.map((item, index) => (
                        <div
                            key={item.id} className="flex justify-between w-full my-2 bg-white/50 font-bold text-center p-4 rounded-md text-teal-800">
                            <div className="flex">
                                <input
                                    type="checkbox"
                                    className="my-auto mr-2"
                                    checked={item.completed}
                                    onChange={() => {
                                        updateTask(item.id)
                                    }}
                                />
                                <p className={`${item.completed ? 'line-through' : ''}`}>{item.value}</p>
                            </div>
                            <div className="flex text-xl text-teal-950">
                            <MdEdit className='mx-4' onClick={() => startEdit(index)} />
                            <MdDelete onClick={() => deleteItem(item.id)} />
                            </div>
                        </div>
                    ))
                ) : (
                    <div>
                        <h2 className="w-full bg-white/20 font-bold text-center p-4 rounded-md text-teal-800">NO TASK</h2>
                    </div>
                )}
            </div>
              
               </div>
      
      
    )
}

export default Todo;
