import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch("https://d3rno3xn80u5m0.cloudfront.net/dev/customer")
      .then((res) => res.json())
      .then((data) => console.log(data));
    // .then((json) => {
    //    this.state({
    //     isLoaded: true,
    //      items: json,
    //   });
    //  });
  }

  render() {
    return <div>Is Loading !!!!!!!!!....</div>;
  }
  /*
    var { isLoaded, items } = this.state;

    if (!isLoaded) {
      return <div>Is Loading !!!!!!!!!....</div>;
    } else {
      return <div classname="App">Data has been loaded</div>;
    }
  }

  */
}

export default App;
