import ClienteAxios from '../config/ClienteAxios';

const setCrearCuenta = async data => {
	return await ClienteAxios.post('/usuarios/registro', data);
};

export default setCrearCuenta;
