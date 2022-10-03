import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Pagination, Keyboard } from 'swiper';
import { breakpoints } from '../helpers';
import PreviaProducto from './ColeccionProducto/PreviaProducto';
import useColecciones from '../hooks/useColecciones';

import '../styles/VistosRecientemente.css';

const VistosRecientemente = ({ ...props }) => {
	// useColecciones
	const { vistos } = useColecciones();

	return (
		<section {...props}>
			{vistos.length > 0 && (
				<div className='vistosRecientemente'>
					<h2>Vistos Recientemente</h2>
					<div>
						<Swiper
							breakpoints={breakpoints}
							slidesPerView={3}
							spaceBetween={10}
							scrollbar={{
								hide: true,
							}}
							navigation={false}
							keyboard={true}
							pagination={{
								type: 'bullets',
								clickable: true,
							}}
							modules={[Scrollbar, Keyboard, Pagination]}
							className='mySwiper'
						>
							{vistos.map(producto => (
								<SwiperSlide key={producto._id}>
									<PreviaProducto className='width-2' producto={producto} />
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>
			)}
		</section>
	);
};

export default VistosRecientemente;
