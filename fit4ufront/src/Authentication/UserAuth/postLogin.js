import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { userAxiosInstance } from "../../axios/axios";
import { userLogin } from "../../Redux/app/userSlice";

export const Authorization = ({ children, accessBy }) => {
    const user = useSelector((state) => state?.user?.userId);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const jwt = localStorage.getItem('userToken')
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (function () {
            if (accessBy === "Authorized") {
                if (user) {
                    setLoading(false);
                } else if (jwt) {
                    userAxiosInstance.get("/tokenCheck").then((response) => {
                        if (response.data.status) {
                            dispatch(userLogin({ username: jwt.username, token: jwt }))
                            setLoading(false);
                        }
                    });
                } else {
                    window.location.href = "/";
                }
            } else if (accessBy === "non-Authorized") {
                if (user) {
                    setLoading(false)
                } else if (jwt) {
                    userAxiosInstance.get("/tokenCheck").then((response) => {
                        if (response.data.status) {
                            dispatch(userLogin({ username: jwt.name, token: jwt}))
                            setLoading(false);
                        }
                    });
                }
            }
        }
        )();
    },[]);

    if (!loading && accessBy === "Authorized") {

        return children;
    } else if (!loading && accessBy === "non-Authorized") {
        console.log(!!loading);
        console.log(accessBy === "non-Authorized");
        navigate('/')
    } else if (loading && accessBy === "non-Authorized") {

        return children
    }

}