import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import ProductPhoto from '../assets/images/product.webp'
import '../assets/styles/history.css'

const History = () => {

    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies([])

    const [userName, setUserName ] = useState("")
    const [email, setEmail ] = useState("")

    const [orders, setOrders] = useState([])

    useEffect(() => {
        const verifyUser = async () => {
            if(!cookies.jwt) {
                navigate("/auth") 
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
                setEmail(data.email)

                var currentOrders = []

                axios.get('https://lorinc.herokuapp.com/getOrders').then(response => {


                    response.data.forEach(object => {
                        if(object.email == data.email){
                            currentOrders.push(object)
                        }
                    })

                setOrders(currentOrders)
                })

                

                

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

    const logOut = () => {
        removeCookie('jwt')
        navigate("/login")
    }
    
    return (
        <>
            <Navbar account_name={userName} />
            <main>
                {orders.map(object => {
                    return (
                        <div className="secondary-content summary history-full">
                        <div className="order-summary baseline-medium">
                           <a className="section-header-note checkout-right">
                           <span className="visuallyhidden">Order</span></a>
                           <header className="box-border-bottom">
                              <h3 className="section-header h4 baseline-small">
                                Dátum: {object.orderDate}
                              </h3>
                           </header>
                           {object.products.map(product => {
                               return (
                                <div className="checkout-mini-cart js-checkout-mini-cart">
                                    <div className="checkout-mini-cart-inner">
                                      <div className="mini-cart-product js-mini-cart-product">
                                          <div className="mini-cart-image fluid-width">
                                            <picture className="content-picture">
                                                <img src={product.product.photos[0]}
                                                  className="content-image js-producttile_image" />
                                            </picture>
                                          </div>
                                          <div className="mini-cart-details">
                                            <div className="mini-cart-name baseline-small">
                                                <span>{product.product.title}</span>
                                            </div>
                                            <div className="mini-cart-attributes">
                                                <div className="attribute">
                                                  <span className="label bold ">
                                                  <span>Szín</span>
                                                  <span className="size-colons-holder">: </span>
                                                  </span>
                                                  <span className="value">
                                                  {product.product.colorname}
                                                  </span>
                                                </div>
                                                <div className="attribute">
                                                  <span className="label bold attribute-label-size">
                                                  <span>Méret</span>
                                                  <span className="size-colons-holder">: </span>
                                                  </span>
                                                  <span style={{textTransform: 'uppercase'}} className="value">
                                                  {product.selectedSize}
                                                  </span>
                                                </div>
                                                <span
                                                  className="hide js-rrparent js-product-1005325-1A03718_AA2_46_5V030__"></span>
                                            </div>
                                            <div className="mini-cart-pricing">
                                                <span className="label">Ár</span>
                                                <span
                                                  className="value mini-cart-price price-adjusted product-sales-price | text-uppercase" style={{textTransform: "none"}}><span
                                                  className="was-now"></span>
                                                {product.product.price} Ft</span>
                                            </div>
                                            <div className="mini-cart-actions">
                                            </div>
                                          </div>
                                      </div>
                                    </div>
                                </div>
                               )
                           })}
                                
                           <div className="checkout-order-totals js-checkout-order-totals">
                              <table className="order-totals-table baseline-medium">
                                 <tbody>
                                    <tr className="order-subtotal">
                                       <th scope="row">Telefon</th>
                                       <td className="text-right">
                                        +{object.phone}
                                       </td>
                                    </tr>
                                    <tr className="order-shipping js-shipping" >
                                       <th scope="row">
                                          Email
                                       </th>
                                       <td className="text-right">
                                          {object.email}
                                       </td>
                                    </tr>
                                    <tr className="order-total">
                                       <th scope="row">Állapot</th>
                                       <td className="text-right js-order-total" style={{textTransform: 'capitalize'}}>
                                          {object.status}...
                                       </td>
                                    </tr>
                                 </tbody>
                              </table>
                           </div>
                        </div>
                     </div>
                    )
                })}
            
            <Footer />
            </main>
        </>
    )
}

export default History