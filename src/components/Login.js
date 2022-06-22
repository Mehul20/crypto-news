import { useState, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { UserContext } from "../App";

function Login() {
  const { email, setEmail } = useContext(UserContext);

  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, loginPassword);

      console.log("logged in");

      navigate("/homeWithLogIn");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="App">
      <div>
        <h3> Login </h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          type="password"
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />
        <div>
          <button onClick={login}> Login</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
