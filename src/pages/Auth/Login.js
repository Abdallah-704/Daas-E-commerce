// /* eslint-disable jsx-a11y/alt-text */
// import axios from "axios";
// import { useEffect, useRef, useState } from "react";
// import { api, api_login } from "../../API/Api";
// import Loading from "../../components/loading/Loading";
// import Cookie from 'cookie-universal'
// import { Form } from "react-bootstrap";
// const Login = () => {
//     const [form,setForm]=useState({
//         email:"",
//         password:""
//     })
//     const[loading,setLoading]=useState(false)

import IndexLogin from "../../components/website/Login/Login";

//     const cookie=Cookie();

//     const focus=useRef()
//     useEffect(()=>{
//         focus.current.focus()
//     },[])

//     const[err,setErr]=useState("")
//     function handleformchange(e){
//         setForm({...form,[e.target.name] : e.target.value})
//     }
//     async function Submit(e){
//         e.preventDefault();
//         setLoading(true)
//         try{
//             let res =await axios.post(`${api}/${api_login}`,form)
//             setLoading(false)
//             let token=res.data.token;
//             const role=res.data.user.role
//             const to=role ==="1995" ?"users" : role ==="1999"?"categories" : "writer"
//             cookie.set("Bearer",token)
//             window.location.pathname=`/dashboard/${to}`


//         }catch(err){
//             setLoading(false)
//             if(err.response===422){

//                 setErr("Email or password is wrong")
//             }
//             else{
//                 setErr("Error international ")
//                 }
//         }
//     }
//     console.log(form)
//     return (
//         <>
//         {loading && <Loading />}
//         <div className="container">
//          <div className="register " style={{height:"100vh"}}>
//                 <Form className="form" onSubmit={Submit}>
//                 <div className="custom-form">
//                     <h1 className="mb-5">Login Now</h1>
//                 <Form.Group className="f-control" controlId="exampleForm.ControlInput1">
//                     <Form.Control
//                     ref={focus}
//                     name="email"
//                     value={form.email}
//                     onChange={handleformchange}
//                     required
//                     type="email" placeholder="Enter your password" />
//                     <Form.Label>Email :</Form.Label>
//                 </Form.Group>
//                 <Form.Group className="f-control" controlId="exampleForm.ControlInput2">
//                     <Form.Control
//                     name="password"
//                     value={form.password}
//                     onChange={handleformchange}
//                     required
//                     minLength={8}
//                     type="password" placeholder="Enter your password" />
//                     <Form.Label>password :</Form.Label>
//                 </Form.Group>
//                 {err !== "" && <span className="error">{err}</span>}
//                 <button className="btn_1">Login</button>
//                 <div className="google-btn">
//                 <a href={`http://127.0.0.1:8000/login-google`}>
//                     <p className="btn-text m-0">login with google</p>
//                 </a>
//                 </div>
//                 </div>
//             </Form>
//             </div>
//         </div>
//         </>
//     );
// }

// export default Login;
const Login = () => {
    return (
        <IndexLogin />
    );
}

export default Login;














