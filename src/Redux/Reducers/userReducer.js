import { 
        FETCH_USER_LOGIN, 
        FETCH_USER_SUCCES, 
        FETCH_USER_ERROR , 
        USER_LOGOUT, 
        HANDEL_REFRESH

} from "../Actions/userAction";

const INITIAL_STATE = {

    account: {
        email: '',
        auth: null,
        token : ''
    },
    isLoading : false,
    isError: false

};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
            case FETCH_USER_LOGIN:
            return {
                ...state, 
                account: {
                    auth: false
                },
                isLoading : true,
                isError: false
            };
       
           case FETCH_USER_ERROR:
            return {
               ...state,
               isLoading : false,
               isError: true
            };

            case FETCH_USER_SUCCES:
               return {
                  ...state,
                  account: {
                      email: action.data.email,
                      token: action.data.token,
                      auth: true 
                  },
                  isLoading : false,
                  isError: false
               };
            
            case USER_LOGOUT:
                localStorage.removeItem('email')
                localStorage.removeItem('token')
                return {
                    ...state,
                    account: {
                        email: '',
                        token: '',
                        auth: false
                    },
                }   
            
            case HANDEL_REFRESH: {
                return {
                    ...state,
                    account: {
                        email: localStorage.getItem('email'),
                        token: localStorage.getItem('token'),
                        auth: true
                    },
                } 
            }
         default: return state;
    }
};

export default userReducer;