import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from "axios";

import Create from './components/todos/Create';
import Index from './components/todos/Index';

function App() {
  const [todos, setTodos] = useState([
    /*{ description: 'Create main folder', status: 'pending'},
    { description: 'Move to main folder', status: 'pending' },
    { description: 'Start npm in the folder2', status: 'pending' }*/
  ])
useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:5000/');
      setTodos(result.data.tasks);
      console.log(result.data.tasks);
    };
    console.log("fetch done ");
    fetchData();
  }, []);
  /*const fetchData = async() =>{
    const result = axios.get(``);
    console.log("results: "+result)
  }*/
  const getData = async () => {
      const result = await axios.get('http://localhost:5000/');
      setTodos(result.data.tasks);
      console.log(result.data.tasks);
    };
  const addTodo = async (description) => {
    let cTodos = Object.assign([], todos);
    cTodos.push({description: description, status: 'pending'});
    const result = await axios.post('http://localhost:5000/tasks',{description});
    setTodos(cTodos);
    getData();
  }
  const markDelete = async (task)  =>{
    let cTodos = Object.assign([], todos);
    cTodos[task].status = 'delete';
  console.log("FinishID "+cTodos[task].id);
    const result = await axios.post('http://localhost:5000/delete/'+cTodos[task].id);
    setTodos(cTodos);
  }
  const markAsDone = async (task) => {
    let cTodos = Object.assign([], todos);
    cTodos[task].status = 'done';
    console.log("FinishID "+cTodos[task].id);
    const result = await axios.patch('http://localhost:5000/mierda/'+cTodos[task].id);
    setTodos(cTodos);
  }

  return (
    <div className="App"> 
      <Create addTodo={addTodo}/>
      <Index todos={todos} markDelete={markDelete} markAsDone={markAsDone} />
    </div>
  );
}

export default App;
