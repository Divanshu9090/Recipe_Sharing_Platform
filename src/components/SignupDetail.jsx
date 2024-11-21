import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import About from "./about.jsx";
import { db, storage } from "../utils/firebase"; // Import Firestore and Storage instances
import { setDoc, doc } from "firebase/firestore"; // Firestore methods
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Storage methods
import "../css/SignupDetail.css";

const SignupDetail = () => {
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState(null);
    const [profileImagePreview, setProfileImagePreview] = useState(null);
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        gender: "",
        dob: "",
        email: "",
        phone: "",
        about: "",
        linkedin: "",
        twitter: "",
        github: "",
    });

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImagePreview(reader.result); // Preview the image
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const userId = formData.email; // Use email as a unique identifier for this example
            let profileImageUrl = "";

            // Upload profile image to Firebase Storage
            if (profileImage) {
                const imageRef = ref(storage, `profileImages/${userId}`);
                await uploadBytes(imageRef, profileImage); // Upload image file
                profileImageUrl = await getDownloadURL(imageRef); // Get the download URL
            }

            // Save user details in Firestore
            await setDoc(doc(db, "users", userId), {
                ...formData,
                profileImage: profileImageUrl, // Save URL instead of Base64
            });

            console.log("User details saved successfully");
            navigate("/home"); // Redirect to MainScreen
        } catch (error) {
            console.error("Error saving user details:", error);
            alert("Failed to save details. Please try again.");
        }
    };

    return (
        <main id="signupdetail">
            <div className="form-container">
                <form id="User-dataform" onSubmit={handleSubmit}>
                    <h2>Bio Data</h2>

                    {/* Image Upload Section */}
                    <div className="image-upload">
                        <div id="uploadSection">
                            <label htmlFor="profileImage" className="image-upload-label">
                                <span>Upload Profile Image</span>
                                <input
                                    id="profileImage"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>
                        {profileImagePreview && (
                            <div id="imagePreviewContainer" className="image-preview">
                                <img src={profileImagePreview} alt="Profile Preview" />
                            </div>
                        )}
                        {profileImagePreview && (
                            <button
                                id="changeImageButton"
                                type="button"
                                onClick={() => {
                                    setProfileImage(null);
                                    setProfileImagePreview(null);
                                }}
                            >
                                Change Image
                            </button>
                        )}
                    </div>

                    <fieldset>
                        <legend>Personal Information</legend>
                        <label htmlFor="firstname">First Name:</label>
                        <input
                            id="firstname"
                            name="firstname"
                            type="text"
                            placeholder="First Name"
                            value={formData.firstname}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="lastname">Last Name:</label>
                        <input
                            id="lastname"
                            name="lastname"
                            type="text"
                            placeholder="Last Name"
                            value={formData.lastname}
                            onChange={handleChange}
                            required
                        />

                        <label>Gender:</label>
                        <div className="radio-group">
                            <label htmlFor="male">
                                <input
                                    id="male"
                                    name="gender"
                                    type="radio"
                                    value="male"
                                    onChange={handleChange}
                                />
                                Male
                            </label>
                            <label htmlFor="female">
                                <input
                                    id="female"
                                    name="gender"
                                    type="radio"
                                    value="female"
                                    onChange={handleChange}
                                />
                                Female
                            </label>
                            <label htmlFor="other">
                                <input
                                    id="other"
                                    name="gender"
                                    type="radio"
                                    value="other"
                                    onChange={handleChange}
                                />
                                Other
                            </label>
                        </div>

                        <label htmlFor="dob">Date of Birth:</label>
                        <input
                            id="dob"
                            name="dob"
                            type="date"
                            value={formData.dob}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="email">Email:</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="example@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="phone">Phone:</label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            pattern="[0-9]{10}"
                            placeholder="1234567890"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="inputBox">About Me:</label>
                        <textarea
                            id="inputBox"
                            name="about"
                            placeholder="Enter your details here..."
                            maxLength="100"
                            value={formData.about}
                            onChange={handleChange}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Social Media Links</legend>
                        <label htmlFor="linkedin">LinkedIn:</label>
                        <input
                            id="linkedin"
                            name="linkedin"
                            type="url"
                            placeholder="https://www.linkedin.com/in/username"
                            value={formData.linkedin}
                            onChange={handleChange}
                        />

                        <label htmlFor="twitter">Twitter:</label>
                        <input
                            id="twitter"
                            name="twitter"
                            type="url"
                            placeholder="https://twitter.com/username"
                            value={formData.twitter}
                            onChange={handleChange}
                        />

                        <label htmlFor="github">GitHub:</label>
                        <input
                            id="github"
                            name="github"
                            type="url"
                            placeholder="https://github.com/username"
                            value={formData.github}
                            onChange={handleChange}
                        />
                    </fieldset>

                    <button type="submit">Submit</button>
                </form>
            </div>
            <About />
        </main>
    );
};

export default SignupDetail;