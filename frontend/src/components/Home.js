import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>File Project Browser UI</h1>
      <nav>
        <ul>
          <li>
            <Link to="/create">Create Project</Link>
          </li>
          <li>
            <Link to="/load">Load Project</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
