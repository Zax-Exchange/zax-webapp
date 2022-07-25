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
import VendorSearchResults from "./app/Search/VendorSearchResults";
import CustomerSearchResults from "./app/Search/CustomerSearchResults";
import SearchProjectDetail from './app/Search/SearchProjectDetail';
import ProjectBid from './app/Projects/ProjectBid';
import { Container } from "@mui/material";
import CustomerProjectDetail from './app/Projects/CustomerProjectDetail';
import RequireAuth from './app/Auth/RequireAuth';
import Login from './app/Login/Login';
import UserSignup from './app/Login/UserSignup';
import VendorSignup from './app/Login/VendorSignup';
import CompanySignup from './app/Login/CompanySignup';
import {ErrorBoundary} from 'react-error-boundary'
import ErrorFallback from './app/ErrorBoundary/ErrorBoundary';

function App() {
  
  return (
      <div className="App">
        <Nav/>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
        >
          <Container maxWidth="xl">
            <Routes>
                <Route path="/" element={<RequireAuth><Home /></RequireAuth>}/>
                <Route path="/projects" element={<RequireAuth><Projects/></RequireAuth>}/>
                <Route path="profile" element={<RequireAuth><Profile /></RequireAuth>}/>
                <Route path="/settings" element={<RequireAuth><Settings/></RequireAuth>}/>
                <Route path="/vendor-search" element={<RequireAuth><VendorSearchResults/></RequireAuth>}/>
                <Route path="/customer-search" element={<RequireAuth><CustomerSearchResults/></RequireAuth>}/>
                <Route path="/project-detail" element={<RequireAuth><SearchProjectDetail/></RequireAuth>}/>
                <Route path="/project-bid" element={<RequireAuth><ProjectBid/></RequireAuth>}/>
                <Route path="/customer-project-detail" element={<RequireAuth><CustomerProjectDetail/></RequireAuth>}/>

                <Route
                  path="*"
                  element={<RequireAuth><Home /></RequireAuth>} />

              <Route path="/login" element={<Login />}/>
              <Route path="/company-signup" element={<CompanySignup />}/>
              <Route path="/user-signup/*" element={<UserSignup />}/>
              <Route path="/vendor-signup" element={<VendorSignup />}/>
            </Routes>

          </Container>
        </ErrorBoundary>

      </div>
  );
}

export default App;
