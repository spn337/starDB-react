import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

const Header = ({ onServiceChange }) => {
  return (
    <div className="header d-flex">
      <h2>
        <Link to="/">StarDB</Link>
      </h2>
      <ul className="d-flex">
        <li>
          <Link to="/people/">People</Link>
        </li>
        <li>
          <Link to="/planets/">Planets</Link>
        </li>
        <li>
          <Link to="/starships/">Starships</Link>
        </li>
        <li>
          <Link to="/secret/">Secret</Link>
        </li>
        <li>
          <Link to="/login/">Login</Link>
        </li>
        <button
          className="btn btn-primary btn-sm"
          onClick={onServiceChange}>
          Change servise
      </button>
      </ul>

    </div>
  );
};

export default Header;