import React, { useEffect, useState } from 'react';
import './App.css';
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { TiTickOutline } from "react-icons/ti";
import { FaListAlt } from "react-icons/fa";

function App() {

  const localList = localStorage.getItem("items")

  const [task, setTask] = useState('')
  const [items, setItems] = useState(localList ? JSON.parse(localList) : []);
  const [editItemId, setEditItemId] = useState(0);
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items))
  }, [items])

  function clearList(){
    localStorage.clear();
    setItems([])
  }


  function addTasks(e) {
    e.preventDefault()
    const repeteadItem = items.find(item => item.value === task)

    if (task === '' || repeteadItem) {
      setTask("")
      return;
    }


    setItems(prev => [{
      id: new Date().getTime().toString(),
      value: task,
      status: false
    }, ...prev])

    setTask('')

  }

  function deleteItems(id) {
    const filteredItems = items.filter(item => item.id !== id)
    setItems(filteredItems)
  }

  function updateItems(id, value) {
    setTask(value)
    setEditItemId(id)
    setIsEdit(true)
  }


  function editItems(e) {
    e.preventDefault();

    const compItem = items.find(item => item.id === editItemId)
    if (task === "")
      return;

    const finalItemList = items.map(item => {
      if (item.id !== editItemId)
        return item;
      else
        return {
          ...compItem,
          value: task
        }
    })

    setItems(finalItemList)
    setIsEdit(false)
    setTask('')
  }

  function completeItems(id) {
    const compItem = items.find(item => item.id === id)
    const finalItemList = items.map(item => {
      if (item.id !== id)
        return item;
      else
        return {
          ...compItem,
          status: !item.status
        }
    })

    setItems(finalItemList)

  }


  const itemList = items.map(item => {
    return <div className=' max-w-fit my-2' key={item.id}>
      <div className={!item.status ? ' border-4 min-w-full rounded-2xl px-4 py-2 text-base  bg-yellow-300 border-yellow-400 ' : 'border-4 min-w-full rounded-2xl px-4 py-2 text-base text-yellow-50 line-through  bg-green-500 border-green-500 '}>
        {item.value}
      </div>
      <div className=' flex justify-around mt-3 '>
        <AiOutlineDelete className='hover:scale-110 cursor-pointer text-2xl mx-3 ' onClick={() => deleteItems(item.id)} />

        <FiEdit className=' hover:scale-110 text-2xl cursor-pointer mx-3' onClick={() => { updateItems(item.id, item.value) }} />

        <TiTickOutline className='hover:scale-110 text-2xl cursor-pointer mx-3' onClick={() => { completeItems(item.id) }} />
      </div>
    </div>
  })

  return (
    <main className="App min-h-screen bg-teal-600  sm:w-3/4 md:w-1/2 m-auto ">
      <section className='min-h-full'>
        <h1 className='text-6xl py-5'>Add your items here <FaListAlt className=' inline-block' /></h1>
        <form onSubmit={isEdit ? editItems : addTasks}>
          <input
            type='text'
            placeholder='Enter task'
            onChange={e => setTask(e.target.value)}
            value={task}
            autoComplete="off"
            className='  w-3/4 mt-5 rounded-lg p-3 text-2xl'
          />
          <div className=' flex justify-center'>
          <button className=' mb-5  border-black border-4 text-lg text-yellow-50 bg-black px-10 py-5 rounded-lg shadow-2xl mt-5'>{isEdit ? "Edit" : "Add"}</button>
          <button onClick={clearList} className=' mb-5 mx-5  border-black border-4 text-lg text-yellow-50 bg-teal-700 px-10 py-5 rounded-lg shadow-2xl mt-5'>Clear</button>
          </div>
        </form>
      </section>
      <section className='flex flex-col justify-center items-center'>
        {itemList}
      </section>
    </main>
  );
}

export default App;
