import PreviaProducto from '../../components/ColeccionProducto/PreviaProducto';
import useColecciones from '../../hooks/useColecciones';
import '../../styles/Favoritos.css';

const Favoritos = () => {
	// useColecciones
	const { favoritos } = useColecciones();

	return (
		<section>
			<div className='favoritos__top'>
				<h2 className='titulo'>Mis favoritos</h2>
				<p className='texto'>
					Los productos que has marcado como favoritos ♥, Estaran todos aquí.
				</p>
			</div>

			{favoritos.length === 0 ? (
				<div className='border--top favoritos__top'>
					<h2 className='titulo'>Añade Productos</h2>
					<p className='texto'>
						Los productos que añadas a Favoritos se guardarán aquí.
					</p>
				</div>
			) : (
				<div className='favoritos'>
					<p className='favoritos__titulo'>
						Favoritos <span>({favoritos.length.toString()})</span>
					</p>
					<div className='favoritos__grid'>
						{favoritos.map(producto => (
							<PreviaProducto
								key={producto._id}
								producto={producto}
								className='width'
							/>
						))}
					</div>
				</div>
			)}
		</section>
	);
};

export default Favoritos;
