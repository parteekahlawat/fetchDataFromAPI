import { React, useState, useEffect } from "react";
import "./dashboard.css";

function Dashboard() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [display, setDisplay] = useState({});

  //Fetch Data from API and set it to data
  const fetchdata = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    fetchdata();
  }, []);

  //Sort by Name button
  const sortbyName = () => {
    const updatenames = [...data].sort((a, b) => (a.name > b.name ? 1 : -1));
    console.log(updatenames);
    setData(updatenames);
  };

  //Sort by ID button
  const sortbyID = () => {
    const updateID = [...data].sort((a, b) => (a.id > b.id ? 1 : -1));
    console.log(updateID);
    setData(updateID);
  };

  //Sort by City button
  const sortbyCity = () => {
    const updateCity = [...data].sort((a, b) =>
      a.address.city > b.address.city ? 1 : -1
    );
    console.log(updateCity);
    setData(updateCity);
  };

  //Set searched value to search
  const searchElement = (event) => {
    setSearch(event.target.value);
  };
  //set value to display to show - Not Found alert when not found
  const displayValue = () => {
    if (search === "") {
      alert("Please enter Value");
      return;
    }
    let val = data.find((item) => {
      return item.username === search;
    });
    if (!val) {
      alert("Not Found");
      return;
    }
    console.log(val);
    setDisplay(val);
  };

  //Jsx
  return (
    <>
      {/* Show data table --------------------------*/}
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Company</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.company.name}</td>
                <td>{user.address.city}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Display total number of elements in data -------------------------*/}
      <div className="total">Total is: {data.length}</div>

      {/* buttons for sorting */}
      <button className="btn" onClick={sortbyName}>
        Sort By name
      </button>
      <button className="btn" onClick={sortbyID}>
        Sort By ID
      </button>
      <button className="btn" onClick={sortbyCity}>
        Sort By City
      </button>

      {/* search input --------------------------------*/}
      <div className="search">
        <input
          type="search"
          placeholder="Username"
          value={search}
          onChange={searchElement}
        />
        <button className="btn" onClick={displayValue}>
          Search
        </button>
      </div>

      {/* Display searched value -----------------------------*/}
      <div className="display-search">
        {data.map((user) => {
          if (display.id === user.id) {
            return (
              <table>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Company</th>
                    <th>City</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{display.id}</td>
                    <td>{display.name}</td>
                    <td>{display.username}</td>
                    <td>{display.email}</td>
                    <td>{user.company.name}</td>
                    <td>{user.address.city}</td>
                  </tr>
                </tbody>
              </table>
            );
          }
        })}
      </div>
    </>
  );
}
export default Dashboard;
