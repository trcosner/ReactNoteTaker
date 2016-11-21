import React from 'react';
import Repos from './github/Repos';
import UserProfile from './github/UserProfile';
import Notes from './notes/Notes';
import getGithubInfo from '../utils/helpers';
import Rebase from 're-base'

const base = Rebase.createClass({
  apiKey:'',
  authDomain: '',
  databaseURL: 'https://reactgithubnotetaker-5b9c3.firebaseio.com/',
  storageBucket: ''
})

class Profile extends React.Component{
  constructor(props){
    //ECMA2015 replaces componentWillMount
    super(props);
    this.state = {
      notes: [],
      bio: {},
      repos: []
    }
  }

  componentDidMount(){
    this.init(this.props.params.username);
  }

  componentWillReceiveProps(nextProps){
    base.removeBinding(this.ref)
    this.init(nextProps.params.username);
  }

  init(username){
    this.ref = base.bindToState(username, {
      context: this,
      asArray: true,
      state: 'notes'
    });

    getGithubInfo(username)
      .then(function(data){
        this.setState({
          bio: data.bio,
          repos: data.repos
        })
      }.bind(this));
  }

  componentWillUnmount(){
    base.removeBinding(this.ref)
  }

  handleAddNote(newNote){
    //update firebase with new note
    //TODO this seems dangerous
    console.log(newNote);
    base.post(this.props.params.username, {
      data: this.state.notes.concat([newNote])
    })
  }

  render(){
    return (
      <div className="row">
        <div className="col-md-4">
          <UserProfile username={this.props.params.username} bio={this.state.bio}/>
        </div>
        <div className="col-md-4">
          <Repos username={this.props.params.username} repos={this.state.repos}/>
        </div>
        <div className="col-md-4">
          <Notes username={this.props.params.username} notes={this.state.notes} addNote={(newNote) => this.handleAddNote(newNote)}  />
        </div>
      </div>
    )
  }
}

export default Profile
