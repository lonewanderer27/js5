import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

export default function Header() {
  const [showAbout, setShowAbout] = useState(false);

  const handleClose = () => setShowAbout(false);
  const handleOpen = () => setShowAbout(true);

  return (
    <div className="header row">
      <Modal show={showAbout} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>About CalcuLog</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center align-items-center flex-column px-5"  style={{textAlign: "justify"}}>
          <img src="/CalculogApp/vite.svg" className="logo pt-3 pb-4" />
          <p>
          CalcuLog is a web application that allows users to perform calculations involving propagation error and Taylor-Maclaurin series. 
          </p>
          <p>
            This new version uses MathJS library to parse and evaluate the user's mathematical equation.
          </p>
          <hr />
          <h5>Who developed this awesome app?</h5>
          <p className="pt-2">
            <ul>
              <li>Mark James</li>
              <li>Adriane James</li>
            </ul>
          </p>
          <h5>Version Number: <span>2</span></h5>
        </Modal.Body>
      </Modal>
      <div className="col-2 justify-content-center align-items-center">
        
      </div>
      <div className="col">
        <div className="text-center pt-2">
          <h2>CalcuLog</h2>
        </div>
      </div>
      <div className="col-2 d-flex justify-content-around align-items-center">
        <img 
          src="/CalculogApp/info-square-fill.svg" 
          className="infoBtn" onClick={() => handleOpen()} 
          title="Click to view About info" 
        />
      </div>
    </div>
  )
}