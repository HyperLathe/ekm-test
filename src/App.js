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
  margin: 50px auto 0 auto;
  @media screen and (max-width: 768px) {
    width: 95vw;
  }
`;

const SearchBox = styled.input`
  width: 300px;
  padding: 5px;
  margin: 0px;
  outline: none;
  background: #e8e8e8;
  border: 0px;
  line-height: 2rem;
  font-size: 1.5rem;
  @media screen and (max-width: 768px) {
    width: calc(100% - 10px);
  }
`;

const SearchResultsList = styled.table `
  margin: 60px 0 0 0;
  width: 100%;
  tr:nth-child(odd) {
    background-color: #e8e8e8;
  }
  th, td {
      text-align: left;
      width: 25%;
      padding: 5px;
    }
`;

function App() {

  {/* setting up the search states: */}
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleChange = e => {
    setSearchText(e.target.value);
  };

  {/* search function hook: */}
  useEffect(() => {
    if (isNaN(searchText)) {
      const results = ActorData.filter(actor =>
        actor.name.toLowerCase().includes(searchText)
      );
      setSearchResults(results);
    } else {
      const results = ActorData.filter(actor =>
        actor.id.includes(searchText)
      );
      setSearchResults(results);
    };
    
   
  }, [searchText]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Actor Database</h1>
      </header>
      <Content>
        {/* Search box tied into the search hook: */}
        <p>Filter by name or ID: </p>
        <SearchBox type="text" placeholder="Search" value={searchText} onChange={handleChange}></SearchBox>
        <SearchResultsList>
          <tbody>
            <tr>
              <th>Name</th><th>ID</th><th>Height (Meters)</th><th>Date of Birth</th>
            </tr>
         {searchResults.map((item, key) => (
           <tr key={key}>
            <td>{item.name}</td><td>{item.id}</td><td>{item.height}</td><td>{item.dob}</td>
          </tr>
        ))}
        </tbody>
      </SearchResultsList>
      </Content>
    </div>
  );
}

export default App;
