import React, {useState, useEffect} from "react";
import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState('');
  const [techs, setTechs] = useState('');
  const [url, setUrl] = useState('');
  
  useEffect(() => {
  api.get('repositories').then(response => setRepositories(response.data));
  }, []);

  async function handleAddRepository() {
    const repository = await api.post('repositories', {title, techs, url});
    setTechs('');
    setTitle('');
    setUrl('');
    setRepositories([...repositories, repository.data]); 
  }

  async function handleRemoveRepository(id) {

    api.delete(`repositories/${id}`).then(
    setRepositories(repositories.filter(repository => repository.id !== id)))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => 
   
        <li key={repo.id}>
          {repo.title}

          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>
        

        )}

      </ul>
      <input type="text" name="title" placeholder="title" value={title} onChange={e=>setTitle(e.target.value)}/>
      <input type="text" name="url" placeholder="url" value={url} onChange={e=>setUrl(e.target.value)}/>
      <input type="text" name="techs" placeholder="techs" value={techs} onChange={e => setTechs(e.target.value)}/>
      <button onClick={handleAddRepository}>Adicionar</button>

    </div>
  );
}

export default App;