import React, { useEffect, useState } from 'react'
import {Button, Modal} from 'react-bootstrap';

export default function Index({
  isVisible,
  headerTitle,
  submitButtonText,
  onClose,
  onSubmit,
  children
}) {
  const [show, setShow] = useState(isVisible);

  /**
   * When user clicks close.
   * @private
   */
  const handleClose = () => {
    setShow(false);
    onClose();
  }

  /**
   * When user clicks Submit.
   * 
   * @private
   */
  const handleSubmit = () => {
    setShow(false);
    onSubmit();
  }

  useEffect(() => {
    setShow(isVisible);
  }, [isVisible]);

  return (
      <Modal
        size = "lg"
        centered
        show={show} 
        onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {headerTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="my-4">
          {children}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {submitButtonText}
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

