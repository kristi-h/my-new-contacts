import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

constructor(props) {
  super(props);

  this.state = {
    users: [],
    avatar: true,
    page: 1,
    pageNext: 2,
    value: '',
    firstName: []
  };
}

   componentDidMount(){
    let page= this.page;
    axios.get('https://reqres.in/api/users?per_page=6&${page}').then(data=>{this.setState({users: data.data.data})})
  }

hideAvatar = () => {
  this.setState({
    avatar: !this.state.avatar
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
this.mapUsers()
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
this.mapUsers()
}

mapUsers = () => {
  let userList = this.state.users.map(m => {
  return <div key={m.id}>
    <button onClick={ () => this.hideAvatar()}>
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

filterFirstName = (e) => {
  console.log(this.state);
  const filteredList = this.state.users.filter( item => (
      item.first_name.toLowerCase().search(this.state.value.toLowerCase() !== -1)
  ))
  //this.setState({ filtered: filteredList });
};

handleSearchChange = (e) => {
  //console.log('search' , this.state.value);
  this.setState({
    value: e.target.value
  });
  this.filterFirstName()
}

handleSubmit = (e) => {
  console.log(this.state.value);
  e.preventDefault();
}

  render() {
    return (

      <div className="App">
        <header className="App-header">

          <div className= "ui myList">
          <br></br><br></br><br></br>
          <b>My Contact List</b>

          <form className="Search-bar ui search" onSubmit={this.handleSubmit}>
          <br></br><br></br>
            <label>
            <input value={this.state.value} className="prompt" type="text submit" placeholder="search by first name..." onChange={this.handleSearchChange}/>
            </label>
            <button type="submit">Search</button>
          </form>

          <br></br>
          <br></br>

          <div className="ui inverted active button" id="Btn1" onClick={this.changePageBack}> {this.state.page} </div>
          <div className="ui inverted active basic button" id="Btn2" onClick={this.changePageNext}> {this.state.pageNext} </div>

          <br></br>
          <br></br>

            <div className= 'Contacts'>
              {this.mapUsers()}
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
