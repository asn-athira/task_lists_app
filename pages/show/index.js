import classes from './../create/task.module.css';
import Link from 'next/link';
import { useRouter } from "next/router";
import React, {useState, useEffect} from 'react';



function Showtask() {
  
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
         }, []);

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
            <h3 className={classes.heading}><b />{task.title} - SI {task.si_no}</h3>
            <hr/>

            <p>{task.description} <br /> {task.project_name} </p>

            <p>{task.user}</p>
            <p>{task.status}</p>

            
            
           
            <hr/>
           
           
        </form>
      </div>


    </div>

  	  )

}

export default Showtask

