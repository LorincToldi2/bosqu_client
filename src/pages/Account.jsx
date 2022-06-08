import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import '../assets/styles/realaccount.css'

const Account = () => {

    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies([])

    const [userName, setUserName ] = useState("")

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

    const logOut = () => {
        removeCookie('jwt')
        navigate("/auth")
    }

  return (
    <>
        <Navbar account_name={userName}/>
        <main className='r-account-main'>
        <section className='r-account-section'>
            <h1 className='r-account-welcome-back'>Jó újra látni {userName}!</h1>
            <div className='r-account-option-container'>
                <div className='r-account-option'>
                    <div className='r-account-inner'>
                        <div className='r-account-option-p1'>Rendeléseid</div>
                        <div className='r-account-option-p2'>Kövesd nyomon rendeléseidet</div>
                        <Link style={{textDecoration: "none", color: 'black'}} to="/account/orders">
                        <div className='r-account-option-p3'>tovább</div>
                        </Link>

                    </div>

                </div>
                <div className='r-account-option'>
                    <div className='r-account-inner'>
                        <div className='r-account-option-p1'>Kívánságlista</div>
                        <div className='r-account-option-p2'>Tekintsd meg kívánságlistádat</div>
                        <Link style={{textDecoration: "none", color: 'black'}} to="/bag">
                        <div className='r-account-option-p3'>tovább</div>
                        </Link>

                    </div>

                </div>
                <div className='r-account-option'>
                    <div className='r-account-inner'>
                        <div className='r-account-option-p1'>Kosár</div>
                        <div className='r-account-option-p2'>Tekintsd meg kosaradat</div>
                        <Link style={{textDecoration: "none", color: 'black'}} to="/bag">
                        <div className='r-account-option-p3'>tovább</div>
                        </Link>

                    </div>

                </div>
            </div>
            <div onClick={logOut} className='r-account-logout'>
                Kijelenetkezés
            </div>
        </section>
        <Footer />
        </main>
    </>
  )
}

export default Account