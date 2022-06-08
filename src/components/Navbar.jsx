import React, { useState } from 'react'

const Navbar = ({account_name}) => {

    const [nrVisibility, setNrVisibility] = useState("none")

    function openMenu () {
        setNrVisibility("block")
    }

    function closeMenu () {
        setNrVisibility("none")
    }

  return (
        <>
            <div className="header-wrapper">
                <header>
                    <div className="real-header">
                        <div className="header-content">
                            <div className="header-left">
                                <div>Stores</div>
                                <div>Contact Us</div>
                            </div>
                            <div className="header-center">
                                enjoy 2nd day complimentary shipping
                            </div>
                            <div className="header-right">
                                <div>{account_name ? `Welcome back ${account_name}!` : "Sign in / Register"}</div>
                                <i className="icon-wishlist-small" aria-hidden="true"></i>
                                <i className="icon-cart-small" aria-hidden="true"></i> 
                                Bag
                            </div>
                        </div>
                    </div>
                    <div className="header-logo-container">
                        <div onClick={openMenu} className="menu-icon-container">
                            <i className="icon-menu" aria-hidden="true">  
                            </i>
                        </div>
                        <svg className="header-logo" focusable="false"
                            aria-hidden="true" xmlns="http://www.w3.org/2000/svg" 
                            version="1.1" x="0px" y="0px" width="283.461px" height="36.311px" viewBox="0 0 283.461 36.311"
                            enableBackground="new 0 0 283.461 36.311" >
                            <path fill="#242424"
                                d="M143.042 15.24c-5.066-0.977-9.623-2.839-9.675-7.178c0-0.109 0.002-0.229 0.01-0.346c0.26-3.4 4.209-5.277 7.875-5.29 c3.546-0.01 6.2 1.5 8.6 4.313l3.699-2.92c-5.513-3.735-8.156-3.804-12.277-3.819c-2.31-0.002-5.752 0.564-8.555 2.2 c-2.803 1.619-4.97 4.183-4.98 8.371c0 0.1 0 0.1 0 0.172c0.044 7.5 8.8 8.8 11.7 9.4 c3.424 0.7 10 2.2 10.1 7.919c-0.057 3.822-4.292 5.851-7.732 5.855c0 0-0.015 0-0.052 0 c-2.997-0.005-7.674-0.634-10.849-5.121l-4.046 3.083c3.293 2.7 7.1 4.4 15 4.437c8.122-0.032 14.234-4.104 14.243-11.439 C156.084 18.3 149.2 16.4 143 15.24z">
                            </path>
                            <polygon fill="#242424"
                                points="46,35.4 69.2,35.4 69.2,33.2 52.9,33.2 52.9,19.1 52.9,18.7 66,18.7 66,16.6 52.9,16.7 52.9,2.7 69.2,2.7 69.2,0.6 46,0.6">
                            </polygon>
                            <path fill="#242424"
                                d="M230.579 1.095c2.143 0 4.3 0.7 5.9 2.162c1.532 1.4 2.6 3.5 2.7 6.325h5.96 c-0.229-5.137-3.426-9.493-14.517-9.559c-11.382 0.076-17.902 4.937-17.974 18.09c0.068 13.1 6.7 18.1 17.4 18.1 c7.943-0.007 11.674-1.866 13.591-4.479c1.058-1.461 1.344-2.572 1.393-4.049h-4.637c-0.262 3.95-3.71 7.144-8.314 7.2 c-2.747 0-5.836-0.417-8.229-2.749c-2.389-2.333-3.981-6.463-3.981-13.669c0.002-7.729 1.548-12.075 3.718-14.514 C225.744 1.5 228.5 1.1 230.6 1.095z">
                            </path>
                            <polygon fill="#242424"
                                points="17.7,30.7 17.3,32 7,0.6 0,0.6 12.5,35.4 18.9,35.4 31.9,0.6 28.5,0.6"></polygon>
                            <path fill="#242424"
                                d="M104.708 19.942l-0.299-0.489l0.538-0.194c3.237-1.185 7.718-3.742 7.713-9.392c-0.023-5.606-4.24-9.241-15.561-9.295 L83.866 0.569V35.4h6.91V20.149h7.035l9.381 15.251h7.04L104.708 19.942z M95.512 18.58h-0.003l-4.733-0.008V2.245h5.671 c5.531 0 9.2 3.5 9.2 7.75C105.596 14.2 101.9 18.6 95.5 18.58z">
                            </path>
                            <path fill="#242424"
                                d="M181.811 0.57L165.685 35.4h3.06l5.612-11.922l0.123-0.268h17.086l5 12.189h6.532L188.269 0.57H181.811z M175.369 21.2 l7.727-16.542l0.448-0.956l7.241 17.497H175.369z">
                            </path>
                            <polygon fill="#242424"
                                points="283.5,2.7 283.5,0.6 260.3,0.6 260.3,35.4 283.5,35.4 283.5,33.2 267.2,33.2 267.2,19.1 267.2,18.7 280.2,18.7 280.2,16.6 267.2,16.7 267.2,2.7">
                            </polygon>
                        </svg>
                        <div className="wishlist-and-cart-icon-container">
                            <i className="icon-wishlist" aria-hidden="true"></i>
                            <i className="icon-cart" aria-hidden="true"></i>
                        </div>
                    </div>

                </header>
                <nav className='nav'>
                    <div>
                        Kezdőlap
                    </div>
                    <div>
                        Termékeink
                    </div>
                    <div>
                        Kosár
                    </div>
                    <div>
                        Kívánságlista
                    </div>
                    <div>
                        Fiók
                    </div>
                    <div>
                        Kapcsolat
                    </div>
                </nav>
            </div>
            <div className='header-menu-small' style={{display: nrVisibility}}>
                <div onClick={closeMenu} className='closeIcon'><i class="has-category-indicator-close" aria-hidden="true"></i></div>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh', gap: '22px'}}>
                    <div className='header-menu-small-option'>
                        Kezdőlap
                        <i class="has-category-indicator" aria-hidden="true"></i>
                    </div>
                    <div className='header-menu-small-option'>
                        Termékeink
                        <i class="has-category-indicator" aria-hidden="true"></i>
                    </div>
                    <div className='header-menu-small-option'>
                        Kosár
                        <i class="has-category-indicator" aria-hidden="true"></i>
                    </div>
                    <div className='header-menu-small-option'>
                        Kívánságlista
                        <i class="has-category-indicator" aria-hidden="true"></i>
                    </div>
                    <div className='header-menu-small-option'>
                        Fiók
                        <i class="has-category-indicator" aria-hidden="true"></i>
                    </div>
                    <div className='header-menu-small-option'>
                        Kapcsolat
                        <i class="has-category-indicator" aria-hidden="true"></i>
                    </div>
                    <div className='header-menu-small-black'>
                        <div className='header-menu-small-black-text'>
                            Hear about exclusieve events, collections and news.
                        </div>
                        <div className='header-menu-small-black-button'>
                            Sign up
                        </div>
                    </div>
                </div>
            </div>
        </>
  )
}

export default Navbar