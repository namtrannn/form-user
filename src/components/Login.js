import { useEffect, useState } from "react"
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { handelLoginRedux } from "../Redux/Actions/userAction";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isShowPassword,setIsShowPassword] = useState(false)

    const isLoading = useSelector(state => state.user.isLoading) 
    const account = useSelector(state => state.user.account) 

    const handelLoggin = async () => {
        if(!email || !password) {
            toast.error("Email/Password is requied !")  
            return
        }   

        dispatch(handelLoginRedux(email, password))
    }

    const handelGoback = () => {
        navigate("/")
    }

    const handelPressEnter = (even) => {
        if(even && even.code === 'Enter') {
            handelLoggin()
        }
    }

    useEffect(() => {
        if(account && account.auth === true) {
            navigate("/users")
        }
    },[account, navigate])

    return (<>
        <div className="login-container col-12 col-sm-4">
            <div className="title">Login</div>
            <div className="text">Email or user name ( eve.holt@reqres.in )</div>
            <input  type="text" 
                    placeholder="Email or user name..."
                    value={email}
                    onChange={(even) => setEmail(even.target.value)}
            />
            <div className="input-eye"> 
                <input  type={isShowPassword === true ? "text" : "password"} 
                        placeholder="password..."
                        value={password}
                        onChange={(even) => setPassword(even.target.value)}
                        onKeyDown={(even) => handelPressEnter(even)}
                />
                <i  className={isShowPassword === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                    onClick={() => setIsShowPassword(!isShowPassword)}
                ></i>
            </div>
            
            <button 
                className={email && password ? "active" : ""}
                disabled={email && password ? false : true }
                onClick={() => handelLoggin()}
            > 
                {isLoading && <i className="fas fa-sync fa-spin"></i>} 
                &nbsp; Login
            </button>
            <div className="back">
                <i className="fa-solid fa-caret-left"></i>
                <span onClick={() => handelGoback()}>&nbsp;Go back</span>
            </div>
        </div>
    </>)
}

export default Login