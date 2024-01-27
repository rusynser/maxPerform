import React, { useState } from 'react';
import { Modal, Button, ModalFooter} from 'react-bootstrap';


const AddUserForm = ({show, handleClose}) => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');

  const handleSendUser = () => {
    if (newUser.trim() === '') {
      return;
    }

    setUsers([...users, { text: newUser, sender: 'customer' }]);
    setNewUser('');
  };
  return (
  <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header>
        <Modal.Title style={{ fontSize: '2rem' }}>Add user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
    <div>
      <div> 
        {users.map((Customer, index) => (
          <div key={index} className={Customer.sender === 'user' ? 'user-User' : 'bot-User'} class="alert alert-dark" role="alert">
            {Customer.text}
          </div>
          
        ))}
      </div>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          value={newUser}
          aria-label="Recipient's username" 
          aria-describedby="basic-addon2"
          onChange={(e) => setNewUser(e.target.value)}
          placeholder="Enter a User"
        />
        <div class="input-group-append">
        <button class="btn btn-outline-secondary" onClick={handleSendUser}>Add</button>
        </div>
      </div>
    </div>
    <ModalFooter>
    <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
    </ModalFooter>
      </Modal.Body>
      </Modal>
  );
};

export default AddUserForm;
