import React from "react";
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


export default function AppRouter(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<SidebarLayout />}>
          <Route path="/" element={<Navigate to="/welcome" replace />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/encryption" element={<EncryptionPage />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/messages/:id" element={<MessagePage />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/friends/add" element={<AddFriend />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>  
  );
}
