import React from "react";
import firebase from "../../firebase";
import { Button, Label, Input } from "semantic-ui-react";
import ReactEmoji from "react-emoji";
import Linkify from "react-linkify";
import Sound from "react-sound";

class MessagesMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newText: "",
      sound: false
    };
  }

  componentDidMount() {
    this.updatefirebase();
    const ref = firebase.database().ref("/");
    ref.on("value", snapshot => {
      this.updatefirebase();
    });
  }

  updatefirebase = () => {
    const ref = firebase.database().ref("/messages");
    ref.once("value", snapshot => {
      let snapmessages = snapshot.val();
      let statemessages = [];
      for (let message in snapmessages) {
        statemessages.push(snapmessages[message]);
      }
      this.setState({
        messages: statemessages,
        newText: "",
        sound: true
      });
    });

    setTimeout(() => {
      let messagebox = document.querySelector(".messgaebox");
      if (messagebox && messagebox !== null) {
        messagebox.scrollTo(0, messagebox.scrollHeight);
      }
    }, 0);
  };

  updatenewtext = e => {
    this.setState({
      newText: e.target.value
    });
  };

  sendmessage = () => {
    const { newText } = this.state;
    const ref = firebase.database().ref("/messages");
    if (newText && newText !== "") {
      ref.push({
        name: this.props.user,
        message: newText
      });

      this.updatefirebase();
    }
  };

  handleSongFinishedPlaying = () => {
    this.setState({
      sound: false
    });
  };

  render() {
    return (
      <div>
        <p>Shout Box</p>
        <div className="messgaebox">
          {this.state.sound && (
            <Sound
              url="https://raw.githubusercontent.com/scottschiller/SoundManager2/master/demo/_mp3/select.mp3"
              playStatus={Sound.status.PLAYING}
              playFromPosition={0}
              onFinishedPlaying={this.handleSongFinishedPlaying}
            />
          )}
          {this.state.messages && this.state.messages.length > 0 ? (
            this.state.messages.map((item, i) => {
              return (
                <div
                  key={i}
                  className={
                    item.name === this.props.user
                      ? "alignright bubbles"
                      : "bubbles"
                  }
                >
                  <Label color={this.props.randomColor} image>
                    {item.name === this.props.user ? (
                      <span style={{ color: "orange" }}>
                        <strong>You</strong>
                      </span>
                    ) : (
                      item.name
                    )}
                  </Label>
                  <Label basic>
                    <Linkify>{ReactEmoji.emojify(item.message)}</Linkify>
                  </Label>
                </div>
              );
            })
          ) : (
            <h1>No Messages Yet</h1>
          )}
        </div>
        <div>
          <Input
            value={this.state.newText}
            type="text"
            name="ping"
            onChange={this.updatenewtext}
            className="boxinput"
          />
          <Button onClick={this.sendmessage}>Send</Button>
        </div>
      </div>
    );
  }
}

export default MessagesMain;
