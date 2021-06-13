import React, { useState } from 'react';
import { Table, Button, CustomInput, Label, FormGroup, Input } from 'reactstrap';
import { gql, useQuery } from '@apollo/client';
import './App.css';
import Detail from './detail';

const ALL_TODO = gql`
query {
  getTodoList{
    id,
    createdAt,
    isDone,
    type,
    text,
    title
  }
}
`
const changeStatut = (statut) => {
  console.log(statut)
}






const Liste = ({ result }) => {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);

const toggle = (todo) => {
  setModal(!modal);
  setData(todo);
}

const filterMode = (data) => {
  console.log(data)
}
  return (
    <div className="container">
      <div className="row">
      <div className="col-md-4 d-flex">
      <p>Filtrer par</p>
        <Button className="ml-4" onClick={()=>filterMode("createdAt")} color="primary">Date</Button>
        <Button className="mr-2" onClick={()=>filterMode("isDone")} color="secondary">Statut</Button>
        <Button className="mr-2" onClick={()=>filterMode("type")} color="info">Type</Button>
        </div>
      </div>
      <Table hover>
        <thead>
          <tr>
            <th scope="col">Titre</th>
            <th scope="col">Type</th>
            <th scope="col">Date création</th>
            <th scope="col">Statut</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {result.data.getTodoList.map((todo) => (
            <tr key={todo.id}>
              <th scope="row">{todo.title}</th>
              <td>{todo.type}</td>
              <td>{todo.createdAt}</td>
              <td>
                {todo.type === "Marketing" || todo.type === "Communication" ?
                  todo.isDone ? 
                  <CustomInput type="switch" value={todo.isDone} onClick={()=>changeStatut(todo.isDone)} name="isDone" label="" checked/> : 
                  <CustomInput type="switch" value={todo.isDone} onClick={()=>changeStatut(todo.isDone)} name="isDone" label="" />
                  : null
                }
              </td>
              <td> <Button color="primary" onClick={()=>toggle(todo)}>voir</Button></td>
            </tr>
          ))}
          {modal ? <Detail modal={modal} result={data}/> : null}
        </tbody>
      </Table>
    </div>
  )
}

const App = () => {
  const result = useQuery(ALL_TODO)

  return (
    <div className="mt-4 mb-4 App">
      <h1>Todo list</h1>
      <div className="App">
        {result.data ?
          <Liste result={result} />
          :
          <div>
            <p>La liste est vide</p>
          </div>
        }

        
      </div>
    </div>
  );
}

export default App;
