import React, { useEffect, useState } from 'react';
import './_homeImageSlider.scss';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

export const HomeImageSlider = ({ images }) => {
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const goToNextSlide = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToPrevSlide = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToSlide = (index) => {
        setCurrentImageIndex(index);
    };

    const redirect = (path) => {
        navigate(path)
    }
    useEffect(() => {
        const intervalId = setInterval(goToNextSlide, 3000);

        return () => clearInterval(intervalId);
    }, [currentImageIndex]);
    return (
        <div className="slider-container">
            <div className="slider">
                <button onClick={goToPrevSlide} className="arrow prev">
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button onClick={goToNextSlide} className="arrow next">
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
                    <img
                        src={images[currentImageIndex].url}
                        alt={`slide-${currentImageIndex}`}
                        height={400}
                        width={500}
                        onClick={() => { redirect(images[currentImageIndex].redirect) }}
                    />
            </div>
            <div className="dots">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={index === currentImageIndex ? 'dot active' : 'dot'}
                        onClick={() => goToSlide(index)}
                    ></div>
                ))}
            </div>

        </div>
    );
};