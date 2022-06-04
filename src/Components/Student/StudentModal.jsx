import React, { Component } from 'react'
import axios from 'axios';
import { Button, Form, Modal } from 'react-bootstrap'

export class StudentModal extends Component {
    constructor(props){
        super(props);
        this.state={
            inputs:{
                name:'',
                cell:'',
                photo:''
            }
        };
    }
    
  render() {
    const{show,handleModalHide,type,dataId,singleStudent,handleEditDataChange}=this.props;
    const {name,cell,photo}=this.state.inputs;
    console.log(this.state.inputs);
    //data delete
    const handleModalDelete=(id)=>{
        try{
            axios.delete('http://localhost:5050/students/'+ id).then(res=>handleModalHide()).catch(err=>console.log(err));
        }
        catch(err){
            console.log(err);
        }
    }
    const handleStudentAdd=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:5050/students',this.state.inputs).then(res=>{
            this.setState((prevState)=>({
                ...prevState,
                inputs:{
                    name:'',
                    cell:'',
                    photo:''
                }
            }));
            handleModalHide();
        }).catch();
    }
    //update student
    const handleUpdateStudent=(e)=>{
        e.preventDefault();
        axios.patch('http://localhost:5050/students/'+singleStudent.id,singleStudent).then(res=>{ handleModalHide();}
           
        ).catch();
    }
    if(type==='create'){
        return (
            <>
              <Modal show={show} onHide={handleModalHide}>
                  <Modal.Body>
                      <h6>Student Add</h6>
                      <hr />
                      <Form onSubmit={handleStudentAdd}>
                          <Form.Group className="my-3">
                              <Form.Label>Student Name</Form.Label>
                              {/* <Form.Control type="text" value={name} onChange={e=>this.setState((prevState)=>({
                                  ...prevState,
                                  inputs:{
                                      ...prevState.inputs,
                                      name:e.target.value
                                  }
                              }))} /> */}
                              <Form.Control type="text" value={name} onChange={e=>this.setState({...this.state,inputs:{...this.state.inputs,name:e.target.value}})} />
                          </Form.Group>
                          <Form.Group className="my-3">
                              <Form.Label>Student Cell</Form.Label>
                              {/* <Form.Control type="text" value={cell} onChange={e=>this.setState((prevState)=>({
                                  ...prevState,
                                  inputs:{
                                      ...prevState.inputs,
                                      cell:e.target.value
                                  }
                              }))} /> */}
                              <Form.Control type="text" value={cell} onChange={e=>this.setState({...this.state,inputs:{...this.state.inputs,cell:e.target.value}})} />
                          </Form.Group>
                          <Form.Group className="my-3">
                              <Form.Label>Student Photo</Form.Label>
                              {/* <Form.Control type="text" value={photo} /> */}
                              <Form.Control type="text" value={photo} onChange={e=>{this.setState({...this.state,inputs:{...this.state.inputs,photo:e.target.value}})}} />
                          </Form.Group>
                          <Form.Group className="my-3">
                              <Button type="submit" variant="success">Add New Student</Button>
                          </Form.Group>
                      </Form>
                  </Modal.Body>
              </Modal>
            </>
          )
    }
    else if(type==='singleView'){
        return (
            <>
              <Modal show={show} onHide={handleModalHide}>
                  <Modal.Body>
                      <h6>Student SIngle View</h6>
                      <hr></hr>
                        <img style={{width:'100%',height:'300px'}} src={singleStudent.photo} />
                        <h2>{singleStudent.name}</h2>
                        <p>{singleStudent.cell}</p>
                      
                  </Modal.Body>
              </Modal>
            </>
          ) 
    }
    if(type==='edit'){
        return (
            <>
              <Modal show={show} onHide={handleModalHide}>
                  <Modal.Body>
                      <h6>Student Data Edit</h6>
                      <hr />
                      <Form onSubmit={handleUpdateStudent}>
                          <Form.Group className="my-3">
                              <Form.Label>Student Name</Form.Label>
                              <Form.Control type="text" value={singleStudent.name} onChange={e=>(handleEditDataChange({
                                  ...singleStudent,
                                  name:e.target.value
                              }))} />
                          </Form.Group>
                          <Form.Group className="my-3">
                              <Form.Label>Student Cell</Form.Label>
                              <Form.Control type="text" value={singleStudent.cell} onChange={e=>(handleEditDataChange({
                                  ...singleStudent,
                                  cell:e.target.value
                              }))} />
                          </Form.Group>
                          <Form.Group className="my-3">
                              <Form.Label>Student Photo</Form.Label>
                              <Form.Control type="text" value={singleStudent.photo} onChange={e=>(handleEditDataChange({
                                  ...singleStudent,
                                  photo:e.target.value
                              }))}/>
                          </Form.Group>
                          <Form.Group className="my-3">
                              <Button type="submit" variant="success">Update New Student</Button>
                          </Form.Group>
                      </Form>
                  </Modal.Body>
              </Modal>
            </>
          )
    }
    if(type==='delete'){
        return (
            <>
              <Modal show={show} onHide={handleModalHide}>
                  <Modal.Body>
                      <h6>Are You Sure!</h6>
                      <p> To Delete Your Data!</p>
                      <Button onClick={handleModalHide} variant="warning">Cancel</Button>&nbsp;
                      <Button  onClick={e=>handleModalDelete(dataId)}variant="danger">Delete</Button>
                      
                  </Modal.Body>
              </Modal>
            </>
          )
    }
  }
}

export default StudentModal