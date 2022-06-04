import axios from 'axios';
import React, { Component } from 'react'
import { Button, Card,Col, Container, Row, Table } from 'react-bootstrap'
import StudentModal from './StudentModal'

export class Student extends Component {
  constructor(props){
    super(props);
    this.state={
      modal:{
        status:false,
        type:''
      },
      students:[],
      dataId:null,
      singleStudent:{
        id:'',
        name:'',
        cell:'',
        photo:''
      }
    };
  }
  render() {
    const {modal,students,dataId,singleStudent}=this.state;
    const handleModalShow=()=>{
      this.setState({
        ...this.state,
        modal:{
          status:true,
          type:'create'
        }
      });
    }
    const handleModalHide=()=>{
      this.setState({
        ...this.state,
        modal:{
          status:false,
          type:''
        }
      });
    }

    //single student view
    const handleStudentSingleModal=(e,id)=>{
      e.preventDefault();
      let singleStu=students.find((data)=>data.id===id);
      this.setState({
        ...this.state,
        modal:{
          status:true,
          type:'singleView'
        },
        singleStudent:{
          id:singleStu.id,
          name:singleStu.name,
          cell:singleStu.cell,
          photo:singleStu.photo
        }
      });
    }
      // student data edit
    const handleStudentEditModal=(e,id)=>{
      e.preventDefault();
      let singleStu=students.find((data)=>data.id===id);
      this.setState({
        ...this.state,
        modal:{
          status:true,
          type:'edit'
        },
        singleStudent:{
          id:singleStu.id,
          name:singleStu.name,
          cell:singleStu.cell,
          photo:singleStu.photo
        }
      });
    }
    // student data edit
    const handleStudentDeleteModal=(e,id)=>{
      e.preventDefault();
      this.setState((prevState)=>({
        ...prevState,
        modal:{
          status:true,
          type:'delete'
        },
        dataId:id
      }));
    }
    //students data show
    const studentDataShow=()=>{
      try{
        axios.get('http://localhost:5050/students').then(res=>{
          this.setState((prevState)=>({
            ...prevState,
            students:res.data
          }));
        }).catch();
      }
      catch(err){
        console.log(err);
      }
    }
    studentDataShow();

    //edit form data change
    const handleEditDataChange=(obj)=>{
        this.setState((prevState)=>({
          ...prevState,
          singleStudent:obj
        }));
        
    }
    console.log(singleStudent);
     return (
      <>
          <Container>
            <Row className="justify-content-center my-5">
              <Col md={8} >
              <Button variant="success" onClick={ handleModalShow } >Add New Students</Button><br /><br />
              <StudentModal singleStudent={singleStudent} handleEditDataChange={handleEditDataChange} dataId={dataId} show={modal.status} handleModalHide={handleModalHide} type={modal.type} />
                <Card>
                    <Card.Body>
                      <Table>
                          <thead>
                              <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Cell</th>
                                <th>Photo</th>
                                <th>Action</th>
                              </tr>
                          </thead>
                          <tbody>
                            {
                              students.map((data,index)=>
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{data.name}</td>
                                    <td>{data.cell}</td>
                                    <td><img style={{height:"100px",width:"100px"}} src={data.photo} /></td>
                                    <td>
                                      <a onClick={e=>handleStudentSingleModal(e,data.id)} href="#" className='btn btn-info btn-sm'>View</a> &nbsp;
                                      <a onClick={e=>handleStudentEditModal(e,data.id)} href="#" className='btn btn-warning btn-sm'>Edit</a> &nbsp;
                                      <a onClick={e=>handleStudentDeleteModal(e,data.id)} href="#" className='btn btn-danger btn-sm'>Delete</a>
                                    </td>
                                </tr>  
                              )
                            }
                             
                          </tbody>
                        </Table>
                    </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
      </>
    )
  }
}

export default Student
