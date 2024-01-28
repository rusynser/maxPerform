// CreateProject.js
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useUser } from '../contexts/UserContex'


function CreateProject({ show, handleClose,fetchProjects }) {
  const { userData } = useUser()
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const handleCreateClick = async () => {
    try {
        
        const response = await fetch('http://localhost:4000/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Important for sessions
            body: JSON.stringify({
                name: newProjectName,
                description: newProjectDescription,
                user:userData.userId,
                solved: true,
                //role: userData.userRole // Sending the user role
            })
        });

        if (response.ok) {
          fetchProjects();
          console.log('Project created successfully');
        } else {
            console.error('Failed to create project');
        }
    } catch (error) {
        console.error('Error creating project:', error);
    }
    setNewProjectName('');
    setNewProjectDescription('');
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
    <Modal.Header closeButton>
      <Modal.Title>Create Project</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3" controlId="newProjectName">
          <Form.Label>Project Name</Form.Label>
          <Form.Control
            type="text"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="newProjectDescription">
          <Form.Label>Project Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={newProjectDescription}
            onChange={(e) => setNewProjectDescription(e.target.value)}
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleCreateClick} disabled={userData.userRole !== 'customer'}>
        Create
      </Button>
    </Modal.Footer>
  </Modal>
);
}

export default CreateProject;
