import React from 'react';
import { Link } from 'react-router-dom';

function NavigationForPages() {
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

  return (
    <div style={breadcrumbStyle}>
      <a class="nav-link">
        <Link to="/projects" style={linkStyle}>Projects</Link>
     </a>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: '20px' }}>
       <a class="nav-link">
          <Link to="/" style={linkStyle}>Log out</Link>
       </a>
      </div>
    </div>
  );
}

export default NavigationForPages