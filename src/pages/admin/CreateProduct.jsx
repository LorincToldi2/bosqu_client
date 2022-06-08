import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'

const CreateProduct = () => {

    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies([])
    const [listOfProducts, setListOfProducts] = useState([])

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [color, setColor] = useState('')
    const [photo1, setPhoto1] = useState('')
    const [photo2, setPhoto2] = useState('')
    const [photo3, setPhoto3] = useState('')
    const [photo4, setPhoto4] = useState('')
    const [photos, setPhotos] = useState([photo1, photo2, photo3, photo4])
    const [sizes, setSizes] = useState(["S","M","L","XL"])

    useEffect(() => {
        const verifyUser = async () => {
            if(!cookies.jwt) {
                navigate("/") 
            } else {
                const { data } = await axios.post(
                    "https://lorinc.herokuapp.com/checkUser",
                    {token: cookies.jwt}/* ,
                    {
                        withCredentials: true,
                    } */
                )

                    if(!data.admin){

                        navigate("/")
                    }


                if (!data.status) {
                    removeCookie("jwt")
                    navigate("/")
                } else {
                    axios.get('https://lorinc.herokuapp.com/getProducts').then((response) => {
                        setListOfProducts(response.data)
                    })
                }
            }
        }
        verifyUser()
    }, [cookies, navigate, removeCookie])

    const createProduct = () => {
        setPhotos([photo1, photo2, photo3, photo4])
        axios.post("https://lorinc.herokuapp.com/createProducts", {
            title: title, 
            price: price,
            color: color,
            photos: photos,
            sizes: ["S","M","L","XL"]

        }).then((response) => {
          setListOfProducts([...listOfProducts, {title: title, price: price, color: color, photos: photos, sizes: sizes}])
        })
      }

  return (
    <div>
        <div>
            {listOfProducts.map(object => {
                return (
                    <div style={{backgroundColor: "lightgray", marginTop: "100px"}}>
                        <p>
                        {object.title}
                        </p>
                        <p>
                        {object.price}
                        </p>
                        <span style={{backgroundColor: object.color, color: "white"}}>color</span>
                        {object.photos.map(photo => {
                            console.log(photo)
                            return (
                                <p>
                                    <img style={{maxWidth: "50vw", margin: "auto"}} src={photo} />

                                </p>
                            )
                        })}
                    </div>
                )
            })}
        </div>
        <div>
            <input type="text" placeholder="title" onChange={(e) => {setTitle(e.target.value)}} />
            <input type="number" placeholder="price" onChange={(e) => {setPrice(e.target.value)}} />
            <input type="text" placeholder="color" onChange={(e) => {setColor(e.target.value)}} />
            <input type="text" placeholder='photo 1' onChange={(e) => {setPhoto1(e.target.value); setPhotos(photo1, photo2, photo3, photo4)}} />
            <input type="text" placeholder='photo 2' onChange={(e) => {setPhoto2(e.target.value); setPhotos(photo1, photo2, photo3, photo4)}} />
            <input type="text" placeholder='photo 3' onChange={(e) => {setPhoto3(e.target.value); setPhotos(photo1, photo2, photo3, photo4)}} />
            <input type="text" placeholder='photo 4' onChange={(e) => {setPhoto4(e.target.value); setPhotos(photo1, photo2, photo3, photo4)}} />
            <button onClick={createProduct}> Create Product </button>
        </div>

    </div>
  )
}

export default CreateProduct