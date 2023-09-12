import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { userAxiosInstance } from "../../axios/axios"
import { userLogin } from "../../Redux/app/userSlice"



export const HomeVerification = ({ children }) => {
    const user = useSelector((state) => state?.user?.userId);
    const dispatch = useDispatch()
    const jwt = localStorage.getItem('userToken')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (function () {
            if (user) {
                return setLoading(false)
            } else if (jwt) {
                
                userAxiosInstance.get("/tokenCheck").then((response) => {
                    if (response.data.status) {
                        const result = response.data.userLogin
                        dispatch(userLogin({ username: jwt.name, token: jwt }))
                        
                        setLoading(false);
                    }
                })
                .catch((error)=>{
                    setLoading(false)
                })
            }else{
                setLoading(false)
            }
        })()

    }, [])

    if (!loading) return children
    else return null
    
}