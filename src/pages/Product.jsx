import React, { useEffect, useState, useRef } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

import '../assets/styles/product.css'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductSlider from '../components/Home/ProductSlider'

const Product = () => {











    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies([])

    const [userName, setUserName ] = useState("")
    const [email, setEmail] = useState("")

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
                setEmail(data.email)

                

                if (!data.status) {
                    removeCookie("jwt")
                    /* navigate("/login") */
                } else {
                    /* toast(`Hi ${data.user}`, {
                        theme: "dark"
                    }) */
                }
            }
        }
        verifyUser()
    }, [cookies, navigate, removeCookie])











    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);


    const [productData, setProductData] = useState({
        photos: [],
        size: []
    })

    let { productSlug } = useParams();
    
    useEffect(() => {
        axios.get(`https://lorinc.herokuapp.com/getProductsBySlug/${productSlug}`).then((response) => {
            
            setProductData(response.data[0])
        })
    }, [ productSlug ])
    

    const [listOfProducts, setListOfProducts] = useState([])

    useEffect(() => {
        axios.get('https://lorinc.herokuapp.com/getProducts').then((response) => {
                        setListOfProducts(response.data)
                    })
    }, [])

    const [selectedSize, setSelectedSize] = useState(null)

    const selectSize = (e) => {
        
        if(e.target.style.color != "white") {
            refs.current["s"].style.backgroundColor = "white"
            refs.current["m"].style.backgroundColor = "white"
            refs.current["l"].style.backgroundColor = "white"
            refs.current["xl"].style.backgroundColor = "white"

            refs.current["s"].style.color= "black"
            refs.current["m"].style.color= "black"
            refs.current["l"].style.color= "black"
            refs.current["xl"].style.color= "black"

            e.target.style.color = "white"
            e.target.style.backgroundColor = "rgb(33, 33, 33)"

            setSelectedSize(e.target.innerHTML)
        } else {
            e.target.style.color = "black"
            e.target.style.backgroundColor = "rgb(255, 255, 255)"
            setSelectedSize(null)
        }
    }

    const refs = useRef([])

    function addToCart() {
        if(!cookies.jwt){
            toast.error("A folytatáshoz jelentkezzen be!", {
                theme: "light",
              })
        } else {
            if(selectedSize == null){
                toast.error("Kérem válasszon méretet!", {
                    theme: "light",
                  })
            } else {
                axios.post(
                    "https://lorinc.herokuapp.com/addCart",
                    {
                        email: email,
                        product: productData,
                        selectedSize: selectedSize
                    }
                )
    
                toast('🔥 Új termék a kosárban!', {
                    theme: "dark",
                  })
            }

        }
    }

    function addToWishlist() {
        if(!cookies.jwt){
            toast.error("A folytatáshoz jelentkezzen be!", {
                theme: "light",
            })
        } else {

            if(!selectedSize) {
                toast.error("Kérem válasszon méretet!", {
                    theme: "light",
                  })
    
            } else {
                axios.post(
                    "https://lorinc.herokuapp.com/addWish",
                    {
                        email: email,
                        product: productData,
                        selectedSize: selectedSize
                    }
                ).then(() => {
                    toast('❤️ Új kívánság hozzáadva!', {
                        theme: "dark",
                      })
                })
            }
        }
        
    }





   
    const location = useLocation()

    const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

    

  React.useEffect(() => {
    window.scrollTo(0, 0);


    


    
  }, [location])
    

  return (
    <div className="wrapper">
        <Navbar account_name={userName} />
        <ToastContainer />
        <main>

            <section className="product-grid">
                <div className="product-grid-left">
                    {productData.photos.map(photo => {
                        return (
                            <img className="product-grid-image" src={photo} alt="" />
                        )
                    })}
                </div>
                <div className="product-grid-right">
                    <div className="product-right-title">
                        {productData.title}
                    </div>
                    <div className="product-right-desc">
                        {productData.price} Ft
                    </div>
                    <div className="product-sizes">
                        {productData.size.map(sizes => {
                            return (
                                <div className="product-size" onClick={(e) => selectSize(e)} ref={(element) => {refs.current[sizes] = element}} >
                                    {sizes}
                                </div>
                            )
                        })}
                    </div>
                    <div className="product-add-to-bag" onClick={addToCart}>
                        Kosárhoz adás
                    </div>
                    <div className="product-add-to-bag" onClick={addToWishlist} style={{color: "black", backgroundColor: 'transparent', border: "1px solid black"}}>
                        Kívánság listához adás
                    </div>
                </div>
            </section>

            <section className="product-line">

            </section>

            <ProductSlider products={listOfProducts} />

            <section className="product-line-2">

            </section>

            <Footer />
            

        </main>
    </div>
  )
}

export default Product