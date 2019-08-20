import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import './App.css';
import axios from 'axios';

class App extends Component {

constructor(props) {
  super(props);

  this.state = {
    users: [],
    avatar: {isHidden: true},
    page: 1,
    pageNext: 2,
    value: '',
    filteredList: [],
    listContacts: this.listContacts.bind(this)
    };
}

componentDidMount(){
  let page= this.page;
  axios.get('https://reqres.in/api/users?per_page=6&${page}')
    .then(data=>{this.setState({users: data.data.data})})
    .then(names=>this.setState({filteredList: names}))
}

hideAvatar = () => {
  this.setState({
    avatar: {isHidden: true}
  });
  console.log('avatar clicked!');
}

changePageNext = () => {
console.log(this.state);
let pageChange = this.state.page
pageChange++
let pageChangeNext = this.state.pageNext
pageChangeNext++
axios.get(`https://reqres.in/api/users?per_page=6&page=${pageChange}`).then(data=>{
this.setState({page: pageChange, pageNext:pageChangeNext, users: data.data.data})
console.log(this.state)
})
this.listContacts()
}

changePageBack = () => {
console.log(this.state);
let pageChange = this.state.page
pageChange--
let pageChangeNext = this.state.pageNext
pageChangeNext--
axios.get(`https://reqres.in/api/users?per_page=6&page=${pageChange}`).then(data=>{
this.setState({page: pageChange, pageNext:pageChangeNext, users: data.data.data})
console.log(this.state)
})
this.listContacts()
}

listContacts = () => {
  let userList = this.state.users.map(m => {
  return <div key={m.id}>
    <button onClick={this.hideAvatar.bind(this)}>
      <a href="#" className="ui avatar image">
        <img alt="avatar" src={m.avatar} />
      </a>
    </button>
      <br></br>

    {m.first_name} {m.last_name}<div email={m.id}>{m.email}
      <br></br>
      <br></br>
    </div>
  </div>
})
  return userList
}

//dynamically update search input
inputFirstName = (e) => {
  console.log(this.state);

  let updatedList = this.state.filteredList;
  const newSearch = document.getElementById("searchName");
  const searched = document.getElementById("searchBar");

    if (newSearch.value !== "") {
      updatedList.push(newSearch.value);
      this.setState({
        updatedList: updatedList
      });
      searched.reset();
    }
  }

  //filter through updatedList, match with input
  // filtered = _.filter(users, (person) => {
  //   person.first_name.indexOf(value) > -1
  // });
  // console.log(filtered);

handleSearchChange = (e) => {
  //console.log('search' , this.state.value);
  e.preventDefault();
  this.setState({
    value: e.target.value
  });
  console.log(e.target.value);
  this.inputFirstName()
}

// handleSubmit = (e) => {
//   console.log(this.state.value);
//   e.preventDefault();
// }

  render(App) {
    return (

      <div className="App">
        <header className="App-header">

          <div className= "ui myList">
          <br></br><br></br><br></br>
          <b>My Contact List</b>

          <form id="searchBar" className="Search-bar ui search">
          <br></br><br></br>
            <label>
            <input id="searchName" value={this.state.value} className="prompt" type="text submit" placeholder="search by first name..." onChange={this.handleSearchChange}/>
            </label>
            <button className="button is-info" onClick={this.inputFirstName}>Search</button>
          </form>

          <br></br>
          <br></br>

          <div className="ui inverted active button" id="Btn1" onClick={this.changePageBack}> {this.state.page} </div>
          <div className="ui inverted active basic button" id="Btn2" onClick={this.changePageNext}> {this.state.pageNext} </div>

          <br></br>
          <br></br>

            <div className= 'Contacts'>
              {this.listContacts()}
            </div>
          </div>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >

          </a>
        </header>
      </div>
    );
  }
}

export default App;
