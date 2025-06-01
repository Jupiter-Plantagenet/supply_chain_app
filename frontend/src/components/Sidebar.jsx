import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-title">
        <h2>Supply Chain</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li><Link to="/">Products</Link></li>
          <li><Link to="/add">Add Product</Link></li>
        </ul>
      </nav>
    </div>
  );
}
