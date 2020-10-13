import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customersArray: [],
      isCustomerLoaded: false,
      productsArray: [],
      isProductLoaded: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log("Inside Handle Submit !!!");
    console.log(data.get("order_id"));
    console.log(data.get("pro_id"));
    console.log(data.get("cust_id"));
    console.log(data.get("order_comments"));
    console.log(JSON.stringify(data));
    console.log(
      JSON.stringify({
        order_id: data.get("order_id"),
        pro_id: data.get("pro_id"),
        cust_id: data.get("cust_id"),
        order_comments: data.get("order_comments"),
      })
    );

    fetch("https://d3rno3xn80u5m0.cloudfront.net/dev/order", {
      method: "POST",
      body: JSON.stringify({
        order_id: data.get("order_id"),
        pro_id: data.get("pro_id"),
        cust_id: data.get("cust_id"),
        order_comments: data.get("order_comments"),
      }),
    })
      .then((res) => res.json())
      .then(
        alert(
          "Order Placed! You will recieve final confirmation if your account has available funds."
        )
      );
    //.then((data) => console.log(data));
  }

  componentDidMount() {
    this.getCustomerData();
    this.getProductData();
    //this.customerTable(this.json);
  }

  async getCustomerData() {
    console.log("Calling Customer API !!!");
    fetch("https://d3rno3xn80u5m0.cloudfront.net/dev/customer", {
      method: "get",
    })
      .then((res) => res.json())
      //.then((data) => console.log(data));

      .then((json) => {
        this.setState({
          isCustomerLoaded: true,
          customersArray: json,
        });
      });
  }

  async getProductData() {
    console.log("Calling Product API !!!");
    fetch("https://d3rno3xn80u5m0.cloudfront.net/dev/product", {
      method: "get",
    })
      .then((res) => res.json())
      //.then((data) => console.log(data));

      .then((json) => {
        this.setState({
          isProductLoaded: true,
          productsArray: json,
        });
      });
  }

  customerTable(json) {}

  render() {
    var {
      isCustomerLoaded,
      customersArray,
      isProductLoaded,
      productsArray,
    } = this.state;

    console.log(
      isCustomerLoaded,
      customersArray,
      isProductLoaded,
      productsArray
    );

    if (!isCustomerLoaded && !isProductLoaded) {
      return <div>Is Loading !!!!!!!!!....</div>;
    } else {
      return (
        <div className="App">
          <div>{<h1>Octank Retail</h1>}</div>

          <div>{<h2>Customers ------></h2>}</div>
          <div>
            {
              <table>
                <thead>
                  <tr>
                    <th>Customer ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Address</th>
                    <th>State</th>
                    <th>Zip</th>
                    <th>Country</th>
                  </tr>
                </thead>
                {customersArray.map((customer) => (
                  <tr key={customer.customerID}>
                    <td>{customer.customerID}</td>
                    <td>{customer.customerFirstName}</td>
                    <td>{customer.customerLastName}</td>
                    <td>{customer.address}</td>
                    <td>{customer.state}</td>
                    <td>{customer.zip}</td>
                    <td>{customer.country}</td>
                  </tr>
                ))}
              </table>
            }
          </div>
          <div>{<h2>Products ------> </h2>} </div>
          <div>
            {
              <table>
                <thead>
                  <tr>
                    <th>Product ID</th>
                    <th> Name</th>
                    <th>Description</th>
                    <th>Vendor Code</th>
                    <th>Vendor Name</th>
                    <th>Rating-Stars</th>
                    <th>Review</th>
                  </tr>
                </thead>
                {productsArray.map((products) => (
                  <tr key={products.prodID}>
                    <td>{products.prodID}</td>
                    <td>{products.prodName}</td>
                    <td>{products.prodDesc}</td>
                    <td>{products.prodVendorCode}</td>
                    <td>{products.prodVendorName}</td>
                    <td>{products.prodStars}</td>
                    <td>{products.prodReview}</td>
                  </tr>
                ))}
              </table>
            }
          </div>

          <div>{<h1>------------------------- </h1>} </div>

          <div>
            <form name="OrderDetails" onSubmit={this.handleSubmit}>
              <label htmlFor="order_id">Order ID</label>
              <input id="order_id" name="order_id" type="text" />

              <label htmlFor="pro_id">Product ID</label>
              <input id="pro_id" name="pro_id" type="text" />

              <label htmlFor="cust_id">Customer ID</label>
              <input id="cust_id" name="cust_id" type="text" />

              <label htmlFor="order_comments">Order Comments</label>
              <input id="order_comments" name="order_comments" type="text" />

              <button>Order !!</button>
            </form>
          </div>
          <div>{<h1>------------------------- </h1>} </div>
        </div>
      );
    }
  }
}

export default App;
