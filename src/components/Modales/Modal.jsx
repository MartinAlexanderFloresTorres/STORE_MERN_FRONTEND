/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { overflowBody } from '../../helpers';
import '../../styles/Modal.css';

const Modal = ({
	estado,
	setEstado,
	titulo,
	bg,
	radius,
	container,
	border,
	children,
}) => {
	useEffect(() => {
		overflowBody(estado);
	}, [estado]);

	return (
		<section
			className={`${estado ? 'aparecer' : 'desaparecer'} modal1`}
			style={{ background: bg }}
			onClick={e => e.target.classList.contains('modal1') && setEstado(false)}
		>
			<div className='modal1__scroll'>
				<section
					className='modal1__item'
					style={{ maxWidth: container, borderWidth: border ? '1px' : '0px' }}
				>
					<button
						className='modal1__cerrar'
						onClick={() => setEstado(false)}
						title='cerrar'
					>
						<XMarkIcon />
					</button>

					<div style={{ borderRadius: radius }}>
						{titulo && <h2 className='modal1__encabezado'>{titulo}</h2>}
						<div className='modal1__center'>{children}</div>
					</div>
				</section>
			</div>
		</section>
	);
};

Modal.defaultProps = {
	titulo: '',
	bg: 'rgba(0,0,0,0.5)',
	radius: '0',
	estado: false,
	container: '800px',
	border: true,
	setEstado: () => {},
};
export default Modal;
