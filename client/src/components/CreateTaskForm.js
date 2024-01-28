import React, { useState } from 'react';
import { Button, Form, Modal, Alert } from 'react-bootstrap';
import { useUser } from '../contexts/UserContex';

function CreateTaskForm({ show, handleClose, projectId ,fetchTasks}) {
  const { userData } = useUser();
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('Must Have');
  const [newTaskState, setNewTaskState] = useState('In progress');
  const [newTaskTime, setNewTaskTime] = useState('');
  const [newTaskTags, setNewTaskTags] = useState('');
  const [error, setError] = useState('');

  const handleCreateTask = async (taskData) => {
    try {
        const response = await fetch(`http://localhost:4000/api/projects/${projectId}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add authentication headers if needed
            },
            credentials: 'include', // Important for sessions

            body: JSON.stringify(taskData),
        });

        if (response.ok) {
            console.log('Task created successfully');
            fetchTasks();
            handleClose(); // Close the modal on success
        } else {
            const errorText = await response.text();
            throw new Error(errorText);
        }
    } catch (error) {
        console.error('Error creating task:', error);
        setError(error.message);
    }
  };

  const handleCreateClick = () => {
    if (!newTaskName || !newTaskDescription || !newTaskTime) {
      setError('Please fill in all required fields.');
      return;
    }

    const taskData = {
      name: newTaskName,
      description: newTaskDescription,
      priority: newTaskPriority,
      state: newTaskState,
      time: newTaskTime,
      tags: newTaskTags,
      user: userData.userId // Uncomment if user ID is needed
    };

    handleCreateTask(taskData);
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
    <Modal.Header closeButton>
      <Modal.Title>Create Task</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form>
        <Form.Group className="mb-3" controlId="newTaskName">
          <Form.Label>Task Name</Form.Label>
          <Form.Control
            type="text"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="newTaskDescription">
          <Form.Label>Task Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="newTaskPriority">
          <Form.Label>Task Priority</Form.Label>
          <Form.Control
            as="select"
            value={newTaskPriority}
            onChange={(e) => setNewTaskPriority(e.target.value)}
          >
            <option value="Must Have">Must Have</option>
            <option value="Should Have">Should Have</option>
            <option value="Could Have">Could Have</option>
            <option value="Don't Have">Don't Have</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="newTaskState">
          <Form.Label>Task State</Form.Label>
          <Form.Control
            as="select"
            value={newTaskState}
            onChange={(e) => setNewTaskState(e.target.value)}
          >
            <option value="In Progress">In Progress</option>
            <option value="Solved">Solved</option>
            <option value="Waiting">Waiting</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="newTaskTime">
          <Form.Label>Time (hours)</Form.Label>
          <Form.Control
            type="number"
            value={newTaskTime}
            min={1}
            max={50}
            onChange={(e) => setNewTaskTime(e.target.value)}
            
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="newTaskTags">
          <Form.Label>Tags</Form.Label>
          <Form.Control
            type="text"
            value={newTaskTags}
            onChange={(e) => setNewTaskTags(e.target.value)}
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>Cancel</Button>
      <Button variant="primary" onClick={handleCreateClick}>Create Task</Button>
    </Modal.Footer>
  </Modal>
);
}

export default CreateTaskForm;
