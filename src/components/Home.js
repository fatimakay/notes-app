
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import Logo from '../assets/images/logo.png';
import "./Home.scss";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/fontawesome-free-solid";
import { Modal, Button } from "react-bootstrap";
import { getDatabase, ref, onValue , push, child } from '@firebase/database';
import NoteList from "./NoteList";



const Home = (props) => {

  const db= getDatabase(); 
  
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    getNote();
  }, [user]);

  //--MODAL--
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //--ADDING NOTE--
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [note, setNote] = useState([]);

  const addNote = () =>{
    const newNote = {
      title: noteTitle,  
      body: noteBody
    }
    if(noteBody.trim().length > 0){
      push(ref(db, 'users/' + user.uid + '/notes'), newNote);
      setShow(false);
      const newNotes = [...note, newNote]; //creates a new array of exisitng notes
      setNote(newNotes); 
      setNoteTitle(''); 
      setNoteBody('');
    }
    else{
      alert("Empty note!")
    }
  }
  const getNote = () =>{
     const db= getDatabase(); 
     const getNotes = ref(db, 'users/' + user.uid + '/notes');
     onValue(getNotes, (snapshot) => {
      let newItem = [];
       snapshot.forEach(childSnapshot =>{

          newItem.push(...note, {
            id: childSnapshot.key,
          title: childSnapshot.val().title,
           body: childSnapshot.val().body
          }); 
       
        // const item= {
        //   title: childSnapshot.val().title,
        //   body: childSnapshot.val().body
        // }
        // let newItem = []
        // newItem.push(...note, item); 
        // setNote(newItem);
        // console.log('mynotes', note)
      });
      setNote(newItem);
      console.log(note);
    
    })
      
  }

 
    return (
      <>

      <Modal 
       {...props}
       size="sm"
       aria-labelledby="contained-modal-title-vcenter"
       centered
       show={show} onHide={handleClose}
       >
        <Modal.Header>
          <Modal.Title>Add New Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="form-group">
              <input type="text" value={noteTitle}  className="form-control" id="title" 
              placeholder="Note title..."
              onChange={(e) => setNoteTitle(e.target.value)}/>
            </div>
            <div className="form-group">
            <textarea value={noteBody} className="form-control" id="notebody" 
              placeholder="Write your note here..."
              onChange={(e) =>setNoteBody(e.target.value)}/>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="discardbtn" onClick={handleClose}>
            Discard
          </Button>
          <Button className="addbtn" onClick={addNote}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="container w-75 mt-5">
        {/* --NAVBAR */}
        <nav className="navbar navbar-dark ">
          <Link className="navbar-brand p-2" to="/home">
            <img src={Logo} width="140" height="60" className="d-inline-block"/>
          </Link>
         <h3 className="mt-3"> {user && user.displayName}'s Notes</h3>

          <div className=" navbar-right">
          <button className="btn addnotes mr-2" onClick={handleShow}>
            <FontAwesomeIcon className="px-2" icon={faPlus}/>Add Notes</button>
          <button className="btn logoutbtn" onClick={logout}>Logout</button>
            </div>
        </nav>
        {/* Container to hold notes */}
        <div className="container notes-container">
        <h1>My Notes</h1>
                {/* Passing notes state as prop */}
            <NoteList note={note}/>
         </div>
      </div>
      
</>
      );
}

 
export default Home;