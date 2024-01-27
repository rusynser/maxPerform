import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

function Navigation() {
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
      <Breadcrumb.Item style={{ listStyle: 'none', margin: '0', padding: 0, marginRight: '5px' }}>
        <Link to="/projects" style={linkStyle}>Projects</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item style={{ listStyle: 'none', margin: '0', padding: 0, marginLeft: '20px' }}>
        <Link to="/task" style={linkStyle}>Task</Link>
      </Breadcrumb.Item>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: '20px' }}>
        <Breadcrumb.Item style={{ listStyle: 'none', margin: '0', padding: 0 }}>
          <Link to="/registration" style={linkStyle}>Registration</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item style={{ listStyle: 'none', margin: '0', padding: 0 }}>
          <Link to="/" style={linkStyle}>Login</Link>
        </Breadcrumb.Item>
      </div>
    </div>
  );
}

export default Navigation;