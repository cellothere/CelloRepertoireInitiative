import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [sheetMusic, setSheetMusic] = useState([]);
  const [newItem, setNewItem] = useState({ title: '', composer: '', price: '' });
axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('/api/sheetmusic').then((response) => {
      setSheetMusic(response.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('api/sheetmusic', newItem).then((response) => {
      setSheetMusic([...sheetMusic, response.data]);
      setNewItem({ title: '', composer: '', price: '' });
    });
  };

  return (
    <div>
      <h1>Sheet Music Store</h1>
      <ul>
        {sheetMusic.map((item) => (
          <li key={item._id}>
            {item.title} by {item.composer} - ${item.price}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={newItem.title}
          onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Composer"
          value={newItem.composer}
          onChange={(e) => setNewItem({ ...newItem, composer: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
        />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default App;
