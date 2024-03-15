import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [result, setResult] = useState('');
  const PORT = process.env.REACT_APP_PORT || 3002;
  const getUsers = async () => {
    const data = await axios.get(`http://localhost:${PORT}/test`);
    setResult(data?.data);
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>Entrance Granted</header>
      <section>
        <h1>{result}</h1>
      </section>
    </div>
  );
}

export default App;
