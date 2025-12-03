import NavBar from "./NavBar"; 
import {useState,useRef} from "react";
import {getAuth, sendPasswordResetEmail} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import app from "./Firebase";

function ForgotPassword()
{

	const nav=useNavigate();
	const rUsername=useRef();

	const [username,setUsername]=useState("");
	const [msg,setMsg]=useState("");

	const hUsername=(event)=>{setUsername(event.target.value);}

	const save= (event)=>{
		event.preventDefault();
		const auth=getAuth();
		sendPasswordResetEmail(auth,username)
		.then(res=>{
			nav("/");
		})
		.catch(err=>{
			setMsg("issue "+err);
		});
}	

	return(
	<>
	<center>
	<NavBar/> 
	<h1> Forgot Password </h1>
	<form onSubmit={save}>
		<input type="email" placeholder="enter reg email address" ref={rUsername} onChange={hUsername} value={username} />
		<br/><br/>
		<input type="submit" value="reset" />
	</form>
	<h2>{msg}</h2>
	<h3>check your email</h3>
	</center>
	</>
);
}
export default ForgotPassword;

