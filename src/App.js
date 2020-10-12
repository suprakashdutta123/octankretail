import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    this.getCustomerData();
  }

  async getCustomerData() {
    console.log("Calling API !!!");
    fetch(
      "https://dfiups7yk7.execute-api.us-east-2.amazonaws.com/dev/customer",
      {
        method: "get",
      }
    )
      .then((res) => res.json())
      // .then((data) => console.log(data))
      .then((json) => {
        this.setState({
          isLoaded: true,
          items: json,
        });
      });
  }

  render() {
    var { isLoaded, items } = this.state;

    console.log(isLoaded, items);

    if (!isLoaded) {
      return <div>Is Loading !!!!!!!!!....</div>;
    } else {
      return (
        <div className="App">
          Data has been loaded{" "}
          {this.state.items.map((customer) => (
            <div key={customer.customerID}>
              <h3>{customer.customerFirstName}</h3>
            </div>
          ))}
        </div>
      );
    }
  }
}

export default App;
