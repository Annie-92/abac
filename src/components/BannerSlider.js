import React, { useState, useEffect } from 'react';

const BannerSlider = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className="banner-slider">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={
            index === currentSlide
              ? "slide active"
              : "slide"
          }
        >
          <img src={slide.image} alt={slide.alt} />
        </div>
      ))}
      <button onClick={prevSlide} className="prev">&#10094;</button>
      <button onClick={nextSlide} className="next">&#10095;</button>
    </div>
  );
};

export default BannerSlider;
