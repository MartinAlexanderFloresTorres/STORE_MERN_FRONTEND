import ClienteAxios from '../config/ClienteAxios';

const setPedido = async ({ datos, productos, total }) => {
	const getToken = localStorage.getItem('token-ecommerce');
	return await ClienteAxios.post(
		`/pedidos`,
		{
			datos,
			productos,
			total,
		},
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${getToken}`,
			},
		}
	);
};

export default setPedido;
