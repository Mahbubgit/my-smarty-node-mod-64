import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [])

  const handleAddUser = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    // console.log(name, email);
    const user = { name, email };

    // post data to server
    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user),
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const newUsers = [...users, data];
      setUsers(newUsers);
    })


    // fetch('http://localhost:5000/users', {
    //   method: 'POST', // or 'PUT'
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log('Success:', data);
    //   })
  }
  return (
    <div className="App">
      <h1>My own data: {users.length} </h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder='Name' />
        <input type="text" name="email" placeholder='Email' />
        <input type="submit" value="Add User" />
      </form>
      <ul>
        {
          users.map(user => <li key={user.id}>ID: {user.id}, Name: {user.name}, Email: {user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
