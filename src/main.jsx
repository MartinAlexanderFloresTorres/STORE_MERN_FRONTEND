import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthProvider from './providers/AuthProvider';
import ColeccionesProvider from './providers/ColeccionesProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AuthProvider>
			<ColeccionesProvider>
				<App />
				<ToastContainer
					position='top-right'
					autoClose={2000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover={false}
				/>
			</ColeccionesProvider>
		</AuthProvider>
	</React.StrictMode>
);
