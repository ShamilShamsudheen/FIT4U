import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { adminAxiosInstance } from "../../axios/axios";
import { adminLogin } from "../../Redux/app/adminSlice";



export const HomeVerification = ({ children }) => {
    const user = useSelector((state) => state?.user?.userId);
    const dispatch = useDispatch()
    const jwt = localStorage.getItem('adminToken')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (function () {
            if (user) {
                return setLoading(false)
            } else if (jwt) {
                
                adminAxiosInstance.get("/tokenCheck").then((response) => {
                    if (response.data.status) {
                        const result = response.data.userLogin
                        dispatch(adminLogin({ username: jwt.name, token: jwt }))
                        
                        setLoading(false);
                    }
                })
            }else{
                setLoading(false)
            }
        })()

    }, [])

    if (!loading) return children
    else return null
    
}