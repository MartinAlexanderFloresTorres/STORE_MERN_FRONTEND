import { useContext } from 'react';
import ColeccionesContext from '../contexts/ColeccionesContext';

const useColecciones = () => {
	return useContext(ColeccionesContext);
};

export default useColecciones;
