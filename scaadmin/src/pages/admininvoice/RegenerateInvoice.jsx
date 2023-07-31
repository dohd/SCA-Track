import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
function RegenerateInvoice() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
    <>
      <Button variant="primary" onClick={handleShow}>
       Regenerate invoice
      </Button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Regenerate invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body><input placeholder='Enter invoice number'></input></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Open
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RegenerateInvoice;
