import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Messages from "../pages/Messages";
import MessagePage from "../pages/MessagePage";
import Friends from "../pages/Friends";
import AddFriend from "../pages/AddFriend";
import SidebarLayout from "../layout/SidebarLayout";
import Welcome from "../pages/Welcome";
import EncryptionPage from "../pages/EncryptionPage";
import SettingsPage from "../pages/SettingsPage";
import ProtectedRoute from "../pages/ProtectedRoute";
import MessageView from "../pages/MessageView";
import ComposeMessage from "../pages/ComposeMessage";


export default function AppRouter() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<SidebarLayout />}>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Navigate to="/welcome" replace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/welcome"
            element={
              <ProtectedRoute>
                <Welcome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/encryption"
            element={
              <ProtectedRoute>
                <EncryptionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/compose"
            element={
              <ProtectedRoute>
                <ComposeMessage />
              </ProtectedRoute>
            }
          />
       <Route
            path="/messages/:id"
            element={
              <ProtectedRoute>
                <MessageView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/friends"
            element={
              <ProtectedRoute>
                <Friends />
              </ProtectedRoute>
            }
          />
          <Route
            path="/friends/add"
            element={
              <ProtectedRoute>
                <AddFriend />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
