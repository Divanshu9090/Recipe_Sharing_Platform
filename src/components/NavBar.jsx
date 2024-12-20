import React, { useState, useEffect } from "react";
import profile from "../assets/profile.png";
import plus from "../assets/plus.png";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import cb from '../assets/cookbook.png';
import bi from '../assets/bellIcon.png';

function NavBar({ onPlusClick , onUserClick , onLogoClick }) {
    const [userImage, setUserImage] = useState(null);
    const [username, setUsername] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Get the current user and fetch profile details from Firestore
        const auth = getAuth();
        const currentUser = auth.currentUser;
        setUser(currentUser);

        if (currentUser) {
            const firestore = getFirestore();
            const userDoc = doc(firestore, "user", currentUser.uid);

            getDoc(userDoc)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const userData = snapshot.data();
                        setUserImage(userData.profileImage || profile); // Fallback to default image
                        setUsername(userData.firstname+" "+userData.lastname || "Guest"); // Fallback to "Guest" if no username
                    }
                })
                .catch((error) => {
                    console.error("Error fetching user data", error);
                });
        }
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleSignOut = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                // Clear user data on sign out
                setUser(null);
                setUserImage(null);
                setUsername("");
                alert("You have successfully signed out!");
            })
            .catch((error) => {
                console.error("Sign out error", error);
            });
    };

    return (
        <div className="nav">
            <div className="logo">
                <img src={cb} alt="logo" onClick={onLogoClick} />
            </div>
            <div className="menu">
                {user ? (
                    <>
                        <img
                            src={userImage || profile} // Use the user image or a default image
                            alt="Profile"
                            style={{ cursor: "pointer", borderRadius: "50%" }}
                            onClick={toggleDropdown}
                        />
                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                <ul>
                                    <li onClick={() => { onUserClick(); toggleDropdown();}} style={{ cursor: "pointer" }}>
                                        <img
                                            src={userImage || profile} // Use the user image or a default image
                                            alt="Profile"
                                            style={{ borderRadius: "50%" , display: "inline-block" }}
                                        />
                                        <span onClick={toggleDropdown} style={{display: "inline-block",position:"relative",bottom:"10px",left:"10px"}}>{username}</span>
                                    </li>
                                    <li>
                                        <button onClick={handleSignOut}>Sign Out</button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <img
                            src={profile} // Use the user image or a default image
                            alt="Profile"
                            style={{ cursor: "pointer", borderRadius: "50%" }}
                            onClick={toggleDropdown}
                        />
                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                <ul>
                                    <li>
                                        <button>Sign In</button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </>
                )}
                <img src={bi} alt="notification-icon" />
                <img
                    src={plus}
                    alt="Add"
                    onClick={onPlusClick}
                    style={{ cursor: "pointer" }}
                />
            </div>
        </div>
    );
}

export default NavBar;
