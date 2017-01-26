import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  changeName = () => {
    this.setState({ otherName: 'Adam' });
  }

  render() {
    const { data } = this.props;
    const { otherName } = this.state;
    return (
      <div className="App" onClick={ this.changeName }>
        <b>{ `Hello ${otherName || data.name}` }</b>
      </div>
    );
  }
}

App.propTypes = {
  data: React.PropTypes.object.isRequired,
};

export default App;

