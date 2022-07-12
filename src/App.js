import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";
import { ApolloProvider, useQuery, gql } from '@apollo/client';
import Nav from "./nav";
import Home from "./Home";
import Projects from "./Projects";
import Settings from "./Settings";
import Profile from "./Profile";

// const testQuery = gql`
//   query getAllCompanies {
   
//   }
// `;

window.sessionStorage.setItem("userId", 783)

function App() {

  return (
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/bids" element={<Projects />}/>
          <Route path="profile" element={<Profile />}/>
          <Route path="/settings" element={<Settings/>}/>
          <Route
            path="*"
            element={<Home />} />
        </Routes>
      </div>
  );
}

export default App;
