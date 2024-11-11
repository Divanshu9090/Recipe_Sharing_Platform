import React, { useState } from 'react';
import '../css/uploadPage.css';
import About from './about.jsx';

function UploadPage({ selectedCategory }) {
    const [photos, setPhotos] = useState([]);
    const [recipeName, setRecipeName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [procedure, setProcedure] = useState('');
    const [calorieCount, setCalorieCount] = useState('');
    const [nutritionValues, setNutritionValues] = useState('');
    const [tags, setTags] = useState([]);

    const handlePhotoUpload = (event) => {
        const files = Array.from(event.target.files);
        setPhotos((prevPhotos) => [...prevPhotos, ...files.slice(0, 5 - photos.length)]);
    };

    const handleTagAdd = () => {
        const newTag = document.getElementById("tagInput").value;
        if (newTag && !tags.includes(newTag)) {
            setTags((prevTags) => [...prevTags, newTag]);
            document.getElementById("tagInput").value = ""; // Clear the input
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log({ photos, recipeName, ingredients, procedure, calorieCount, nutritionValues, tags });
    };

    return (
        <div className="upload-page">
            <h2>Category: {selectedCategory}</h2>

            <form onSubmit={handleFormSubmit} className="upload-form">
                {/* Photo Upload Section */}
                <div className="form-section">
                    <label>Photo</label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        disabled={photos.length >= 5}
                    />
                    <p>{photos.length < 5 ? 'or drag and drop up to 5 photos' : 'Photo limit reached'}</p>
                </div>

                {/* Recipe Name */}
                <div className="form-section">
                    <label>Recipe Name</label>
                    <input
                        type="text"
                        placeholder="What do you call your recipe?"
                        value={recipeName}
                        onChange={(e) => setRecipeName(e.target.value)}
                    />
                </div>

                {/* Ingredients */}
                <div className="form-section">
                    <label>Ingredients</label>
                    <textarea
                        placeholder="List your ingredients"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                    />
                </div>

                {/* Procedure */}
                <div className="form-section">
                    <label>Procedure</label>
                    <textarea
                        placeholder="How do you cook your recipe?"
                        value={procedure}
                        onChange={(e) => setProcedure(e.target.value)}
                    />
                </div>

                {/* Calorie Count */}
                <div className="form-section">
                    <label>Calorie Count</label>
                    <input
                        type="number"
                        placeholder="What's your calorie count?"
                        value={calorieCount}
                        onChange={(e) => setCalorieCount(e.target.value)}
                    />
                </div>

                {/* Nutrition Values */}
                <div className="form-section">
                    <label>Nutrition Values</label>
                    <textarea
                        placeholder="List your nutrition values"
                        value={nutritionValues}
                        onChange={(e) => setNutritionValues(e.target.value)}
                    />
                </div>

                {/* Recipe Tags */}
                <div className="form-section tags-section">
                    <label>Recipe Tags</label>
                    <input
                        id="tagInput"
                        type="text"
                        placeholder="Add a tag"
                    />
                    <button type="button" onClick={handleTagAdd}>+</button>
                    <div className="tags-container">
                        {tags.map((tag, index) => (
                            <span key={index} className="tag">{tag}</span>
                        ))}
                    </div>
                </div>

                <button type="submit" className="submit-button">Post Recipe</button>
            </form>
        </div>
    );
}

export default UploadPage;
