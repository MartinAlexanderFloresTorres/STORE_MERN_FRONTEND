import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Asidebar from '../containers/Asidebar';
import useAuth from '../hooks/useAuth';

const Auth = () => {
	// useAuth
	const { autenticado } = useAuth();

	// useLocation
	const location = useLocation();

	// autenticado¡
	const auth = autenticado();

	// Si no esta autenticado lo redirecciona a la pagina de inicio
	if (!auth) {
		return <Navigate to='/cuenta/iniciar-sesion' state={location} />;
	}

	return (
		<Asidebar>
			<Outlet />
		</Asidebar>
	);
};

export default Auth;
