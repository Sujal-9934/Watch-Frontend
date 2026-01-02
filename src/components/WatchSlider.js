// import React, { useEffect, useRef } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// import { useWatchStore } from 'store/WatchStore';
// import Card from './card/Card';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// export default function WatchSlider() {
//   const {
//     watches,
//     currentSlide,
//     slidesPerView,
//     autoplay,
//     autoplayDelay,
//     updateCurrentSlide,
//   } = useWatchStore();

//   const swiperRef = useRef(null);

//   useEffect(() => {
//     if (swiperRef.current) {
//       swiperRef.current.slideTo(currentSlide);
//     }
//   }, [currentSlide]);

//   const handleSwiper = (swiper) => {
//     swiperRef.current = swiper;
//   };

//   const handleSlideChange = (swiper) => {
//     updateCurrentSlide(swiper.activeIndex);
//   };

//   const handleCardClick = (watchTitle) => {
//     console.log(`Clicked on: ${watchTitle}`);
//   };

//   return (
//     <div className="w-full px-4 mb-8">
//       <div className="bg-white rounded-lg shadow-lg p-6">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">Featured Watches</h2>
        
//         <Swiper
//           onSwiper={handleSwiper}
//           modules={[Navigation, Pagination, Autoplay]}
//           spaceBetween={30}
//           slidesPerView={slidesPerView}
//           navigation={true}
//           pagination={{ clickable: true }}
//           autoplay={autoplay ? {
//             delay: autoplayDelay,
//             disableOnInteraction: false,
//           } : false}
//           onSlideChange={handleSlideChange}
//           breakpoints={{
//             320: {
//               slidesPerView: 1,
//               spaceBetween: 10,
//             },
//             640: {
//               slidesPerView: 2,
//               spaceBetween: 20,
//             },
//             1024: {
//               slidesPerView: 3,
//               spaceBetween: 30,
//             },
//             1280: {
//               slidesPerView: slidesPerView,
//               spaceBetween: 30,
//             },
//           }}
//           className="watch-swiper"
//         >
//           {watches.map((watch) => (
//             <SwiperSlide key={watch.id}>
//               <Card
//                 title={watch.title}
//                 description={watch.description}
//                 image={watch.image}
//                 footer={
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600 text-sm font-semibold">
//                       ${watch.price.toFixed(2)}
//                     </span>
//                     <button 
//                       className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleCardClick(watch.title);
//                       }}
//                     >
//                       Buy Now
//                     </button>
//                   </div>
//                 }
//                 onClick={() => handleCardClick(watch.title)}
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         <div className="mt-4 text-sm text-gray-600">
//           <p>Current Slide: {currentSlide + 1} / {watches.length}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

