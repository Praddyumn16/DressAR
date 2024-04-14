import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; 

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleVirtualTryOn = (productId, productImage) => {
    // Store the product image in local storage
    localStorage.setItem('productImage', productImage);
    navigate(`/virtual-try-on/${productId}`);
  };

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch('https://api.unsplash.com/search/photos?query="model clothing"&client_id=22sZ2rMNkQTs4gz80TASfXk_HFCsXzRzxEKxcFEZPD4&per_page=6');
      const data = await response.json();
      const newProducts = data.results.map((img, index) => ({
        id: index + 1,
        name: img.alt_description || 'Product ' + (index + 1),
        price: '$' + ((index + 1) * 100),
        image: img.urls.small
      }));
      
      setProducts(newProducts);
    };
  
    fetchImages();
  }, []);

  return (
    <>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: 'lightgray' }}>
            <h1 style={{ color: 'light' }}>DressAR - Dressing the Future</h1>
            <Link to="/profile"><FaUserCircle size={30} style={{ color: 'light' }} /></Link>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', padding: '1rem' }}>
            {products.map((product) => (
            <div key={product.id} style={{ flex: '1 0 30%', maxWidth: '30%', padding: '1rem', border: '1px solid blue', borderRadius: '0.25rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '1rem' }}>
                  <img src={product.image} style={{ marginBottom: '1rem', objectFit: 'cover', height: '300px', width: '100%' }} />
                  <h5>{product.name}</h5>
                  <p>{product.description}</p>
                  <p>{product.price}</p>
                  <div style={{ display: 'flex', justifyContent: 'center', margin: '5px' }}>
                  <button onClick={() => handleVirtualTryOn(product.id, product.image)} style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '0.375rem 0.75rem', borderRadius: '0.25rem', cursor: 'pointer', marginRight: '10px'}}>Virtual Try On</button>  
                  <button style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '0.375rem 0.75rem', borderRadius: '0.25rem', cursor: 'pointer', marginLeft: '10px' }}>Add to Cart</button>
                  </div>
                </div>
            </div>
            ))}
        </div>
    </>
  );
}

export default Home;