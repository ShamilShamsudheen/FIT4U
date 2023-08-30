import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { trainerAxiosInstance } from "../../axios/axios"
import { trainerLogin } from "../../Redux/app/trainerSlice";



export const HomeVerification = ({ children }) => {
    const user = useSelector((state) => state?.user?.userId);
    const dispatch = useDispatch()
    const jwt = localStorage.getItem('trainerToken')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (function () {
            if (user) {
                return setLoading(false)
            } else if (jwt) {
                
                trainerAxiosInstance.get("/tokenCheck").then((response) => {
                    if (response.data.status) {
                        const result = response.data.userLogin
                        dispatch(trainerLogin({ username: jwt.name, token: jwt }))
                        
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