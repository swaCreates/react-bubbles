import React, {useState} from "react";

import {axiosWithAuth} from '../utils/axiosWithAuth';

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [info, setInfo]= useState({
    username: '',
    password: '',
  });

  const handleChanges= evt => {
    // console.log(info)
    setInfo({
      ...info,
      [evt.target.name] : evt.target.value
    })
  }

  const handleSubmit= evt => {
    evt.preventDefault();

    axiosWithAuth()
    .post('/api/login', info)
    .then(res => {
      console.log(res)
      window.localStorage.setItem('token', res.data.payload);

      props.history.push('/bubbles-page');
    })
    .catch(err => console.log('This is my error: ', err));

  }


  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
         type='text'
         onChange={handleChanges}
         placeholder='username'
         name='username'
         value={info.username}
        />
        <input 
         type='password'
         onChange={handleChanges}
         placeholder='password'
         name='password'
         value={info.password}
        />
        <button type='submit'>log in</button>
      </form>
    </>
  );
};

export default Login;
