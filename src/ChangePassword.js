import NavBar from "./NavBar";
import {useState,useRef} from "react";
import {getAuth, updatePassword} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import app from "./Firebase";

function ChangePassword()
{
	const[password1,setPassword1]=useState("");
	const rPassword1=useRef();
	const hPassword1=(event)=> {setPassword1(event.target.value);}

	const[password2,setPassword2]=useState("");
	const rPassword2=useRef();
	const hPassword2=(event)=> {setPassword2(event.target.value);}

	const[msg,setMsg]=useState(""); 

	const save = (event)=>{
		event.preventDefault();
	}
	return(
	<>
	<center>
	<NavBar/> 
	<h1> CHANGE PASSWORD </h1>
	<form onSubmit={save}>
		<input type="password" placeholder= "enter new password" ref={rPassword1} onChange={hPassword1}	value={password1} />
		<br/><br/>
		<input type="password" placeholder= "confirm new password" ref={rPassword2} onChange={hPassword2}	value={password2} />
		<br/><br/>
		<input type="submit" value="change password" />
	</form>
	<h2>{msg}</h2>		
	</center>
	</>
);
}
export default ChangePassword;

