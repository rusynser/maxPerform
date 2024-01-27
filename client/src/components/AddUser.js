import React, { useState } from 'react';
import { Modal, Button, Form, ModalFooter } from 'react-bootstrap';

const AddUserForm = ({ show, handleClose, projectId }) => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');

  const handleSendUser = async () => {
    if (newUser.trim() === '') {
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/projects/${projectId}/addUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for sessions

        body: JSON.stringify({ username: newUser }),
      });

      if (response.ok) {
        setUsers([...users, { text: newUser, sender: 'customer' }]);
        setNewUser('');
      } else {
        console.error('Failed to add user');
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title style={{ fontSize: '2rem' }}>Add User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {users.map((user, index) => (
            <div key={index} className="alert alert-dark" role="alert">
              {user.text}
            </div>
          ))}
          <Form.Group className="input-group mb-3">
            <Form.Control
              type="text"
              value={newUser}
              onChange={(e) => setNewUser(e.target.value)}
              placeholder="Enter a User"
            />
            <div className="input-group-append">
              <Button variant="outline-secondary" onClick={handleSendUser}>Add</Button>
            </div>
          </Form.Group>
        </div>
        <ModalFooter>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        </ModalFooter>
      </Modal.Body>
    </Modal>
  );
};

export default AddUserForm;
