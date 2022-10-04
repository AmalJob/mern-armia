import React, { useState } from 'react';
import './Login.module.css';
import {useNavigate} from 'react-router-dom';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow } from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';
import axios from 'axios';
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logErr, setlogErr] = useState('');


  
 
  const submit = async(e)=>{
    e.preventDefault();
    if(!email || !password){
      Swal.fire('Please fill the details');
     
    }else{
      try {
        const data = await axios.post('http://localhost:7000/users/login',{email,password})
      
        localStorage.setItem("userinfo",JSON.stringify(data.data) );
        localStorage.setItem("token",JSON.stringify(data.data.token) );
        navigate('/')
      } catch (error) {
        console.log(error.response.data);
        Swal.fire(error.response.data);
      }
     
    }
  }
  return (
    <div  >
    <MDBContainer className="my-2">
    <MDBCard>
      <MDBRow className='g-0'>

        <MDBCol md='6'>
          <MDBCardImage src='https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg' style={{height:'650px'}} alt="login form" className='rounded-start w-100'/>
        </MDBCol>

        <MDBCol md='6'>
          <MDBCardBody className='d-flex flex-column'>
           {/* <h3 className='text-danger' >{logErr}</h3> */}
            <div className='d-flex flex-row mt-2'>
              <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
              <span className="h1 fw-bold mb-0">Logo</span>
            </div>

            <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>

              <MDBInput wrapperClass='mb-4' value={email}
                  onChange={(e)=>{
                    setEmail(e.target.value)
                 }} label='Email address' id='formControlLg' type='email' size="lg"/>
              <MDBInput  value={password}
                  onChange={(e)=>{
                    setPassword(e.target.value)
                 }} wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"/>

            <MDBBtn onClick={submit} className="mb-4 px-5" color='dark' size='lg'>Login</MDBBtn>
           
            <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <span onClick={()=>{
              navigate('/register')
            }} style={{color: '#393f81'}}>Register here</span></p>

            <div className='d-flex flex-row justify-content-start'>
              <a href="#!" className="small text-muted me-1">Terms of use.</a>
              <a href="#!" className="small text-muted">Privacy policy</a>
            </div>

          </MDBCardBody>
        </MDBCol>

      </MDBRow>
    </MDBCard>

  </MDBContainer>
  </div>
  )
}

export default Login