import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GLBViewer from './GLBViewer';
import Select from 'react-select';
import '../styles/EditPlant.scss';





function EditPlant() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [plant, setPlant] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
        model3D: '',
        usdz: '',
        image: ''
    });

    useEffect(() => {
        fetch(`http://localhost:8080/api/plant/${id}`)
            .then(res => res.json())
            .then(data => {
                setPlant(data);
                setFormData(data);
                // setFormData({
                //     ...data,
                //     category: { categoryId: data.category?.categoryId || 1 } // default 1 nếu không có
                // });
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if ((name === 'price' || name === 'quantity') && Number(value) < 0) {
            alert(`${name === 'price' ? 'Giá' : 'Số lượng'} không được nhỏ hơn 0.`);
            return; // Không cập nhật state nếu sai
        }
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = async (file, type) => {
        const data = new FormData();
        data.append("file", file);
        data.append("name", file.name);
        data.append("type", type);

        const res = await fetch('http://localhost:8080/api/file/upload', {
            method: 'POST',
            body: data
        });
        const url = await res.json(); // hoặc .json() tùy backend
        return url.fileUrl;
    };

    const handleFileChange = async (e, type) => {
        const file = e.target.files[0];
        if (!file) return;
        const url = await handleFileUpload(file, type);
        setFormData(prev => ({ ...prev, [type]: url }));
    };

    const handleSubmit = async () => {
        console.log("Giá trị formData hiện tại:", formData);
        const categoryObj = categoryOptions.find(opt => opt.label === formData.category);
        const payload = {
            ...formData,
            category: {
                categoryId: categoryObj?.value || 1 // fallback nếu không tìm thấy
            },
            price: Number(formData.price),
            quantity: Number(formData.quantity)
        };

        console.log("Payload gửi đi:", payload);
        try {
            const res = await fetch(`http://localhost:8080/api/plant/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                alert("Cập nhật thành công!");
                navigate('/admin');
            } else {
                alert("Cập nhật thất bại!");
            }
        } catch (err) {
            alert("Lỗi khi cập nhật!");
            console.error(err);
        }
    };

    const categoryOptions = [
        { label: 'Kim', value: 1 },
        { label: 'Mộc', value: 2 },
        { label: 'Thủy', value: 3 },
        { label: 'Hỏa', value: 4 },
        { label: 'Thổ', value: 5 }
    ];
    const customStyles = {
        menu: (provided) => ({
            ...provided,
            backgroundColor: 'white',
            fontFamily: 'Raleway',
            textAlign: 'left',

        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#438637' : 'white', // hover và mặc định
            color: state.isFocused ? 'white' : '',
            cursor: 'pointer',
            fontFamily: 'Raleway',
            textAlign: 'left',

        }),
        control: (provided) => ({
            ...provided,
            borderColor: '#438637',
            boxShadow: 'none',
            fontFamily: 'Raleway',
            textAlign: 'left',
            '&:hover': { borderColor: '#109001' },

        }),

    };

    if (!plant) return <div>Đang tải...</div>;

    return (
        <div className="edit-container">
            <h2>Chỉnh sửa cây #{id}</h2>
            <div className="form-group">
                <label>Tên</label>
                <input name="title" value={formData.title} onChange={handleChange} />

                <label>Mô tả</label>
                <textarea name="description" value={formData.description} onChange={handleChange} />

                <label>Giá</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} />

                <label>Số lượng</label>
                <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />

                <label>Bộ sưu tập</label>
                {/* <select name="category" value={formData.category} onChange={handleChange}>
                    <option value="Kim">Kim</option>
                    <option value="Mộc">Mộc</option>
                    <option value="Thủy">Thủy</option>
                    <option value="Hỏa">Hỏa</option>
                    <option value="Thổ">Thổ</option>
                </select> */}
                <Select
                    name="category"
                    value={categoryOptions.find(option => option.label === formData.category)}
                    onChange={(selectedOption) =>
                        setFormData(prev => ({ ...prev, category: selectedOption.label }))

                    }
                    options={categoryOptions}
                    styles={customStyles}

                />




                <label>Model 3D (.glb)</label>
                <input type="file" onChange={(e) => handleFileChange(e, 'model3D')} />
                {/* {formData.model3D && <a href={formData.model3D} target="_blank" rel="noreferrer">Xem model</a>} */}
                <div className="view-model">
                    {formData.model3D && <GLBViewer url={formData.model3D} />}
                </div>


                <label>Model 3D (.usdz)</label>
                <input type="file" onChange={(e) => handleFileChange(e, 'usdz')} />
                {/* {formData.usdz && <a href={formData.usdz} target="_blank" rel="noreferrer">Xem USDZ</a>} */}
                {formData.usdz && (
                    <a href={formData.usdz} target="_blank" rel="noreferrer">
                        {formData.usdz}
                    </a>
                )}

                <label>Hình ảnh</label>
                <input type="file" onChange={(e) => handleFileChange(e, 'image')} />
                {formData.image && <img src={formData.image} alt="preview" height={100} />}


            </div>

            <div className="action-buttons">
                <button className="save-btn" onClick={handleSubmit}>Cập nhật</button>
                <button className="cancel-btn" onClick={() => navigate('/admin')}>Hủy</button>
            </div>
        </div>
    );
}

export default EditPlant;





