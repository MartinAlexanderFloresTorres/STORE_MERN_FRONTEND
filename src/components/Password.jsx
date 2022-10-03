/* eslint-disable react/prop-types */
import { useState } from 'react';

const Password = ({ ...props }) => {
	const [visible, setVisible] = useState(false);
	const { value } = props;
	return (
		<div className='password'>
			<input value={value} {...props} type={visible ? 'text' : 'password'} />
			{value?.length > 0 && (
				<button
					type='button'
					className='password__boton'
					onClick={() => setVisible(!visible)}
				>
					{visible ? 'Ocultar' : 'Mostrar'}
				</button>
			)}
		</div>
	);
};

export default Password;
