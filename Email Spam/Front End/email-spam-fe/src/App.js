import React, { useEffect, useState } from 'react';
import './App.css';
import Envelope from './Envelope';
import axios from 'axios';

function App() {
  const [accuracy, setAccuracy] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:5000/accuracy");
        const accuracyPercentage = (res.data.accuracy * 100).toFixed(2);
        setAccuracy(accuracyPercentage); // Giả sử server trả về một object có thuộc tính 'accuracy'
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []); 
  return (
    <div className="app" id="app">
      <div className='accuray'>
        <h3>The accuracy of model: <span style={{color: "#04AA6D"}}>{accuracy}%</span></h3>
      </div>
      <Envelope/>
    </div>
  );
}

export default App;
