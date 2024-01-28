import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Alert } from 'react-bootstrap';

function EditTaskForm({ show, handleClose, taskId, fetchTasks }) {
  const [taskData, setTaskData] = useState({
    name: '',
    description: '',
    priority: '',
    state: '',
    time: '',
    tags: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (show && taskId) {
      // Fetch the task data and populate the form
      fetchTaskData();
    }
  }, [show, taskId]);

  const fetchTaskData = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/tasks/${taskId}`);
      if (response.ok) {
        const data = await response.json();
        setTaskData(data);
      } else {
        setError('Failed to fetch task data');
      }
    } catch (error) {
      setError('Error fetching task data');
    }
  };

  const handleUpdateTask = async () => {
    const { _id, ...updatePayload } = taskData;
    try {
      const response = await fetch(`http://localhost:4000/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          
        },
        credentials: 'include', 
        body: JSON.stringify(updatePayload),
      });

      if (!response.ok) {fetchTasks(); 
        handleClose();
        
      } else {
        
      }
    } catch (error) {
      fetchTasks(); 
        handleClose();
    }
  };

  const handleInputChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  // ... Form rendering with existing task data ...

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group className="mb-3" controlId="taskName">
            <Form.Label>Task Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={taskData.name}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="taskDescription">
            <Form.Label>Task Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={taskData.description}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="taskPriority">
            <Form.Label>Task Priority</Form.Label>
            <Form.Control
              as="select"
              name="priority"
              value={taskData.priority}
              onChange={handleInputChange}
            >
              <option value="Must Have">Must Have</option>
              <option value="Should Have">Should Have</option>
              <option value="Could Have">Could Have</option>
              <option value="Don't Have">Don't Have</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="taskState">
            <Form.Label>Task State</Form.Label>
            <Form.Control
              as="select"
              name="state"
              value={taskData.state}
              onChange={handleInputChange}
            >
              <option value="In Progress">In Progress</option>
              <option value="Solved">Solved</option>
              <option value="Waiting">Waiting</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="taskTime">
            <Form.Label>Time (hours)</Form.Label>
            <Form.Control
              type="number"
              name="time"
              value={taskData.time}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="taskTags">
            <Form.Label>Tags</Form.Label>
            <Form.Control
              type="text"
              name="tags"
              value={taskData.tags}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" onClick={handleUpdateTask}>Update Task</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditTaskForm;
