
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import SongsList from "./components/SavedSongs/SongsList";
import UpdateSong from "./components/SavedSongs/UpdateSong";
import ViewSong from "./components/SavedSongs/ViewSong";
import Cubes from "./components/Cubes"
import Login from "./components/pages/Login";
import Forgot from "./components/pages/Forgot";
import ResetPassword from "./components/pages/ResetPassword";

import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

import './App.css';

import PageNotFound from "./components/PageNotFound/index"

const App = () => {

  return (
    <div className="app-container">
      <BrowserRouter>
        
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/reset-password/:token" element={<ResetPassword/>} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Header />
                <SongsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addSong"
            element={
              <ProtectedRoute >
                <Header />
                <Main />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cubes"
            element={
              <ProtectedRoute >
                <Header />
                <Cubes/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/updateSong/:id"
            element={
              <ProtectedRoute >
                <Header/>
                <UpdateSong />
              </ProtectedRoute>
            }
          />
          <Route
            path="/viewSong/:id"
            element={
              <ProtectedRoute >
                <Header/>
                <ViewSong />
              </ProtectedRoute>
            }
          />
          {/* Redirect any other paths to login if not authenticated */}
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

