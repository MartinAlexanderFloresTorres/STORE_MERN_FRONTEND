import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import useAuth from '../hooks/useAuth';

const Dashboard = () => {
	// useAuth
	const { autenticando, autenticado } = useAuth();

	// autenticado¡
	const auth = autenticado();

	// mientras se autentica que muestre el loading
	if (autenticando && !auth) {
		return (
			<section className='overlay overlay--bienvenido'>
				<div>
					<h2>Bienvenido</h2>
					<div className='spinner'>
						<div className='bounce1'></div>
						<div className='bounce2'></div>
						<div className='bounce3'></div>
					</div>
				</div>
			</section>
		);
	}
	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
};

export default Dashboard;
