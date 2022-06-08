import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'

import '../assets/styles/home.css'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../components/Home/Hero'
import ProductSlider from '../components/Home/ProductSlider'
import Teaser from '../components/Home/Teaser'
import Newsletter from '../components/Home/Newsletter'

const Home = () => {

  const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies([])

    const [userName, setUserName ] = useState("")

    useEffect(() => {
        const verifyUser = async () => {
            if(!cookies.jwt) {
                /* navigate("/login")  */
            } else {

                console.log(cookies.jwt)

                const { data } = await axios.post(
                    "https://lorinc.herokuapp.com/checkUser",
                    {token: cookies.jwt}/* ,
                    {
                        withCredentials: true,
                    } */
                )

                console.log(data)

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

    const logOut = () => {
        removeCookie('jwt')
        navigate("/login")
    }


  return (
    <div className="wrapper">
        <Navbar account_name={userName} />
        <main>
            <Hero />

            <ProductSlider products={listOfProducts} />

            <Teaser />

            <Newsletter />

            <Footer />
            

        </main>
    </div>
  )
}

export default Home