import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

import "../assets/styles/home.css";
import "../assets/styles/account.css";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Account = () => {
  // LOGIN

  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.jwt) {
      navigate("/account") 
    }
  }, [cookies, navigate]);

  const [loginValues, setLoginValues] = useState({ email: "", password: "" });

  const generateError = (error) =>
    toast.error(error, {
      theme: "light",
    });

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "https://lorinc.herokuapp.com/login",
        {
          ...loginValues,
        },
        { withCredentials: true }
      );

      
      if (data) {
        if (data.errors) {
          console.log(data.errors)
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          const maxAge = 3 * 24 * 60 * 60
          setCookie('jwt', data.jwt, { httpOnly: false, maxAge: maxAge * 1000 })
          navigate("/account");
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const [registerValues, setRegisterValues] = useState({ email: "", password: "", name: "", phone: "", admin: false });

  const handleRegister = async (event) => {
    event.preventDefault();

    if(registerValues.password.length <= 8){
      toast.error("A jelszó nem elég hosszú!", {
        theme: "light",
      })
    }


    if(registerValues.password.length > 8 ) {
      try {
        const { data } = await axios.post(
          "https://lorinc.herokuapp.com/register",
          {
            ...registerValues,
          },
          { withCredentials: true }
        );
        if (data) {
          if (data.errors) {
            const { email, password, name, phone } = data.errors;
            if (email) generateError(email);
            else if (password) generateError(password);
            else if (name) generateError(name)
            else if (phone) generateError(phone)
          } else {
            const maxAge = 3 * 24 * 60 * 60
            setCookie('jwt', data.jwt, { httpOnly: false, maxAge: maxAge * 1000 })
            navigate("/account");
          }
        }
      } catch (ex) {
        console.log(ex);
      }
    }

    
  };

  

  return (
    <div className="wrapper">
      <Navbar />

      <main>
        <section className="sign-n-register">
          <div className="snr-header">Jelentkezzen be!</div>
          <div className="snr-inner">
            <div className="snr-left">
              <div className="snr-title">Visszatérő vásárlók</div>
              <div className="snr-small">
                Email cím <span style={{ color: "rgb(191,45,45)" }}>*</span>
              </div>
              <input
                className="snr-input"
                placeholder="Kérem adja meg Email címét!"
                type="email"
                name="email"
                onChange={(e) =>
                  setLoginValues({
                    ...loginValues,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <div className="snr-small">
                Jelszó <span style={{ color: "rgb(191,45,45)" }}>*</span>
              </div>
              <input
                className="snr-input"
                placeholder="Kérem adja meg jelszavát!"
                type="password"
                name="password"
                onChange={(e) =>
                  setLoginValues({
                    ...loginValues,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <div className="snr-small" style={{ opacity: 0 }}>
                spacer
              </div>
              <input
                disabled
                style={{ opacity: 0 }}
                className="snr-input"
                placeholder="Please enter your Password"
                type="password"
              />
              <div className="snr-small" style={{ opacity: 0 }}>
                spacer
              </div>
              <input
                disabled
                style={{ opacity: 0 }}
                className="snr-input"
                placeholder="Please enter your Password"
                type="password"
              />
              <div className="sign-button" onClick={handleLogin}>
                Bejelentkezés
              </div>
            </div>
            <div className="snr-right">
              <div className="snr-title">Regisztráció</div>
              <div className="snr-small">
                Teljes Név <span style={{ color: "rgb(191,45,45)" }}>*</span>
              </div>
              <input
                className="snr-input"
                placeholder="Kérem adja meg teljes nevét!"
                type="text"
                name="name"
                onChange={(e) =>
                    setRegisterValues({ ...registerValues, [e.target.name]: e.target.value })
                }
              />
              <div className="snr-small">
                Email cím <span style={{ color: "rgb(191,45,45)" }}>*</span>
              </div>
              <input
                className="snr-input"
                placeholder="Kérem adja meg Email címét!"
                type="email"
                name="email"
                onChange={(e) =>
                    setRegisterValues({ ...registerValues, [e.target.name]: e.target.value })
                }
              />
              <div className="snr-small">
                Jelszó <span style={{ color: "rgb(191,45,45)" }}>*</span>
              </div>
              <input
                className="snr-input"
                placeholder="Kérem adja meg jelszavát!"
                type="password"
                name="password"
                onChange={(e) =>
                    setRegisterValues({ ...registerValues, [e.target.name]: e.target.value })
                }
              />
              <div className="snr-small">
                Telefon <span style={{ color: "rgb(191,45,45)" }}>*</span>
              </div>
              <input
                className="snr-input"
                placeholder="Kérem adja meg telefonszámát!"
                type="tel"
                name="phone"
                onChange={(e) =>
                    setRegisterValues({ ...registerValues, [e.target.name]: e.target.value })
                }
              />
              <div style={{cursor: 'pointer'}} className="create-button" onClick={handleRegister}>Regisztráció</div>
            </div>
          </div>
          <ToastContainer style={{

  display: "flex",
  flexDirection: "column",
  gap: "0.3rem"
          }}/>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default Account;
