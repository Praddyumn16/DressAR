import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; 

import { ClipLoader } from 'react-spinners';

const VirtualTryOn = () => {
  const { productId } = useParams();
  const [productImage, setProductImage] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [apiImage, setApiImage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const productImage = localStorage.getItem('productImage');
    if (productImage) {
        setProductImage(productImage);
    }

    // Fetch the user's uploaded image from local storage
    const uploadedImage = localStorage.getItem('image');
    if (uploadedImage) {
      setUserImage(uploadedImage);
    }
  }, [productId]);

  const fetchImage = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('personImage', userImage);
      formData.append('clothImage', productImage);

      const response = await fetch('https://virtual-try-on2.p.rapidapi.com/clothes-virtual-tryon', {
        method: 'POST',
        headers: {
          'X-RapidAPI-Host': 'virtual-try-on2.p.rapidapi.com',
          'X-RapidAPI-Key': 'b0f172fmshef612bfb1d71cfbp1d284fjsndbf1974d9a8d',
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setApiImage(data.response.ouput_path_img);
        } else {
          console.error('Request failed:', data.message);
        }
      } else {
        console.error('HTTP request failed:', response.status);
      }
    } catch (error) {
      console.error(`Image '${productId}.png' not found in the 'expected' directory`);
    }
    setIsLoading(false);
  };

  if (!productImage || !userImage) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* ... */}
      {isLoading ? (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', marginLeft: '80px' }}>
          <ClipLoader color="#000000" loading={true} size={50} />
          <div>Loading...</div>
        </div>
      ) : apiImage ? (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '1rem' }}>
          <img src={apiImage} alt="API" style={{ width: '300px', height: '300px', objectFit: 'cover', border: '2px solid black' }} />
          <div style={{marginTop: '10px'}}>Generated VirtualTryOn</div>
        </div>
      ) : (
        <button onClick={fetchImage} style={{ margin: '1rem' }}>Generate Virtual Tryon</button>
      )}
    </div>
  );
};

export default VirtualTryOn;