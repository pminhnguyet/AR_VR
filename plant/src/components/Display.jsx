import React, { useState, useEffect } from "react";
import "../styles/Display.scss";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Select from 'react-select';

function Display() {
    const [models, setModels] = useState([]);
    const [filteredModels, setFilteredModels] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Tất cả");
    const [searchQuery, setSearchQuery] = useState("");
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

    useEffect(() => {
        let result = models;

        // if (selectedCategory === "Tất cả") {
        //     setFilteredModels(models);
        // } else {
        //     const filtered = models.filter(model => model.category === selectedCategory);
        //     setFilteredModels(filtered);
        // }

        if (selectedCategory !== "Tất cả") {
            result = result.filter(model => model.category === selectedCategory);
        }

        if (searchQuery.trim() !== "") {
            const lowerSearch = searchQuery.toLowerCase();
            result = result.filter(
                (model) => model.title.toLowerCase().includes(lowerSearch) ||
                    model.category.toLowerCase().includes(lowerSearch)
            );
        }
        setFilteredModels(result);
    }, [selectedCategory, searchQuery, models]);


    const categoryOptions = [
        { value: 'Tất cả', label: 'Tất cả' },
        { value: 'Kim', label: 'Kim' },
        { value: 'Mộc', label: 'Mộc' },
        { value: 'Thủy', label: 'Thủy' },
        { value: 'Hỏa', label: 'Hỏa' },
        { value: 'Thổ', label: 'Thổ' }
    ];

    const customStyles = {
        menu: (provided) => ({
            ...provided,
            backgroundColor: 'white',
            fontFamily: 'Raleway'
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#438637' : 'white', // hover và mặc định
            color: state.isFocused ? 'white' : '',
            cursor: 'pointer',
            fontFamily: 'Raleway'
        }),
        control: (provided) => ({
            ...provided,
            borderColor: '#438637',
            boxShadow: 'none',
             fontFamily: 'Raleway',
            '&:hover': { borderColor: '#109001' }
        }),

    };


    const handleClick = (id) => {
        navigate(`/detail/${id}`);
    };


    return (
        <>
            <div className="display">
                <div className="block_1">
                    <div className="filter-container">
                        <label className="filter-label">Bộ sưu tập: </label>
                        <Select
                            value={categoryOptions.find(option => option.value === selectedCategory)}
                            onChange={(selectedOption) => setSelectedCategory(selectedOption.value)}
                            options={categoryOptions}
                            styles={customStyles}
                            className="filter-select"
                            classNamePrefix="react-select"
                        > </Select>
                    </div>

                    <div className="search-container">
                        {/* <label className="search-label">Tìm kiếm: </label> */}
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Nhập tên cây hoặc bộ sưu tập"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                    </div>
                </div>

                <div className="gallery-container">
                    <div className="card-grid">
                        {Array.isArray(filteredModels) && filteredModels.map((model) => (
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
            </div>

        </>

    );
}

export default Display;
