import React from "react";
import { useState, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { db } from "../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { UserContext } from "../App";

function Signup() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerFullName, setRegisterFullName] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const { email, setEmail } = useContext(UserContext);
  const navigate = useNavigate();
  // const { profileType, setProfileType } = useContext(ProfileContext);

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
      await setDoc(doc(db, "users", registerEmail), {
        Email: registerEmail,
        Name: registerFullName,
        Upvotes: null,
      });

      navigate("/homeWithLogIn");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div>
        <h3> Register User </h3>
        <input
          placeholder="Full Name"
          onChange={(event) => {
            setRegisterFullName(event.target.value);
          }}
        ></input>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
            setEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />
        <div></div>

        <button onClick={register}> Create User</button>
      </div>
    </div>
  );
}

export default Signup;
