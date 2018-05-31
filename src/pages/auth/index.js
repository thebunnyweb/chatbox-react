import React from "react";
import AuthForm from "../../components/authform";
import firebase from "../../firebase";
import { history } from "react-router-dom";

class authpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata: {},
      loginSuccess: false
    };
  }

  submittofirebase = data => {
    const ref = firebase.database().ref("/users");
    ref.once("value", snapshot => {
      let snapdata = snapshot.val();
      let userdataglobal = {};
      snapdata.forEach(item => {
        if (item.name === data.name) {
          if (item.password === data.password) {
            userdataglobal = { ...item };
          }
        }
      });

      if (Object.keys(userdataglobal).length !== 0) {
        this.setState({
          userdata: {
            ...userdataglobal
          }
        });
        console.log(this.context);
        this.props.history.push({
          pathname: "/chatbox",
          state: this.state.userdata
        });
      } else {
        alert("nope");
      }
    });
  };

  componentDidMount() {}

  render() {
    return (
      <div style={{ margin: 10 }}>
        <h1> Shoutbox Login</h1>
        <AuthForm submitdatabase={this.submittofirebase} />
      </div>
    );
  }
}

export default authpage;
