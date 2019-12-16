import React from 'react';

export const Header = () => (
  <header className="header">
    <nav>
      <div className="logo">
        <img src="/images/logo.png" alt="Todoist" />
      </div>
      <div className="settings">
        <ul>
          <li>+</li>
        </ul>
      </div>
    </nav>
  </header>
);