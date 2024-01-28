import React, { useState,useEffect } from "react";
import { Button, Card, Modal, Form, Row, Col } from "react-bootstrap";
import CreateProject from "../components/CreateProject";
import { Link,useNavigate  } from "react-router-dom";
import Projects from "../project_data.json";
import { useUser } from '../contexts/UserContex'
import NavigationForPages from "../components/NavigationForPages";


function Home  () {
  const { userData } = useUser()
  const [projects, setProjects] = useState(Projects);
  const [filter, setFilter] = useState("all");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateProjectId, setUpdateProjectId] = useState(null);
  const [updateProjectName, setUpdateProjectName] = useState("");
  const [updateProjectDescription, setUpdateProjectDescription] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();
  //const userRole = 'customer'; // This should be dynamically set based on logged-in user

  
  
  const fetchProjects = async () => {
    if (userData && userData.userId) {
        const roleBasedUrl = userData.userRole === 'customer'
            ? `http://localhost:4000/api/projects/user/${userData.userId}`
            : `http://localhost:4000/api/projects/solver/${userData.userId}`;

        try {
            const response = await fetch(roleBasedUrl);
            if (response.ok) {
                const data = await response.json();
                setProjects(data);
                console.log(userData.userName);
            } else {
                console.error('Failed to fetch projects', await response.text());
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    }
};
useEffect(() => {
    fetchProjects();
}, [userData]);


  const toggleSolvedStatus = (projectId) => {
    setProjects((prevProjects) => {
      return prevProjects.map((project) =>
        project.id === projectId
          ? { ...project, solved: !project.solved }
          : project
      );
    });
  };

  const filteredProjects = () => {
    if (filter === "all") {
      return projects;
    } else if (filter === "solved") {
      return projects.filter((project) => project.solved);
    } else if (filter === "unsolved") {
      return projects.filter((project) => !project.solved);
    }
    return [];
  };

  const handleDelete = (projectId) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== projectId)
    );
  };

  const handleUpdate = () => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === updateProjectId
          ? {
              ...project,
              name: updateProjectName,
              description: updateProjectDescription,
            }
          : project
      )
    );

    setShowUpdateModal(false);
  };

  const handleShowCreateModal = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleCreateProject =async (newProjectName, newProjectDescription) => {
    const newProject = {
      id: projects.length + 1,
      name: newProjectName,
      description: newProjectDescription,
      solved: false,
    };
    
    setProjects([...projects, newProject]);
    setShowCreateModal(false);
    
  };

  return (
    <div>
      <NavigationForPages/>
    <div style={{ background: "#70DFE0", padding: "20px", minHeight: "100vh" }}>
    {userData.userRole === "customer" && (
      <h2 className="mb-4">{userData.userName} projects</h2>
    )}
      <div className="mb-3">
        <div
          style={{
            float: "right",
            marginLeft: "auto",
            display: "flex",
            gap: "10px",
          }}
        >
          <Button
            variant="light"
            className="me-2"
            style={{ fontSize: "1.1rem", padding: "12px 24px" }}
            onClick={() => setFilter("all")}
          >
            All Projects
          </Button>
          <Button
            variant="light"
            className="me-2"
            style={{ fontSize: "1.1rem", padding: "12px 14px" }}
            onClick={() => setFilter("solved")}
          >
            Solved Projects
          </Button>
          <Button
            variant="light"
            style={{ marginRight: "15px", fontSize: "1.1rem", padding: "12px 14px" }}
            onClick={() => setFilter("unsolved")}
          >
            Unsolved Projects
          </Button>
        </div>
        {userData.userRole === 'customer' && (
        <Button 
          variant="light"
          style={{ fontSize: "1.1rem", padding: "12px 14px" }}
          onClick={handleShowCreateModal}
          className="mt-3"
        >
          Create Project
        </Button>
        )}
      </div>
      <div style={{ background: "white", padding: "40px", borderRadius: "3px" , marginTop:"80px" }}>
        <h3 className="mb-3">Projects</h3>
        <Row>
          {filteredProjects().map((project, index, array) => (
            <Col key={project.id} lg={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{project.name}</Card.Title>
                  <Card.Text>{project.description}</Card.Text>
                  <Button
                    variant={project.solved ? "success" : "danger"}
                    className="ml-2"
                    style={{ fontSize: "1.1rem", padding: "5px 12px", marginBottom: "10px", marginRight: "6px" }}
                    onClick={() => toggleSolvedStatus(project.id)}
                  >
                    {project.solved ? "Solved" : "Unsolved"}
                  </Button>
                  <Link to={{ pathname: `/project/${project._id}` }}>
                    
                    <Button
                      variant="info"
                      className="ml-2"
                      style={{ fontSize: "1.1rem", padding: "5px 12px", marginBottom: "10px", marginRight: "7px" }}
          
                    >
                      Detail
                    </Button>
                  </Link>
                  <Button
                    variant="warning"
                    className="ml-2"
                    style={{
                      fontSize: "1.1rem",
                      padding: "5px 12px",
                      marginBottom: "10px",
                      marginRight: "5px",
                    }}
                    onClick={() => {
                      setShowUpdateModal(true);
                      setUpdateProjectId(project.id);
                      setUpdateProjectName(project.name);
                      setUpdateProjectDescription(project.description);
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    className="ml-2"
                    style={{ fontSize: "1.1rem", padding: "5px 12px", marginBottom: "10px" }}
                    onClick={() => handleDelete(project.id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
                <Card.Footer className="text-muted">{/* Any additional info */}</Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <CreateProject
  show={showCreateModal}
  handleClose={handleCloseCreateModal}
  handleCreate={handleCreateProject}
  
/>

      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)} dialogClassName="modal-90w">
        <Modal.Header closeButton>
          <Modal.Title>Update Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="updateProjectName">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                value={updateProjectName}
                onChange={(e) => setUpdateProjectName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="updateProjectDescription">
              <Form.Label>Project Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={updateProjectDescription}
                onChange={(e) => setUpdateProjectDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowUpdateModal(false)}
            style={{ fontSize: "1.1rem", padding: "10px 20px" }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleUpdate}
            style={{ fontSize: "1.1rem", padding: "10px 20px" }}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
  );
};

export default Home;