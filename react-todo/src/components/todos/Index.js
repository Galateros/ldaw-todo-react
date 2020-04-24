import React, { useState } from 'react';

const Index = ({todos, markDelete, markAsDone}) => {
    const handleMarkDelete = (event, index)=>{
      markDelete(index);
    }
    const handleMarkAsDone = (event, index) => {
        markAsDone(index);
    }
    
    return (
    <table border="1">
      <tbody>
        {todos.map((todo, i) => {
          return (
            <div style={{display: todo.status === 'delete' ? 'none' : 'block'}}>
            <tr key={i} style={{backgroundColor: todo.status === 'pending' ? 'green' : 'grey'}}>
              <td>#{i}</td>
              <td>{todo.description}</td>
              <td>
                {todo.status == 'pending' && (
                  <input type="button" value="terminado?" onClick={(event) => handleMarkAsDone(event, i)}/>
                )}
              </td>
              <td>
                <input type="button" value="Eliminar?" onClick={(event) => handleMarkDelete(event, i)}/>
              </td>
            </tr>
            </div>
          )
        })}
      </tbody>
    </table>
  );
}

export default Index;
