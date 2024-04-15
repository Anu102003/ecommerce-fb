import React, { useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import "./singleProduct.scss"
export const SingleProduct = () => {
    const location = useLocation();
    const product = location?.state?.details
    console.log(product)
    const [imgSelect, setImgSelect] = useState(product.thumbnail)
    return (
        <>
            <div className='single-product'>
                <div className='d-1'>
                    <div className='d-11'>
                        <div className='image-lists'>
                            <section className='scrollmenu'>
                                <div className={`product-img ${imgSelect === product.thumbnail && "active"}`}
                                    onClick={() => { setImgSelect(product.thumbnail) }}>
                                    <img src={product.thumbnail} />
                                </div>
                                {product.images.map((img) => (
                                    <div className={`product-img ${imgSelect === img.url && "active"}`}
                                        onClick={() => { setImgSelect(img.url) }}>
                                        <img src={img.url} />
                                    </div>
                                ))}
                            </section>
                        </div>
                    </div>
                    <div className='d-12'>
                        <div className='p-img'>
                            <img src={imgSelect} />
                        </div>
                    </div>
                </div>
                <div className='d-2'>
                    <div className='btn'>
                    <button className='cart-btn'>Add to cart</button>
                    <button className='buy-btn'>Buy Now</button>
                    </div>
                    <div className='details'>
                    <p className='title'>{product.title}</p>
                    <p>{product.description}</p>
                    </div>
                </div>
            </div>
        </>
    );
};


