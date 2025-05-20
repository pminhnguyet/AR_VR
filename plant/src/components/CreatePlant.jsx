import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import '../styles/CreatePlant.scss';

function CreatePlant() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        quantity: '',
        model3D: '',
        usdz: '',
        image: '',
        categoryId: ''
    });

    const [uploading, setUploading] = useState(false);

    const categoryOptions = [
        { label: 'Kim', value: 1 },
        { label: 'Mộc', value: 2 },
        { label: 'Thủy', value: 3 },
        { label: 'Hỏa', value: 4 },
        { label: 'Thổ', value: 5 }
    ];


    const isTitleEmpty = formData.title.trim() === '';
    const handleChange = (e) => {
        const { name, value } = e.target;
     
        if ((name === 'price' || name === 'quantity') && Number(value) < 0) {
            alert(`${name === 'price' ? 'Giá' : 'Số lượng'} không được nhỏ hơn 0.`);
            return; // Không cập nhật state nếu sai
        }
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpload = async (file, type) => {
        const data = new FormData();
        data.append('file', file);
        data.append('name', file.name);
        data.append('type', type);
        try {
            setUploading(true);
            const res = await fetch('http://localhost:8080/api/file/upload', {
                method: 'POST',
                body: data
            });
            const result = await res.json(); // API trả về plain text là link
            return result.fileUrl;
        } catch (err) {
            console.error('Upload failed:', err);
            return '';
        } finally {
            setUploading(false);
        }
    };

    const handleFileChange = async (e, field, type) => {
        const file = e.target.files[0];
        if (file) {
            const link = await handleUpload(file, type);
            setFormData(prev => ({ ...prev, [field]: link }));
        }
    };

    const handleSubmit = async () => {
        const plant = {
            title: formData.title,
            description: formData.description,
            price: Number(formData.price),
            quantity: Number(formData.quantity),
            model3D: formData.model3D,
            usdz: formData.usdz,
            image: formData.image,
            category: { categoryId: Number(formData.categoryId) }
        };

        try {
            const res = await fetch('http://localhost:8080/api/plant', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(plant)
            });

            if (res.ok) {
                alert('Tạo cây thành công!');
                navigate('/admin');
            } else {
                alert('Tạo cây thất bại!');
            }
        } catch (err) {
            console.error('Error creating plant:', err);
        }
    };


    const customStyles = {
        menu: (provided) => ({
            ...provided,
            backgroundColor: 'white',
            fontFamily: 'Raleway',
            textAlign: 'left'
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#438637' : 'white', // hover và mặc định
            color: state.isFocused ? 'white' : '',
            cursor: 'pointer',
            fontFamily: 'Raleway',
            textAlign: 'left'
        }),
        control: (provided) => ({
            ...provided,
            borderColor: '#438637',
            boxShadow: 'none',
            fontFamily: 'Raleway',
            textAlign: 'left',
            '&:hover': { borderColor: '#109001' }
        }),

    };
    return (
        <div className="create-plant-container">
            <h2>Tạo cây mới</h2>

            <label>Tên cây</label>
            <input name="title" placeholder='Nhập tên cây' value={formData.title} onChange={handleChange} />

            <label>Mô tả</label>
            <textarea name="description" placeholder='Nhập mô tả' value={formData.description} onChange={handleChange} disabled={isTitleEmpty} />

            <label>Giá</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} min="0" disabled={isTitleEmpty} />

            <label>Số lượng</label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} min="0" disabled={isTitleEmpty} />

            <label>Model 3D (.glb)</label>
            <input type="file" accept=".glb" onChange={(e) => handleFileChange(e, 'model3D', 'model3D')} disabled={isTitleEmpty} />
            {formData.model3D && <p>Đã upload: {formData.model3D}</p>}


            <label>Model 3D (.usdz)</label>
            <input type="file" accept=".usdz" onChange={(e) => handleFileChange(e, 'usdz', 'model3D')} disabled={isTitleEmpty} />
            {formData.usdz && <p>Đã upload: {formData.usdz}</p>}

            <label>Ảnh</label>
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'image', 'image')} disabled={isTitleEmpty} />
            {formData.image && <p>Đã upload: {formData.image}</p>}

            <label>Bộ sưu tập</label>
            <Select
                options={categoryOptions}
                styles={customStyles}
                placeholder="-- Chọn bộ sưu tập --"
                value={categoryOptions.find(opt => opt.value === Number(formData.categoryId)) || null}
                onChange={(selectedOption) => {
                    setFormData(prev => ({
                        ...prev,
                        categoryId: selectedOption ? selectedOption.value : ''
                    }));
                }}
                isDisabled={isTitleEmpty}
            />


            <div className="buttons">
                <button className="save-btn" onClick={handleSubmit} disabled={uploading}>Lưu</button>
                <button className="cancel-btn" onClick={() => navigate('/admin')}>Hủy</button>
            </div>
        </div>
    );
}

export default CreatePlant;
