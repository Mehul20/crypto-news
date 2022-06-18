import { doc, setDoc } from "firebase/firestore";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { UserContext } from "../App";

function Add() {
  // Add a new document in collection "cities"
  // await setDoc(doc(db,  "users"), {
  //   name: "Los Angeles",
  //   state: "CA",
  //   country: "USA"
  // });
  const [registerName, setName] = useState("");
  const { email, setEmail } = useContext(UserContext);
  const [registerLinking, setLink] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    try {
      await setDoc(doc(db, "table", registerName), {
        Name: registerName,
        Link: registerLinking,
        Description: "okay",
        Upvotes: 0,
      });
      navigate("/homeWithLogIn");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div>
        {console.log(email)}
        <h3> Add Website </h3>
        <input
          placeholder="Name of the Resource"
          onChange={(event) => {
            setName(event.target.value);
          }}
        ></input>
        <input
          placeholder="Link"
          onChange={(event) => {
            setLink(event.target.value);
          }}
        />
        <div></div>

        <button onClick={register}> Save Article</button>
      </div>
    </div>
  );
}

export default Add;
