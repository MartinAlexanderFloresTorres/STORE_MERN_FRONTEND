/* eslint-disable react/prop-types */
import { useState } from 'react';
import '../../styles/Desplegable.css';

const Desplegable = ({ active, titulo, children, ...props }) => {
	const [estado, setEstado] = useState(active);

	return (
		<div {...props}>
			<div className={`${estado ? 'active' : ''} desplegable`}>
				<button
					title={estado ? 'Contraer' : 'Desplegar'}
					className='desplegable__boton'
					onClick={() => setEstado(!estado)}
				>
					<h2 className='desplegable__titulo'>{titulo}</h2>

					<div className='despegable__icono'></div>
				</button>
				<div className='desplegable__contenido'>
					<div>{children}</div>
				</div>
			</div>
		</div>
	);
};

Desplegable.defaultProps = {
	titulo: 'Titulo Aqui...',
	active: false,
};
export default Desplegable;
