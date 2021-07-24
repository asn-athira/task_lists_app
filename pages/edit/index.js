import classes from './../create/task.module.css';
import Link from 'next/link';
import { useRouter } from "next/router";
import React, {useState, useEffect} from 'react';



function Edittask() {
  
    const initTask = {title: '', description: '', project_name: '', user: '', status: '', si_no: ''};
    const [task, setTask] = useState(initTask);
    const baseURL = "http://localhost:8080"

    const router = useRouter();
    const {
      query: { id },
    } = router

    
  useEffect(() => {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let vid = params.get('id');
        //let vid = 5
        fetch(`${baseURL}/api/tasks/${vid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((task) => {
          setTask(task);
        })
        .catch((err) => {
          console.log(err);
        });
         }, []);// eslint-disable-line react-hooks/exhaustive-deps


  const handleChange = e => {
        const {name, value} = e.target;
        setTask({...task, [name]: value});
    }

  function submitFormHandler(e){
    e.preventDefault();
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let id = params.get('id');
       fetch(`${baseURL}/api/tasks/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
        body: JSON.stringify(task)
      })
      .then(res => res.json())
      .then(response => {
        if (!!response.error) {
          alert(response.error)
        } else {
          alert("Updated successfully")
          window.location = "/tasks"
        }
      })
    }   

  return (
      
        <div className="form-modal">
    
     

      <div id="login-form">
        <form >
            <h3 className={classes.heading}><b />Update Task</h3>
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
                   placeholder="SI No"/>
            <button type="button" className="btn signup" onClick={submitFormHandler}>Save</button>
            <hr/>
           
           
        </form>
      </div>


    </div>

  	  )

}

export default Edittask

