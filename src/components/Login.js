import { useEffect, useState , useContext } from "react"
import { loginApi } from "../services/UserSevices"
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../Context/UserContext';   

const Login = () => {

    const { loginContext } = useContext(UserContext)
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isShowPassword,setIsShowPassword] = useState(false)
    const [loadingAPI, setLoadingAPI] = useState(false)

    // disabled Login
    // useEffect(() => {
    //     let token = localStorage.getItem("token")
    //     console.log(token)
    //     if(token) {
    //         navigate("/users")
    //     }
    // },[])

    const handelLoggin = async () => {
        if(!email || !password) {
            toast.error("Email/Password is requied !")  
            return
        }   
        setLoadingAPI(true)
        let res = await loginApi(email,password)

        if( res && res.token) { 
            loginContext(email, res.token)
            navigate("/users")
           
        }else {
            //err
            toast.error(res.data.error)
        }
        setLoadingAPI(false)
    }

    const handelGoback = () => {
        navigate("/")
    }

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
                />
                <i  class={isShowPassword === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                    onClick={() => setIsShowPassword(!isShowPassword)}
                ></i>
            </div>
            
            <button 
                className={email && password ? "active" : ""}
                disabled={email && password ? false : true }
                onClick={() => handelLoggin()}
            > 
                {loadingAPI && <i className="fas fa-sync fa-spin"></i>} 
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