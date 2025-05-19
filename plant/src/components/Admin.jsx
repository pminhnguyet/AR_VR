import { useNavigate } from 'react-router-dom';

function Admin({ isAdminLoggedIn, setIsAdminLoggedIn }){
    const navigate = useNavigate();
     const handleLogout = () => {
        setIsAdminLoggedIn(false);
        navigate('/');
    };
    return (
        <>
         <div >
            <h2>Chào mừng Admin</h2>
            <button onClick={handleLogout}>Đăng xuất</button>
        </div>
        </>
    )
}
export default Admin;