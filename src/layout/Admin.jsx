import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Admin = () => {
	// useAuth
	const { usuario } = useAuth();

	// Si no hay usuario, redireccionar a donde estaba
	if (usuario?.rol !== 'admin') {
		return <Navigate to={'/empresa'} />;
	}
	return <Outlet />;
};

export default Admin;
