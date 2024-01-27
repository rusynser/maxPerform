import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useUser } from '../contexts/UserContex';
function CreateTaskForm({ show, handleClose, handleCreateTask }) {
  const { userData } = useUser();
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("must-have");
  const [newTaskState, setNewTaskState] = useState("in-progress");
  const [newTaskTime, setNewTaskTime] = useState(""); 
  const [newTaskTags, setNewTaskTags] = useState(""); 

  const handleCreateClick = () => {
    handleCreateTask({
      name: newTaskName,
      description: newTaskDescription,
      priority: newTaskPriority,
      state: newTaskState,
      time: newTaskTime,
      tags: newTaskTags,
      // user: userData.userId // If you need to send the user ID
    });


    
    // Clear the form fields
    setNewTaskName('');
    setNewTaskDescription('');
    setNewTaskPriority('must-have');
    setNewTaskState('in-progress');
    setNewTaskTime('');
    setNewTaskTags('');
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Create Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Task Name */}
          <Form.Group className="mb-3" controlId="newTaskName">
            <Form.Label>Task Name</Form.Label>
            <Form.Control
              type="text"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
            />
          </Form.Group>

          {/* Task Description */}
          <Form.Group className="mb-3" controlId="newTaskDescription">
            <Form.Label>Task Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
            />
          </Form.Group>

          {/* Task Priority */}
          <Form.Group className="mb-3" controlId="newTaskPriority">
            <Form.Label>Task Priority</Form.Label>
            <Form.Control
              as="select"
              value={newTaskPriority}
              onChange={(e) => setNewTaskPriority(e.target.value)}
            >
              <option value="must-have">Must Have</option>
              <option value="should-have">Should Have</option>
              <option value="could-have">Could Have</option>
              <option value="dont-have">Don't Have</option>
            </Form.Control>
          </Form.Group>

          {/* Task State */}
          <Form.Group className="mb-3" controlId="newTaskState">
            <Form.Label>Task State</Form.Label>
            <Form.Control
              as="select"
              value={newTaskState}
              onChange={(e) => setNewTaskState(e.target.value)}
            >
              <option value="in-progress">In Progress</option>
              <option value="solved">Solved</option>
              <option value="waiting">Waiting</option>
            </Form.Control>
          </Form.Group>

          {/* Task Time */}
          <Form.Group className="mb-3" controlId="newTaskTime">
            <Form.Label>Time (hours)</Form.Label>
            <Form.Control
              type="number"
              value={newTaskTime}
              onChange={(e) => setNewTaskTime(e.target.value)}
            />
          </Form.Group>

          {/* Task Tags */}
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
        <Button variant="primary" onClick={handleCreateClick} >Create Task</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateTaskForm;
