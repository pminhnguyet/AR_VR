import React, { useState, useEffect } from "react";
import "../styles/Display.scss";
import { useNavigate } from "react-router-dom";

function Display() {
    const [models, setModels] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/api/plant")
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched data:", data);
                setModels(data.content); 
            })
            .catch((err) => console.error("Lỗi khi fetch models:", err));
    }, []);

    const handleClick = (id) => {
        navigate(`/detail/${id}`);
    };

    return (
        <div className="gallery-container">
            <div className="card-grid">
                {Array.isArray(models) && models.map((model) => (
                    <div
                        key={model.id}
                        className="plant-card"
                        onClick={() => handleClick(model.id)}
                    >
                        <div className="image-wrapper">
                            <img
                                src={model.image}
                                alt={model.title}
                                className="plant-image"
                            />
                        </div>
                        <p className="plant-name">{model.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Display;
