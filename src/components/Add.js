import React from "react";
import { doc, setDoc } from "firebase/firestore";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { UserContext } from "../App";
import Multiselect from "multiselect-react-dropdown";
import { yellow } from "@mui/material/colors";

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
  const [selectedTags, setSelectedTags] = useState([]);
  const multiselectRef = React.createRef();
  const [options, setOptions] = useState([
    { name: "Option 1️⃣" },
    { name: "Option 2️⃣" },
  ]);
  const navigate = useNavigate();

  const register = async () => {
    try {
      const items = multiselectRef.current.getSelectedItems();
      let tempTags = [];
      items.forEach(function (item) {
        console.log(item.name);
        tempTags.push(item.name);
      });

      await setDoc(doc(db, "table", registerName), {
        Name: registerName,
        Link: registerLinking,
        Description: tempTags,
        Upvotes: 0,
        Color: yellow[500]
      });
      navigate("/homeWithLogIn");
    } catch (error) {
      console.log(error.message);
    }
  };

  const onSelect = (selectedList, selectedItem) => {
    console.log("onselect");
    const items = multiselectRef.current.getSelectedItems();
    console.log(items);
  };

  const onRemove = (selectedList, removedItem) => {
    console.log("onremove");
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
        <Multiselect
          options={options} // Options to display in the dropdown
          onSelect={onSelect} // Function will trigger on select event
          onRemove={onRemove} // Function will trigger on remove event
          displayValue="name"
          ref={multiselectRef}
          // Property name to display in the dropdown options
        />

        <button onClick={register}> Save Article</button>
      </div>
    </div>
  );
}

export default Add;
