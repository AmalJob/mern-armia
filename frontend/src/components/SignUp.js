import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import Swal from "sweetalert2";
function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setrePassword] = useState("");
  const [PassError, setPassError] = useState("");
  const user = {
    name: name,
    email: email,
    password: password,
  };

  console.log(user);

  const Submit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      Swal.fire("Please fill the fields");
    } else if (password !== rePassword) {
      Swal.fire("Password doesnt match");
    } else {
      try {
        const data = await axios.post("http://localhost:7000/users/register", {
          name,
          email,
          password,
        });
        console.log(data);
       
        navigate("/login");
      } catch (error) {
        console.log(error);

      }
    }
  };

  

  return (
    <div>
      <MDBContainer className="my-1">
        <MDBCard>
          <MDBRow className="g-0">
            <MDBCol md="6">
              <MDBCardImage
                src="https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg"
                style={{ height: "750px" }}
                alt="login form"
                className="rounded-start w-100"
              />
            </MDBCol>

            <MDBCol md="6">
              <MDBCardBody className="d-flex flex-column">
                <div className="d-flex flex-row mt-2">
                  <MDBIcon
                    fas
                    icon="cubes fa-3x me-3"
                    style={{ color: "#ff6219" }}
                  />
                  <span className="h1 fw-bold mb-0">Logo</span>
                </div>

                <h5
                  className="fw-normal my-4 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  Sign up your account
                </h5>
                <MDBInput
                  required
                  wrapperClass="mb-4"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  label="Name"
                  id="formControlLg"
                  type="text"
                  size="lg"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  label="Email address"
                  id="formControlLg"
                  type="email"
                  size="lg"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  label="Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  value={rePassword}
                  onChange={(e) => {
                    setrePassword(e.target.value);
                  }}
                  label="Confirm Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                />
                {/* <span>{PassError}</span> */}

                <MDBBtn
                  onClick={Submit}
                  className="mb-4 px-5"
                  color="dark"
                  size="lg"
                >
                  SignUp
                </MDBBtn>

                <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                  Already have a account?{" "}
                  <span
                    onClick={() => {
                      navigate("/login");
                    }}
                    style={{ color: "#393f81" }}
                  >
                    Login
                  </span>
                </p>

                {/* <div className='d-flex flex-row justify-content-start'>
          <a href="#!" className="small text-muted me-1">Terms of use.</a>
          <a href="#!" className="small text-muted">Privacy policy</a>
        </div> */}
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default SignUp;
