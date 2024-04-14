import React, { useState } from 'react';
import './App.css';
import Envelope from './Envelope';
import { MDBBtn,MDBTextArea,MDBInput } from "mdb-react-ui-kit";

function App() {
  const [toPerson, setToPerson] = useState('');
  const [content, setContent] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);

  const handleInputChange = (e) => {
    setToPerson(e.target.value);
  };

  const handleTextareaChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    setIsSubmit(true);
  }

  return (
    <div className="app">
      <div className='form'>
        <MDBInput label="Tên người gửi" id="typeText" type="text" onChange={handleInputChange}/>
        <MDBTextArea label="Nội dung" id="textAreaExample" rows="{4}" onChange={handleTextareaChange}/>
        <div>
          <MDBBtn className='me-1' color='success' onClick={handleSubmit}>
            Xác nhận
          </MDBBtn>
        </div>
      </div>
      {isSubmit && <Envelope toPerson={toPerson} content={content} />}
    </div>
  );
}

export default App;
