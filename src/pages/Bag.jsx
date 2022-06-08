import React, { useEffect, useState, useRef } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../assets/styles/bag.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import cartProduct from "../assets/images/product.webp";
import wishProduct from "../assets/images/product-wish.jpg";

const Bag = () => {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const [listOfWishes, setListOfWishes] = useState([]);

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        /* navigate("/login")  */
      } else {
        const { data } = await axios.post(
          "https://lorinc.herokuapp.com/checkUser",
          {token: cookies.jwt}/* ,
          {
              withCredentials: true,
          } */
      )

        const username = data.name.split(" ")[0];
        setUserName(username);
        setEmail(data.email);

        axios.get("https://lorinc.herokuapp.com/getCart").then((response) => {
          const listOfCartCurrent = [];

          response.data.forEach((product) => {
            if (product.email == data.email) {
              listOfCartCurrent.push(product);
            }
          });

          console.log(listOfCartCurrent);
          setListOfCart(listOfCartCurrent);

          axios.get("https://lorinc.herokuapp.com/getWishlist").then((response) => {
            const listOfWishesCurrent = [];

            response.data.forEach((object) => {
              if (object.email == data.email) {
                  listOfWishesCurrent.push(object)
              }
            });

            console.log(listOfWishesCurrent)
            setListOfWishes(listOfWishesCurrent)
          });
        });

        if (!data.status) {
          removeCookie("jwt");
          /* navigate("/login") */
        } else {
        }
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const [listOfCart, setListOfCart] = useState([]);

  const [total, setTotal] = useState();

  useEffect(() => {
    var totalCurrent = 0;



    listOfCart.forEach((object) => {
      totalCurrent = totalCurrent + object.product.price;
    });

    setTotal(totalCurrent + 2000);
    forceUpdate()
  }, [listOfCart]);

  const removeCartElement = (e) => {
    var listOfCartIds = [];

    listOfCart.forEach((object) => {
      listOfCartIds.push(object._id);
    });

    console.log(listOfCartIds);

    var indexOfDelet = listOfCartIds.indexOf(e.target.id);

    listOfCart.splice(indexOfDelet, 1);

    var totalCurrent = 0;



    listOfCart.forEach((object) => {
      totalCurrent = totalCurrent + object.product.price;
    });

    setTotal(totalCurrent + 2000);

    setListOfCart(listOfCart);

    

    forceUpdate();

    axios.post("https://lorinc.herokuapp.com/deleteCartItem", {
      _id: e.target.id,
    });

    
  };



  const removeWish = (e) => {
    var listOfWishIds = [];

    listOfWishes.forEach((object) => {
      listOfWishIds.push(object._id);
    });

    console.log(e.target.id)

    var indexOfDelet = listOfWishIds.indexOf(e.target.id);

    listOfWishes.splice(indexOfDelet, 1);

    setListOfWishes(listOfWishes);

    forceUpdate();

    axios.post("https://lorinc.herokuapp.com/deleteWish", {
      _id: e.target.id,
    });
  }

  const addCart = (e) => {
    var listOfWishIds = [];

    listOfWishes.forEach((object) => {
      listOfWishIds.push(object._id);
    });

    console.log(e.target.id)

    var indexOfDelet = listOfWishIds.indexOf(e.target.id);

    var product = listOfWishes[indexOfDelet]

    
    delete product._id
    delete product.__v
    console.log(product)
    

    listOfCart.push(product)

    var totalCurrent = 0;



    listOfCart.forEach((object) => {
      totalCurrent = totalCurrent + object.product.price;
    });

    setTotal(totalCurrent + 2000);
    
    setListOfCart(listOfCart)

    listOfWishes.splice(indexOfDelet, 1);

    setListOfWishes(listOfWishes);

    forceUpdate();

    axios.post("https://lorinc.herokuapp.com/deleteWish", {
      _id: e.target.id,
    });

    axios.post(
      "https://lorinc.herokuapp.com/addCart",
      product
    ) 
  }

  return (
    <div class="wrapper">
      <Navbar account_name={userName} />
      <ToastContainer />

      <main>
        <section class="cart">
          <div class="cart-header">Kosár</div>
          <div class="cart-options">
            <div class="cart-option">Kosár ({listOfCart.length})</div>
            <div class="cart-option">Kívánságlista ({listOfWishes.length})</div>
          </div>
          <div class="cart-inner">
            <div class="cart-product-container">
              {listOfCart.map((product) => {
                return (
                  <div class="cart-product">
                    <div class="cart-product-image-and-details">
                      <div class="cart-product-image-container">
                        <img
                          class="cart-product-image"
                          src={product.product.photos[0]}
                          alt=""
                        />
                      </div>
                      <div class="cart-product-details">
                        <div class="cart-product-title">
                          {product.product.title}
                        </div>
                        <div class="cart-product-detail">
                          Azonosító: {product._id}
                        </div>
                        <div class="cart-product-detail">
                          Szín: {product.product.colorName}
                        </div>
                        <div class="cart-product-detail">
                          Méret: {product.selectedSize}
                        </div>
                        <div class="cart-product-options">
                          <div
                            class="cart-product-option"
                            id={product._id}
                            onClick={(e) => removeCartElement(e)}
                          >
                            Remove
                          </div>
                          {/* <div class="cart-product-option">
                                                    Move to Wishlist
                                                </div> */}
                        </div>
                      </div>
                    </div>
                    <div class="cart-product-stock-and-price">
                      <div class="cart-product-price">
                        {product.product.price} Ft
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {cookies.jwt ? (
              <div class="cart-order-summary" style={{ marginBottom: "50px" }}>
                <div class="cart-order-summary-title">Rendelés összesítése</div>
                <div class="cart-order-details">
                  <div class="cart-order-detail">
                    <span>Részösszeg</span> <span>{total - 2000} Ft</span>
                  </div>
                  <div class="cart-order-detail">
                    <span>Szállítás</span> <span>2000 Ft</span>
                  </div>
                </div>
                <div class="cart-order-detail-bold">
                  <span>Összesen</span> <span>{total} Ft</span>
                </div>
                <Link style={{textDecoration: 'none'}} to="/checkout">
                <button class="cart-checkout-button">Tovább a pénztárba</button>
                </Link>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </section>

        <section class="wish">
          <div class="wish-header">Kívánságlista</div>
          <div class="wish-container">
            <div class="wish-inner">

                {
                    listOfWishes.map(object => {
                        return (
                            <div class="wish-product">
                <div class="wish-image-container">
                  <img src={object.product.photos[0]} alt="" class="wish-image" />
                </div>
                <div class="wish-details">
                  <div class="wish-title">{object.product.title}</div>
                  <div class="wish-price">{object.product.price} Ft</div>
                  <div class="wish-size">{object.selectedSize}</div>
                  <button class="wish-add-button" id={object._id} onClick={addCart}>Kosárba helyezés</button>
                  <button
                    class="wish-add-button"
                    style={{
                      marginTop: "10px",
                      color: "black",
                      backgroundColor: "transparent",
                      border: "1px solid black",
                    }} 
                    id={object._id}
                    onClick={(e) => removeWish(e)}
                  >
                    Eltávolítás
                  </button>
                  <div class="wish-product-spacer"></div>
                </div>
              </div>
                        )

                    }
                    )
                }

              
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default Bag;
