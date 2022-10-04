import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardLink,
  MDBCardSubTitle,
  MDBCardText,
  MDBCardTitle,
} from "mdb-react-ui-kit";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
function Main() {
  const data = localStorage.getItem("userinfo");
  const user = JSON.parse(data);
  const userId = user.user._id;
  const tok = localStorage.getItem('token');
  const token = JSON.parse(tok);
  console.log(token);
  const [text, setText] = useState("");
  const [edit, setEdit] = useState("");
  const [id, setId] = useState("");
  const [error, seterror] = useState("");
  const [all, setAll] = useState([]);

  const todoData = {
    todo: text,
    userId: userId,
  };

  const reg = new RegExp(/^\s+$/);
  const datas = async () => {
    if (text.length < 5) {
      Swal.fire("Text should be more than 5 letters");
    } else if (!reg.test(text) && text !== "") {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            "auth-token": token,
          },
        };
        const data = await axios.post("http://localhost:7000/todos/", todoData, config);
        setAll((res)=>[...res, data.data]);
        setText("");
        todos();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const todos = async () => {
  
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "auth-token": token,
        },
      };
      const data = await axios.get(
        `http://localhost:7000/todos/${userId}`, config
      );
      setAll(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    todos();
  },[]);

  const deleteTask = async(Id) => {
   try {
    console.log(Id);
    const data = await axios.delete(`http://localhost:7000/todos/${Id}`)
    todos();
   } catch (error) {
    console.log(error);
   }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (text, id) => {
    setEdit(text);
    setId(id);
    setShow(true);
  };
 async function updateTodo() {
    if (!reg.test(edit) && edit !== "") {
      try {
        console.log(edit);
        const update = await axios.put(`http://localhost:7000/todos/${id}`, {todo:edit})
        setAll((res)=>[...res, update.data]);
        todos()
        setShow(false);
      } catch (error) {
        console.log(error);
      }
     
    }
  }

  return (
    <div>
      {user ? (
        <div>
          {" "}
          <h2 className="text-center mt-2">Notes </h2>
          <div
            className="mt-5 mx-3"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="text"
              />
              <Button className="ms-2" onClick={datas}>
                ADD
              </Button>

              <div>
                <h5 className="text-center text-danger mt-2">{error} </h5>
              </div>

              {all.map((data, index) => {
                return (
                  <div>
                    <MDBCard className="text-center mt-3 ">
                      <MDBCardBody>
                        {/* <MDBCardTitle>Notes</MDBCardTitle> */}

                        <MDBCardText className="mt-3">
                          {data.todo}

                          <span className="ms-2">
                            <MDBBtn
                              onClick={() => {
                                handleShow(data.todo, data._id);
                              }}
                            >
                              Edit
                            </MDBBtn>
                            <MDBBtn
                              onClick={()=> deleteTask(data._id)}
                              className="ms-2"
                            >
                              Delete
                            </MDBBtn>
                          </span>
                        </MDBCardText>
                      </MDBCardBody>
                    </MDBCard>
                  </div>
                );
              })}
            </div>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Update</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Note</Form.Label>
                  <Form.Control
                    type="text"
                    value={edit}
                    onChange={(e) => {
                      setEdit(e.target.value);
                    }}
                    autoFocus
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={updateTodo}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>{" "}
        </div>
      ) : (
        <div className="text-center mt-3">
          <img src="https://saswhizz.com/assets1/img/login.jpg" alt="" />
        </div>
      )}
    </div>
  );
}

export default Main;
