import React, {useState, useEffect} from 'react';
import classes from './task.module.css';
import Link from 'next/link';


function Tasks() {
  const baseURL = "http://localhost:8080"
  const [data, setData] = useState([]); 
 

  useEffect(() => {
         fetch(`${baseURL}/api/tasks`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          }
      })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
       }, []);// eslint-disable-line react-hooks/exhaustive-deps

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
          <th>User</th> 
          <th>Status</th> 
          <th>Action</th>          
        </thead>
        <tbody >
	        {data.map((task) => (
            <tr id={task.id} className={classes.tr}>
              <td>TL &nbsp; {task.id}</td>
              <td>
                <b>{task.title}</b> <br />
                {task.description}
              </td>
              <td>{task.project_name}</td>
              <td>{task.user}</td>
              <td  style={{
                 
                }}>{task.status}</td>              
              <td>
                <button >
                  <Link href={`/edit?id=${task.id}`}>
                    Edit
                  </Link>
                </button>
                <button >
                  <Link href={`/show?id=${task.id}`}>
                    Show
                  </Link>
                </button>
                
                <button onClick={() => { deleteTask(task.id) }} >
                  Delete
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