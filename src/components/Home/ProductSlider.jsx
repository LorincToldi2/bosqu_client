import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'

import left from "../../assets/images/left.svg";
import right from "../../assets/images/right.svg";
import productPhoto from "../../assets/images/product-1.jpg";

const ProductSlider = ({ products }) => {
    
    

    const [ sliderPosition, setSliderPosition ] = useState(0)

    const [ sliderForm, setSliderForm ] = useState("%")

    const [ slideCounter, setSlideCounter ] = useState(0)

    const [leftOpacity, setLeftOpacity] = useState(0)
    const [ rightOpacity, setRightOpacity] = useState(1)

    function slideLeft () {
        if(window.innerWidth > 1026) {
            if(slideCounter !== 0) {
                setSliderPosition(sliderPosition + ((window.innerWidth - 56) / 4) + 2)
                setSliderForm("px")
                if(slideCounter === 1) {
                    setLeftOpacity(0)
                }
                setSlideCounter(slideCounter - 1)
                setRightOpacity(1)
            }
        } else if(window.innerWidth > 767) {
            if(slideCounter !== 0){
                setSliderPosition(sliderPosition + ((window.innerWidth - 50) / 3) + 1) 
                setSliderForm("px")
                if(slideCounter === 1) {
                    setLeftOpacity(0)
                }
                setSlideCounter(slideCounter - 1)
                setRightOpacity(1)
            }
        } else if(window.innerWidth > 599) {
            if(slideCounter !== 0){
                setSliderPosition(sliderPosition + 50.111111111)
                setSliderForm("%")
                if(slideCounter === 1) {
                    setLeftOpacity(0)
                }
                setSlideCounter(slideCounter - 1)
                setRightOpacity(1)
            }
        } else if(window.innerWidth < 600) {
            if(slideCounter !== 0){
                setSliderPosition(sliderPosition + window.innerWidth - 30)
                setSliderForm("px")
                if(slideCounter === 1) {
                    setLeftOpacity(0)
                }
                setSlideCounter(slideCounter - 1)
                setRightOpacity(1)
            }
        }
    }

    function slideRight() {
        if(window.innerWidth > 1026) {
            if(slideCounter !== 4) {
                setSliderPosition(sliderPosition - ((window.innerWidth - 56) / 4) - 2)
                setSliderForm("px")
                if(slideCounter === 3) {
                    setRightOpacity(0)
                }
                setSlideCounter(slideCounter + 1) 
                setLeftOpacity(1)
            }
        } else if(window.innerWidth > 767) {
            if(slideCounter !== 5) {
                setSliderPosition(sliderPosition - ((window.innerWidth - 50) / 3) - 1)
                setSliderForm("px")
                if(slideCounter === 4) {
                    setRightOpacity(0)
                }
                setSlideCounter(slideCounter + 1) 
                setLeftOpacity(1)
            }
        } else if(window.innerWidth > 599) {
            if(slideCounter !== 6) {
                setSliderPosition(sliderPosition - 50.111111111)
                setSliderForm("%")
                if(slideCounter === 5) {
                    setRightOpacity(0)
                }
                setSlideCounter(slideCounter + 1) 
                setLeftOpacity(1)
            }
        } else if(window.innerWidth < 600) {
            if(slideCounter !== 7) {
                setSliderPosition(sliderPosition - window.innerWidth + 30)
                setSliderForm("px")
                if(slideCounter === 6) {
                    setRightOpacity(0)
                }
                setSlideCounter(slideCounter + 1) 
                setLeftOpacity(1)
            }
        }
    }

  return (
    <section className="section-product-slider">
      <div className="product-slider-title">fendace for her</div>
      <div className="product-slider">
        <div className="product-slider-left-btn" onClick={slideLeft} style={{opacity: leftOpacity}}>
          <img className="left-btn" src={left} alt=""/>
        </div>
          
        <div className="product-slider-real" style={{transform: `translate(${sliderPosition + sliderForm})`}}>
            {products.map(product => {
                return (
                    <Link style={{textDecoration: 'none', color: "black"}} className="products-product" to={"/products/" + product.slug}>
                        <div key={product.id}
                            className="product"
                        >
                            <img className="product-image" src={product.photos[0]} alt="" />
                            <div className="product-title">{product.title}</div>
                            <div className="product-price">{product.price} Ft</div>
                        </div>

                    </Link>
                )
            })}
            {products.map(product => {
                return (
                    <Link style={{textDecoration: 'none', color: "black"}} className="products-product" to={"/products/" + product.slug}>
                        <div key={product.id}
                            className="product"
                        >
                            <img className="product-image" src={product.photos[0]} alt="" />
                            <div className="product-title">{product.title}</div>
                            <div className="product-price">{product.price}</div>
                        </div>

                    </Link>
                )
            })}
            
        </div>
        <div className="product-slider-right-btn" onClick={slideRight} style={{opacity: rightOpacity}}>
          <img className="right-btn" src={right} alt="" />
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;