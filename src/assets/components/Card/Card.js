import { useEffect, useRef, useState } from "react";
import "./card.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

function Card({ product }) {
  const [ratings, setRatings] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const newRatings = [];
    product.review.forEach((e) => {
      for (let i = 0; i < 5; i++) {
        if (i < e.ratingCount) {
          newRatings.push(<p>
            <FontAwesomeIcon icon={faStar} color="#FFA41C" />
          </p>);
        } else {
          newRatings.push(<p>
            <FontAwesomeIcon icon={faStarRegular} color="#FFA41C" />
          </p>);
        }
      }
    });
    setRatings(newRatings);
  }, [product.review]);

  // const [discountPrice, setDiscountPrice] = useState(0)
  // useEffect(() => {
  //   const discountValue = product.price.discount / 100
  //   const discount = product.price.normalPrice * discountValue
  //   const result = product.price.normalPrice - discount
  //   setDiscountPrice(result.toFixed(0))
  // }, [product.price.discount, product.price.normalPrice])

  const [showMore, setShowMore] = useState(false)
  const [isContentOverflowed, setIsContentOverflowed] = useState(false);
  const contentContainerRef = useRef(null);
  const [fitHeight, setFitHeigth] = useState(0);
  const contentContainer = contentContainerRef.current;
  useEffect(() => {
    if (showMore) {
      if (contentContainer.scrollHeight > 100) {
        setIsContentOverflowed(true);
      } else {
        setFitHeigth(contentContainer.scrollHeight + "px")
        setIsContentOverflowed(false);
      }
    }
  }, [showMore]);

  useEffect(() => {
    if (!showMore && contentContainer) {
      contentContainer.scrollTop = 0;
    }
  }, [showMore, contentContainer]);
  const redirect = () => {
    navigate("/product",{state:{details:product}})
  }
  return (
    <div className="product-card-wrapper">
      <section className="product-card" onClick={redirect}>


        {/* image */}
        <div className="product-card__img">
          <img src={product.thumbnail} />
        </div>

        {/* contents */}
        <div className="product-card__contents">
          <div className="product">

            {/* brand */}
            <p className="product__brand">{product.brand}</p>

            {/* title */}
            <div ref={contentContainerRef}
              onClick={() => { setShowMore(!showMore) }}
              style={{
                overflowY: showMore ? 'auto' : 'hidden',
                minHeight: showMore ? isContentOverflowed ? '70px' : fitHeight : null,
              }}
              className={'reels-description'}

            >
              {(contentContainer?.scrollHeight > 20 && !showMore) &&
                <p className='more'>. . . </p>
              }
              <p className='description' style={{
                width: '15rem'
              }}>{product.title}</p>
            </div>

            {/* ratings */}
            {
              product.review.length > 0 &&
              <div className="ratings">
                <p className="ratings__count">
                  {ratings.map((rating, index) => (
                    <p key={index}>{rating}</p>
                  ))}
                </p>
                <p className="ratings__length">{product.review.length}</p>
              </div>
            }

            {/* price */}
            <div className="price">

              <p className="price__correct"><span className="rupee"></span> {product.overallPrice}</p>
              {
                product.price.discount > 0 &&
                <>
                  <p className="price__original" style={{ textDecoration: "line-through" }}>M.R.P: {product.price.normalPrice}</p>
                  <p className="price__discount" >({product.price.discount}% off)</p>
                </>
              }
            </div>

            {/* delivery */}
            {
              product.overallPrice > 500 ?
                <div className="product__delivery">
                  <span className="free-txt" style={{ color: "green" }}>FREE</span>
                  Delivery
                </div> :
                <div className="product__delivery">
                  <span className="free-txt" style={{ color: "red" }}>FREE</span>
                  Delivery over ₹499.
                </div>
            }
          </div>
        </div>
      </section>
    </div>
  )
}
export default Card;