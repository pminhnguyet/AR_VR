import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import Select from 'react-select';
import { FaPlus } from "react-icons/fa6";
import { ImBin } from "react-icons/im";
import { AiOutlineEdit } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import '../styles/Admin.scss';

function Admin({ isAdminLoggedIn, setIsAdminLoggedIn }) {
    const navigate = useNavigate();
    const [plants, setPlants] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('Tất cả');
    const [sortField, setSortField] = useState('id');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handleLogout = () => {
        setIsAdminLoggedIn(false);
        navigate('/');
    };

    const fetchPlants = async () => {
        try {
            const res = await fetch('http://localhost:8080/api/plant');
            const data = await res.json();
            setPlants(data.content);
        } catch (err) {
            console.error('Lỗi khi fetch dữ liệu:', err);
        }
    };

    useEffect(() => {
        fetchPlants();
    }, []);


    // const handleSort = (selectedOption) => {
    //     const field = selectedOption.value;

    //     if (sortField === field) {
    //         setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    //     } else {
    //         setSortField(field);
    //         setSortOrder('asc');
    //     }
    // };
    const handleSort = (selectedOption) => {
        const field = typeof selectedOption === 'string' ? selectedOption : selectedOption.value;

        if (sortField === field) {
            setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };


    const handleFilterChange = (selectedOption) => {
        setFilter(selectedOption.value);
    };

    const filteredPlants = plants
        .filter((plant) => {
            const keyword = search.toLowerCase();
            const matchSearch =
                plant.id.toString().includes(keyword) ||
                plant.title.toLowerCase().includes(keyword) ||
                plant.category.toLowerCase().includes(keyword);

            const matchFilter = filter === 'Tất cả' || plant.category === filter;

            return matchSearch && matchFilter;
        })
        .sort((a, b) => {
            if (!sortField) return 0;
            const valueA = a[sortField];
            const valueB = b[sortField];
            if (typeof valueA === 'string') {
                return sortOrder === 'asc'
                    ? valueA.localeCompare(valueB)
                    : valueB.localeCompare(valueA);
            }
            return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
        });

    const totalPages = Math.ceil(filteredPlants.length / itemsPerPage);
    const paginatedPlants = filteredPlants.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const categoryOptions = [
        { value: 'Tất cả', label: 'Tất cả' },
        { value: 'Kim', label: 'Kim' },
        { value: 'Mộc', label: 'Mộc' },
        { value: 'Thủy', label: 'Thủy' },
        { value: 'Hỏa', label: 'Hỏa' },
        { value: 'Thổ', label: 'Thổ' }
    ];

    const sortOptions = [
        { value: 'id', label: 'ID' },
        { value: 'title', label: 'Tên' },
        { value: 'category', label: 'Bộ sưu tập' },
        { value: 'quantity', label: 'Số lượng' }
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

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Bạn chắc chắn muốn xóa sản phẩm này?');
        if (!confirmDelete) return;

        try {
            const res = await fetch(`http://localhost:8080/api/plant/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                // Xóa thành công, load lại danh sách
                fetchPlants();
            } else {
                alert('Xóa sản phẩm thất bại!');
            }
        } catch (error) {
            alert('Lỗi khi xóa sản phẩm!');
            console.error(error);
        }
    };


    return (
        <div className="admin-container">
            <div className="admin-header">
                <h2>Role: Admin</h2>
                <button onClick={handleLogout}>Đăng xuất</button>
            </div>




            <div className="controls">

                <div className="left-part">
                    <div className="filter-group">
                        <label>Bộ lọc:</label>
                        <Select
                            value={categoryOptions.find(option => option.value === filter)}
                            onChange={handleFilterChange}
                            options={categoryOptions}
                            styles={customStyles}
                            className="filter-select"
                        />

                    </div>

                    <div className="sort-group">
                        <label>Sắp xếp theo:</label>
                        {/* <select value={sortField} onChange={(e) => handleSort(e.target.value)}>
                        <option value="id">ID</option>
                        <option value="title">Tên</option>
                        <option value="category">Bộ sưu tập</option>
                        <option value="quantity">Số lượng</option>
                    </select> */}
                        <Select
                            value={sortOptions.find(option => option.value === sortField)}
                            onChange={handleSort}
                            options={sortOptions}
                            styles={customStyles}
                            className="sort-select"
                        />


                    </div>
                </div>

                <div className="right-part">
                    <div className="search-group">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="ID, tên, bộ sưu tập..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="search-input"
                        />
                    </div>
                    <button className="create-btn" onClick={() => navigate("/admin/create")}>
                        <div className="plus"><FaPlus /></div>
                        Tạo mới
                    </button>
                </div>


            </div>

            <table className="plant-table">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('id')}>
                            <div className="table-title">
                                ID
                                {/* <div>{sortField === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}</div> */}
                                <div>{sortField === "id" ? (sortOrder === "asc" ? "↑" : "↓") : ""}</div>
                            </div>
                        </th>
                        <th onClick={() => handleSort('title')}>
                            <div className="table-title">
                                Tên
                                <div>{sortField === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}</div></div>
                        </th>
                        <th onClick={() => handleSort('category')}>
                            <div className="table-title">
                                Bộ sưu tập
                                <div> {sortField === 'category' && (sortOrder === 'asc' ? '↑' : '↓')}</div></div>
                        </th>
                        <th onClick={() => handleSort('quantity')}>
                            <div className="table-title">
                                Số lượng
                                <div>    {sortField === 'quantity' && (sortOrder === 'asc' ? '↑' : '↓')}</div></div>
                        </th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedPlants.map((plant) => (
                        <tr key={plant.id}>
                            <td>{plant.id}</td>
                            <td>{plant.title}</td>
                            <td>{plant.category}</td>
                            <td>{plant.quantity}</td>
                            <td>
                                <button className="view-btn" onClick={() => navigate(`/detail/${plant.id}`)}><FaEye size={18} /></button>
                                <button className="edit-btn" onClick={() => navigate(`/admin/edit/${plant.id}`)}><AiOutlineEdit size={18} /></button>
                                <button className="delete-btn" onClick={() => handleDelete(plant.id)} ><ImBin size={18} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                >
                    &lt;
                </button>
                <span>Trang {currentPage} / {totalPages}</span>
                <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    &gt;
                </button>
            </div>
        </div>
    );
}

export default Admin;
