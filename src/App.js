import React, { useState, useEffect } from "react";
import './App.css';
import styled from "styled-components/macro";

/* Import the JSON: */
import ActorData from "./data/actors.json";

/* Add styled component CSS */
const Content = styled.section`
  display: flex;
  flex-direction: column;
  width: 70vw;
  margin: 0px auto;
`;

const ActorList = styled.ul `
  margin: 20px 0 0 0;
  padding: 0;
  list-style-type: none;
`;

const ActorListKey = styled.div `
  margin: 0 0 25px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
    span {
      width: 20%;
      font-weight: 600;
        &:first-child {
          width: 40%;
        }
    }
`;

const ActorInfo = styled.li`
  padding: 5px 0px;
  display: flex;
  justify-content: space-around;
  align-items: center;
    span {
      width: 20%;
        &:first-child {
          width: 40%;
        }
    }
`;

const SearchBox = styled.input`
  margin: 50px auto 0 auto;
  width: 50%;
`;

const SearchResultsList = styled.ul `
  list-style-type: none;
`;




  /* create arrays for Actors and IDs: */
  let actorArray = [];
  let idArray = [];

  for(var i in ActorData) {
    let item = ActorData[i];
    actorArray.push(item.name);
    idArray.push(item.id);
  };

  /* checking the array output: */
  console.log(actorArray, idArray);


function App() {

  {/* setting up the search states: */}
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleChange = e => {
    setSearchText(e.target.value);
  };

  {/* search function hook: */}
  useEffect(() => {
    const results = actorArray.filter(actor =>
      actor.toLowerCase().includes(searchText)
    );
    setSearchResults(results);
  }, [searchText]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Actor Database</h1>
      </header>
      <Content>
        <ActorList>
          <ActorListKey><span>Name:</span><span>ID:</span><span>Height:</span><span>Date of Birth:</span></ActorListKey>
          {/* iterate over items in the JSON: */}
          {Object.entries(ActorData).map(([key, value]) => {
            return (<ActorInfo key={key}>
                <span>{value.name}</span>
                <span>{value.id}</span>
                <span>{value.height}</span>
                <span>{value.dob}</span>
              </ActorInfo>)
          })}
        </ActorList>
        {/* Search box tied into the search hook: */}
        <SearchBox type="text" placeholder="Search" value={searchText} onChange={handleChange}></SearchBox>
        <SearchResultsList>
         {searchResults.map(item => (
          <li>{item}</li>
        ))}
      </SearchResultsList>
      </Content>
    </div>
  );
}

export default App;
