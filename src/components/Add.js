import React from "react";
import { doc, setDoc, query, getDocs, collection, arrayUnion, updateDoc } from "firebase/firestore";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { UserContext } from "../App";
import Multiselect from "multiselect-react-dropdown";
import { CollectionsBookmarkRounded } from "@mui/icons-material";

function Add() {
  // Add a new document in collection "cities"
  // await setDoc(doc(db,  "users"), {
  //   name: "Los Angeles",
  //   state: "CA",
  //   country: "USA"
  // });
  const [registerName, setName] = useState("");
  const { email, setEmail } = useContext(UserContext);
  const [flag, setFlag] = useState(false);

  const [registerLinking, setLink] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const multiselectRef = React.createRef();
  const [options, setOptions] = useState([
    { name: "Defi" },
    { name: "DAO" },
    { name: "NFT" },
    { name: "Bitcoin" },
    { name: "Conferences" },
    { name: "Cryptocurrencies" },
    { name: "Ethereum" },
    { name: "Layer 2" },
    { name: "Web3 Dev" },
    { name: "Web3 Educational Resources" },
    { name: "Web3 VC" },
    { name: "Trading" },
    { name: "Smart Contracts" },
    { name: "Stablecoins" },
  ]);
  const navigate = useNavigate();

  const duplicateCheck = async function () {
    const q = query(collection(db, "table"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      if (doc.data().Link === registerLinking) {
        console.log(doc.data().Link);
        console.log(registerLinking);

        return true;
      }
    });
    console.log(registerLinking)
    return false;
  };


  const register = async () => {
    if (duplicateCheck() === true) {
      alert("Duplicate article being added. Please check your link");
    } else {
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
        });
        saveArticle()
        navigate("/homeWithLogIn");
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const saveArticle = async () => {
    await updateDoc(doc(db, "users", email), {
      Articles: arrayUnion(registerName),
    });
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
