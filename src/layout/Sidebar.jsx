import React from "react";
import { NavLink } from "react-router-dom";
import { TbMessageCircle, TbUser, TbLock, TbSettings, TbLogout } from "react-icons/tb";
import "../styles/Sidebar.css";
import messageIcon from "../assets/message.svg";
import friendsIcon from "../assets/friends.svg";
import lockIcon from "../assets/lock.svg";
import settingsIcon from "../assets/settings.svg";
import logoutIcon from "../assets/logout.svg";
import protectIcon from "../assets/svg.svg";



export default function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="header">
                <a href="/">
                    <span className="logoIcon"><img src={protectIcon} alt="" /></span>
                    <span className="logoText">Secure Transfer</span>
                </a>
            </div>

            <nav className="nav">
                <NavItem
                    to="/messages"
                    icon={<img src={messageIcon} alt="Messages" style={{ width: 24, height: 24, marginRight: 10 }} />}
                    label="Messages"
                />
                <NavItem
                    to="/friends"
                    icon={<img src={friendsIcon} alt="friends" style={{ width: 24, height: 24, marginRight: 10 }} />}
                    label="Friends"
                />
                <NavItem
                    to="/encryption"
                    icon={<img src={lockIcon} alt="encryption" style={{ width: 24, height: 24, marginRight: 10 }} />}
                    label="Encryption"
                />
                <NavItem
                    to="/settings"
                    icon={<img src={settingsIcon} alt="settings" style={{ width: 24, height: 24, marginRight: 10 }} />}
                    label="Settings"
                />
            </nav>

            <button className="composeBtn">COMPOSE</button>

            <div className="bottomArea">
                <div className="logoutItem">
                    <NavItem
                        to="/login"
                        icon={<img src={logoutIcon} alt="login" style={{ width: 24, height: 24, marginRight: 10 }} />}
                        label="Logout"
                    />

                </div>
            </div>
        </aside>
    );
}

function NavItem({ to, icon, label }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) => "navItem" + (isActive ? " active" : "")}
        >
            <span className="navIcon">{icon}</span>
            {label}
        </NavLink>
    );
}
