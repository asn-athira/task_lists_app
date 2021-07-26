import classes from './task.module.css';
//import React, { useRef } from 'react';
import React, {useState} from 'react';
import { baseURL } from '../../config';


function Createtask() {
    const initTask = {title: '', description: '', project_name: '', user: '', status: '', si_no: '1'};
    const [task, setTask] = useState(initTask);
   // const baseURL = "http://localhost:8080"


    
    const handleChange = e => {
        const {name, value} = e.target;
        setTask({...task, [name]: value});
    }

  function submitFormHandler(e){
    e.preventDefault();
    
    
    fetch(`${baseURL}/api/tasks`, {
      method: "POST",      
      headers: {
            'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
      body: JSON.stringify(task)
      
    })
   
   .then(function(response) {
        return response.json();
    })
      .then(response => {
        if (!!response.error) {
          alert(response.error)
        } else {
          alert("Created successfully")
          window.location = "/tasks"
        }
      })
  }
  return (
      
      <div className="form-modal">
    
     

      <div id="login-form">
        <form >
            <h3 className={classes.heading}><b />Create New Task</h3>
            <hr/>

            <input type="text" name="title"
                  value={task.title}
                  onChange={handleChange}
                   placeholder="Title"/>
            <input type="text" name="description"
                  value={task.description}
                  onChange={handleChange}
                   placeholder="Description"/>
            <input type="text" name="project_name"
                  value={task.project_name}
                  onChange={handleChange}
                   placeholder="Project Name"/>
            <input type="text" name="user"
                  value={task.user}
                  onChange={handleChange}
                   placeholder="User Name"/>            
            <input type="text" name="status"
                  value={task.status}
                  onChange={handleChange}
                   placeholder="Status"/>
            <input type="text" name="si_no"
                  value={task.si_no}
                  onChange={handleChange}
                   placeholder="SI No" hidden/>
            <button type="button" className="btn signup" onClick={submitFormHandler}>Save</button>
            <hr/>
           
           
        </form>
      </div>


    </div>
  	  )

}
export default Createtask

