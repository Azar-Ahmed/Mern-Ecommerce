import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import {Button} from 'antd'
import {MailOutlined, GoogleOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {createOrUpdateUser} from '../../functions/auth'


const Login = ({history}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const {user} = useSelector((state)=>({...state}))
  useEffect(()=>{
      if(user && user.token) history.push('/')
  }, [user])

  let dispatch = useDispatch()

  const roleBasedRedirect = (res)=>{
    if(res.data.role === 'admin'){
      history.push('/admin/dashboard')
    }else{
      history.push('/user/history');
    }
  }

  // google login
const googleLogin = async () =>{
  auth.signInWithPopup(googleAuthProvider)
      .then(async (result) =>{
        const {user} = result
        const idTokenResult = await user.getIdTokenResult()
        createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload:{
              name: res.data.name,
              email: res.data.email,
              // password: res.data.password,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            }
          })
         roleBasedRedirect(res)

        })
        .catch((err) => console.log(`create or update error ${err}`))

            // history.push('/');
      })
      .catch(err=>{
        console.log(err)
        toast.error(err.message)
      })
}

  // handling form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const result = await auth.signInWithEmailAndPassword(email, password)
      const {user} = result;
      const idTokenResult = await user.getIdTokenResult()

      // console.log(idTokenResult)
       createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload:{
              name: res.data.name,
              email: res.data.email,
              // password: res.data.password,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            }
          })
         roleBasedRedirect(res)

        })
        .catch((err) => console.log(`create or update error ${err}`))

        // history.push('/');
    } catch (error) {
      console.log(error)
      setLoading(false)

      toast.error(error.message)
    }

    };

    // form 
  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control my-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email Address"
        autoFocus
      />
       <input
        type="password"
        className="form-control my-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
    <Button onClick={handleSubmit} type="primary" block shape="round" icon={<MailOutlined />} size="large" disabled={!email || password.length<6} className="mb-3 ">
      Login with Email/Password
    </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
         {loading? <h4>Loading...</h4> : <h4 className="text-info">Login</h4>} 
          {loginForm()}

          <Button onClick={googleLogin} type="danger" block shape="round" icon={<GoogleOutlined />} size="large" className="mb-3 ">
            Login with Google
          </Button>
           <Link to='/forgot/password' className="float-right text-danger">Forgot Password</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
