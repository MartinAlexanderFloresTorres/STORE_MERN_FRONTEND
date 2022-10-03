import ClienteAxios from '../config/ClienteAxios';

const getOfertas = async ({ orden = '', page, genero = 'Hombre' }) => {
	if (orden === '') orden = 'descuento-mayor-menor';
	return await ClienteAxios(
		`/productos/ofertas/semana?page=${page}&genero=${genero}&orden=${orden}`
	);
};

export default getOfertas;
