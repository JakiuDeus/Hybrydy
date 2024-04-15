import React from 'react';

import './App.css';
import Bar from "./components/Bar";
import Add from "./components/AddFailure";
import List from "./components/FailureList";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Edit from "./components/EditFailure";


function App() {
  return (
    <div className="App">
     <Router>
         <Bar/>
         <Routes>
             <Route path="/" element={<List/>}/>
             <Route path="/AddFailure" element={<Add/>}/>
             <Route path="/EditFailure/:id" element={<Edit/>}/>
         </Routes>
     </Router>
    </div>
  );
}

export default App;
