import CategoriasProducto from '../../../components/CategoriasProducto/CategoriasProducto';

const MostrarColecciones = () => {
	return (
		<section className='contenedor'>
			<CategoriasProducto titulo={'Todas las colecciones'} admin={true} />
		</section>
	);
};

export default MostrarColecciones;
