import React, {useState, useEffect} from 'react';
//import classes from './task.module.css';
import Link from 'next/link';
import { baseURL } from '../../config';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './task.module.css';
import ModalEdit from '../edit'
import { useRouter } from "next/router";

import { Card, Container, CardBody, CardTitle, CardSubtitle, CardText, CardLink, Button, Table, Modal, Row, Col } from 'react-bootstrap';


function Tasks() {
  //const baseURL = "http://localhost:8080"
  const [data, setData] = useState([]); 
  const [show, setShow] = useState(false);
  const [param, setParam] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const initTask = {title: '', description: '', project_name: '', user: '', status: '', si_no: '1'};
  const [task, setTask] = useState(initTask);
  const i = 1;

   // const baseURL = "http://localhost:8080"

    
    const handleChange = e => {
       
        const {name, value} = e.target;
        setTask({...task, [name]: value});
    }

  function submitFormHandler(e){
    setShow(false);
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
      
      const showTask = (id) => {
       let val = "show"

        fetch(`${baseURL}/api/tasks/${id}`, {
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
        setParam(val);
        setShow(true);

      }
      
      const editTask = (id) => {
        let val = "";
        fetch(`${baseURL}/api/tasks/${id}`, {
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
        setParam(val);
        setShow(true);
      }

      const createTask = () => {
        let val = "";
        const newData = {title: '', description: '', project_name: '', user: '', status: '', si_no: '1'};
        setTask(newData);
        setShow(true);
        setParam(val);
      }

      function updateFormHandler(e){
        setShow(false);
        e.preventDefault();
       
        let id = task.id;
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
    <div className={classes.taskcontainer}>
      <Card style={{ width: '60rem', height: '50rem' }}>
        <h4 className={classes.taskhead}><b>Task Lists</b> <Button width="150px;" className="btn-secondary" onClick={() => { createTask()}} >
        Create New
      </Button> &nbsp;  &nbsp;  &nbsp; </h4>
        
        <hr />
        <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Task Lists</Modal.Title>
        </Modal.Header>
        <Modal.Body >
         <Container>
         { param ?
          <div>
           <h3 className={classes.heading}><b />TL {task.si_no} - {task.title}</h3>

            <p>{task.description} <br /> {task.project_name} </p>

            <p><i style={{ background: 'white', color: 'black',}} className="fa fa-user" /> &nbsp; {task.user}</p>
            <p>{task.status}</p>
            </div>
            :

            <div>
          <Row>
            <Col xs={12} md={6}>
              <input type="text" name="title"
                  value={task.title}
                  onChange={handleChange}
                  placeholder="Title"/>
            </Col>
            <Col xs={6} md={4}>
              <input type="text" name="description"
                  value={task.description}
                  onChange={handleChange}
                   placeholder="Description"/>
            </Col>
          </Row><br />
           <Row>
            <Col xs={12} md={6}>
              <input type="text" name="project_name"
                  value={task.project_name}
                  onChange={handleChange}
                   placeholder="Project Name"/>
            </Col>
            <Col xs={6} md={4}>
              <input type="text" name="user"
                  value={task.user}
                  onChange={handleChange}
                   placeholder="User Name"/>         
            </Col>
          </Row><br />
           <Row>
            <Col xs={12} md={6}>
              <input type="text" name="status"
                  value={task.status}
                  onChange={handleChange}
                   placeholder="Status"/>
            </Col>
            <Col xs={6} md={4}>
              <input type="text" name="si_no"
                  value={task.si_no}
                  onChange={handleChange}
                   placeholder="SI No" hidden/>
            </Col>
          </Row>
          </div>
          }

          </Container>       
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={task.id ? updateFormHandler : submitFormHandler}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
        <Card.Body>
          <Table responsive="sm">
            <tbody>
             {data.map((task,i=1) => (
              <tr key={i}>
                <td>TL - {i++}</td>
                <td style={{ width: '600px',}}>
                  <b><Link href={`/show?id=${task.id}`} className='text-link'>{task.title}</Link></b><br />
                  <i style={{ background: 'white', color: 'black',}} className="fa fa-user" />&nbsp;&nbsp;&nbsp;&nbsp;{task.user}&nbsp;&nbsp;&nbsp;&nbsp;
                  {task.project_name}
                </td>
                <td>
                  <Button style={{ background: 'white', color: 'black',}} onClick={() => { editTask(task.id)}}>
                    <i className="fa fa-edit" />
                 </Button>&nbsp;&nbsp;
                 <Button style={{ background: 'white', color: 'black',}} onClick={() => { showTask(task.id)}}>
                    <i className="fa fa-eye" />
                  </Button>&nbsp;&nbsp;
                  <Button style={{ background: 'white', color: 'black',}} onClick={() => { deleteTask(task.id)}}>
                    <i className="fa fa-trash" />
                  </Button>
                 
                </td>
                
              </tr>  
              ))}  
            </tbody>
          </Table>
          
        </Card.Body>
      </Card>
    </div>

  

  )

}



export default Tasks