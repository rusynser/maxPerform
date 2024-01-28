import React, { useState,useEffect } from "react";
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContex'
import Projects from "../project_data.json";

function NavigationForPages() {
  const { userData } = useUser()
  const [projects, setProjects] = useState(Projects);
  const breadcrumbStyle = {
    background: '#40E0D0',
    padding: '25px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };
  const linkStyle = {
    color: 'black',
    textDecoration: 'none',
    fontSize: '18px',
  };
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

  return (
    <div style={breadcrumbStyle}>
      <a class="nav-link">
        <Link to="/projects" style={linkStyle}>Projects</Link>
     </a>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: '20px' }}>
      <a class="nav-link">
      {userData.userName}:{userData.userRole}
      </a>
       <a class="nav-link">
          <Link to="/" style={linkStyle}>Log out</Link>
       </a>
      </div>
    </div>
  );
}

export default NavigationForPages