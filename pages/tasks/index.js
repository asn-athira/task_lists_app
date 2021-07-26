import React, {useState, useEffect} from 'react';
import classes from './task.module.css';
import Link from 'next/link';
import { baseURL } from '../../config';
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 


function Tasks() {
  //const baseURL = "http://localhost:8080"
  const [data, setData] = useState([]); 
 

  useEffect(() => {
         fetch(`${baseURL}/api/tasks`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
          }
      })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
       }, []);

      const deleteTask = (id) => {
        fetch(`${baseURL}/api/tasks/${id}`, {
              method: "DELETE",
              
              body: JSON.stringify(id)
          })
          .then(res => res.json())
      .then(response => {
        if (!!response.error) {
          alert(response.error)
        } else {
          alert("Deleted successfully")
          window.location = "/tasks"
        }
      })

          
      }

  
  return (
    <div className={classes.taskcontainer}>
      
      <table className={classes.table}>
        <thead className={classes.thead}>
          <th>Id</th>
          <th>Title</th>
          <th>Project Name</th>
          <th>Status</th> 
          <th>Action</th>          
        </thead>
        <tbody >
	        {data.map((task, i) => (
            <tr id={task.id} key="{i}" className={classes.tr}>
              <td>TL &nbsp;-&nbsp; {task.id}</td>
              <td>
                <b><Link href={`/show?id=${task.id}`}>{task.title}</Link></b> <br /><br />
                <i style={{ background: 'white', color: 'black',}} className="fa fa-user" />&nbsp;&nbsp;&nbsp;&nbsp;{task.user}
              </td>
              <td>{task.project_name}</td>
              <td  >{task.status}</td>              
              <td>
                <button className="fa-button" >
                  <Link href={`/edit?id=${task.id}`}>
                    <i className="fa fa-edit" />
                  </Link>
                </button>&nbsp;&nbsp;
                <button className="fa-button" >
                  <Link href={`/show?id=${task.id}`}>
                    <i className="fa fa-eye" />
                  </Link>
                </button>&nbsp;&nbsp;
                
                <button style={{ background: 'red',}} className="fa-button" onClick={() => { deleteTask(task.id) }} >
                  <i className="fa fa-trash" />
                </button>
                
                </td>
                 
            </tr>
           ))}
        </tbody>
      </table>
    </div>
  )

}



export default Tasks