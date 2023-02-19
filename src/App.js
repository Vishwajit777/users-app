import React from 'react'
import './App.css';
import AddUser from './pages/users/AddUser';
import UserList from './pages/users/UserList';

function App() {
  return (
   <React.Fragment>
<AddUser/>
<UserList/>
   </React.Fragment>
  );
}

export default App;
