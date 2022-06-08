import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'

import '../assets/styles/products.css'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import productImage from "../assets/images/product-wish.jpg"

const Products = () => {

    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies([])

    const [userName, setUserName ] = useState("")

    useEffect(() => {
        const verifyUser = async () => {
            if(!cookies.jwt) {
                /* navigate("/login")  */
            } else {
                const { data } = await axios.post(
                    "https://lorinc.herokuapp.com/checkUser",
                    {token: cookies.jwt}/* ,
                    {
                        withCredentials: true,
                    } */
                )

                const username = data.name.split(' ')[0]
                setUserName(username)

                

                if (!data.status) {
                    removeCookie("jwt")
                    navigate("/login")
                } else {
                    /* toast(`Hi ${data.user}`, {
                        theme: "dark"
                    }) */
                }
            }
        }
        verifyUser()
    }, [cookies, navigate, removeCookie])

    const [listOfProducts, setListOfProducts] = useState([])

    useEffect(() => {
        axios.get('https://lorinc.herokuapp.com/getProducts').then((response) => {
                        setListOfProducts(response.data)
                    })
    }, [])

  return (
    <div class="wrapper">
        <Navbar account_name={userName} />

        <main>
            
            <section class="product-header">
                <div class="product-header-left">
                   
                </div>
                <div class="product-header-right">
                    <div class="product-header-right-inner">
                        <div class="product-header-right-title">
                            Men's collection
                        </div>
                        <div class="product-header-right-desc">
                            Get the quintessential Versace look by pairing the latest runway styles with a stetement bag and modern shoes. For the finishing touch, browse an array for luxurious acessories.
                        </div>
                    </div>
                </div>
            </section>

            <section class="products-grid">
                {listOfProducts.map(product => {
                    return(
                        <Link style={{textDecoration: 'none', color: "black"}} className="products-product" to={product.slug}>
                            <div class="products-product">
                                <img class="products-product-image" src={product.photos[0]} alt="" />
                                <div class="products-product-title">{product.title}</div>
                                <div class="products-product-price">{product.price} Ft</div>
                            </div>
                        </Link>
                    )
                })}
                
            </section>

            <Footer />
            

        </main>
    </div>
  )
}

export default Products