/* eslint-disable react/prop-types */
import PreviaProductoLoader from './PreviaProductoLoader';

const ColeccionesLoader = ({ banner, ...props }) => {
	return (
		<section {...props}>
			{banner && (
				<div className='banner loader-imagen loader-imagen1s'>
					<div className='banner__contenido contenedor'>
						<div className='banner__item w-full'>
							<div className='loader-item p-2'></div>
							<div className='loader-item p-1' style={{ width: 500 }}></div>
							<div className='loader-item p-1' style={{ width: 400 }}></div>
							<div className='loader-item p-1' style={{ width: 300 }}></div>
						</div>
					</div>
				</div>
			)}
			<div className='contenedor'>
				<div className='inicio__loaderTop'>
					<div className='loader-item'></div>
					<div className='loader-item'></div>
				</div>
				<div className='inicio__loaderGrid p-3'>
					<PreviaProductoLoader className='width' />
					<PreviaProductoLoader className='width' />
					<PreviaProductoLoader className='width' />
					<PreviaProductoLoader className='width' />
					<PreviaProductoLoader className='width' />
					<PreviaProductoLoader className='width' />
					<PreviaProductoLoader className='width' />
					<PreviaProductoLoader className='width' />
					<PreviaProductoLoader className='width' />
					<PreviaProductoLoader className='width' />
				</div>
			</div>
		</section>
	);
};

ColeccionesLoader.defaulProps = {
	banner: true,
};
export default ColeccionesLoader;
