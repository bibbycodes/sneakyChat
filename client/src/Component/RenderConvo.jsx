import React, { Component } from "react";

class Convo extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userId: this.props.user.id,
    };
  console.log(this.props.user.id)

  }

  render() {
    return (
      <div>
        <label>

        </label>
      </div>
    );
  }
}

export default Convo;
