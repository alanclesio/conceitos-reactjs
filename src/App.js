import React from "react";
import { useState, useEffect } from "react";
import axios from "./services/api";

import "./styles.css";

function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    axios.get('repositories').then(response => {
      setRepos(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const data = {
      title: `Repo - ${Date.now()}`,
      url: 'https://github.com/alanclesio/siges.git',
      techs: ['javascript', 'nodejs']
    };

    const repo = await axios.post('repositories', data).then(response => response.data);

    setRepos([...repos, repo]);
  }

  async function handleRemoveRepository(id) {
    axios.delete(`repositories/${id}`).then(response => {
      if (response.status === 204) {
        const reposFiltered = repos.filter(repo => repo.id !== id);

        setRepos(reposFiltered);
      }
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repos.map(repo =>
            <li key={repo.id}>{repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
