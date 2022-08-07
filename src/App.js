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
// import ProjectBid from './app/Projects/ProjectBid';
import { Container, createTheme } from "@mui/material";
import CustomerProjectDetail from './app/Projects/CustomerProjectDetail';
import RequireAuth from './app/Auth/RequireAuth';
import Login from './app/Login/Login';
import UserSignup from './app/Login/UserSignup';
import VendorSignup from './app/Login/vendor/VendorSignup';
import CompanySignup from './app/Login/CompanySignup';
import {ErrorBoundary} from 'react-error-boundary'
import ErrorFallback from './app/ErrorBoundary/ErrorBoundary';
import CustomerSignup from './app/Login/customer/CustomerSignup';
import VendorProjectDetail from './app/Projects/VendorProjectDetail';
import { ThemeProvider } from '@mui/system';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#34477f',
      light: '#3f4f7d',
    },
    secondary: {
      main: '#1b60a0',
      light: '#457baf',
      dark: '#12436f',
      contrastText: '#ffffff',
    },
    text: {
      disabled: 'rgba(146,146,146,0.38)',
      primary: 'rgba(0,0,0,0.87)',
      secondary: 'rgba(49,49,49,0.54)',
    },
    warning: {
      main: '#667123',
    },
  },
  typography: {
    body1: {
      fontSize: '1.2rem',
    },
    subtitle1: {
      fontSize: '1.1rem',
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: '1rem',
    },
    caption: {
      fontSize: '0.9rem',
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      lineHeight: 1.48,
      letterSpacing: '0em',
    }
  },
  components: {
    MuiInputBase: {
      "defaultProps": {
        "size": "small"
      },
      styleOverrides: {
        "sizeSmall": {
          "fontSize": "1em"
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        InputLabelProps: {
          size: "small",
          sx: {
            fontSize: 17
          }
        }
      }
    },
  }
});

function App() {
  
  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{ minWidth: "960px" }}>
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
                <Route path="/vendor-search-results" element={<RequireAuth><VendorSearchResults/></RequireAuth>}/>
                <Route path="/customer-search-results" element={<RequireAuth><CustomerSearchResults/></RequireAuth>}/>
                <Route path="/project-detail" element={<RequireAuth><SearchProjectDetail/></RequireAuth>}/>
                {/* <Route path="/project-bid" element={<RequireAuth><ProjectBid/></RequireAuth>}/> */}
                <Route path="/customer-project-detail" element={<RequireAuth><CustomerProjectDetail/></RequireAuth>}/>
                <Route path="/vendor-project-detail" element={<RequireAuth><VendorProjectDetail /></RequireAuth>}/>
                <Route
                  path="*"
                  element={<RequireAuth><Home /></RequireAuth>} />

              <Route path="/login" element={<Login />}/>
              <Route path="/company-signup" element={<CompanySignup />}/>
              <Route path="/user-signup/*" element={<UserSignup />}/>
              <Route path="/vendor-signup" element={<VendorSignup />}/>
              <Route path="/customer-signup" element={<CustomerSignup />}/>
            </Routes>

          </Container>
        </ErrorBoundary>

      </div>
      </ThemeProvider>
  );
}

export default App;
