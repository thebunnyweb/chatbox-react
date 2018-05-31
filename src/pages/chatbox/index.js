import React from "react";
import { Redirect } from "react-router-dom";
import { Label } from "semantic-ui-react";
import MessagesMain from "../../components/messages";

class chatbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.location.state,
      random: 0,
      randomColor: ""
    };
  }

  componentWillMount() {
    const { name } = this.state;
    if (!name) {
      this.props.history.push({
        pathname: "/"
      });
    }
    let avatar = ["elliot", "joe", "stevie"];
    let random =
      avatar[Math.floor(Math.random(avatar.length - 1) * avatar.length)];

    let colors = [
      "red",
      "orange",
      "yellow",
      "olive",
      "green",
      "teal",
      "blue",
      "violet",
      "purple",
      "pink",
      "brown",
      "grey",
      "black"
    ];

    let randomColor =
      colors[Math.floor(Math.random(colors.length - 1) * colors.length)];

    this.setState({
      random: random,
      randomColor: randomColor
    });
  }

  render() {
    const { name, random } = this.state;

    return (
      <div style={{ margin: 10 }}>
        <Label image>
          <img
            src={
              "https://react.semantic-ui.com/assets/images/avatar/small/" +
              random +
              ".jpg"
            }
          />
          Rock on {name}
        </Label>
        <div className="ui divider" />
        <MessagesMain user={this.state.name} color={this.state.randomColor} />
      </div>
    );
  }
}

export default chatbox;
