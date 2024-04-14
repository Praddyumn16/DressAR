import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; 
import placeholderImage from '../assets/images/user-placeholder.png'

const Profile = () => {
  const [image, setImage] = useState(localStorage.getItem('image') || null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const fileInputRef = useRef();

  useEffect(() => {
    if (image) {
      setIsImageUploaded(true);
    }
  }, [image]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
      localStorage.setItem('image', reader.result);
      setIsImageUploaded(true);
    };

    reader.readAsDataURL(file);
  };

  const handleImageRemove = () => {
    setImage(null);
    localStorage.removeItem('image');
    setIsImageUploaded(false);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: 'lightgray' }}>
          <h1 style={{ color: 'light' }}>DressAR - Dressing the Future</h1>
          <Link to="/home"><FaArrowLeft size={30} style={{ color: 'light' }} /></Link>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <img src={image || placeholderImage} alt="Profile" style={{ width: '450px', height: '450px', objectFit: 'contain' }} />
        <input type="file" style={{ display: 'none' }} ref={fileInputRef} onChange={handleImageUpload} />
          {isImageUploaded ? (
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '220px' }}>
              <button onClick={handleClick} style={{ margin: '10px 0' }}>Update Image</button>
              <button onClick={handleImageRemove} style={{ margin: '10px 0' }}>Remove Image</button>
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <button onClick={handleClick} style={{ margin: '10px 0' }}>Upload Image</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;