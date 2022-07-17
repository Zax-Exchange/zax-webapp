import logo from './logo.svg';
import './App.scss';
import React, { useEffect, useState } from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";
import { ApolloProvider, useQuery, gql } from '@apollo/client';
import Nav from "./app/Nav/Nav";
import Home from "./app/Home/Home";
import Projects from "./app/Projects/Projects";
import Settings from "./app/Settings/Settings";
import Profile from "./app/Profile/Profile";
import SearchResults from "./app/Search/SearchResults";
import SearchProjectDetail from './app/Projects/SearchProjectDetail';
import ProjectBid from './app/Projects/ProjectBid';
import { Container } from "@mui/material";
import CustomerProjectDetail from './app/Projects/CustomerProjectDetail';

window.sessionStorage.setItem("userId", 792)

function App() {

  return (
      <div className="App">
        <Nav />
        <Container>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/projects" element={<Projects />}/>
            <Route path="profile" element={<Profile />}/>
            <Route path="/settings" element={<Settings/>}/>
            <Route path="/search" element={<SearchResults/>}/>
            <Route path="/project-detail" element={<SearchProjectDetail/>}/>
            <Route path="/project-bid" element={<ProjectBid/>}/>
            <Route path="/customer-project-detail" element={<CustomerProjectDetail/>}/>
            <Route
              path="*"
              element={<Home />} />
          </Routes>

        </Container>
      </div>
  );
}

export default App;
