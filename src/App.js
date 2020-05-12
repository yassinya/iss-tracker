import React from "react";
import logo from "./logo.svg";
import Map from "./components/Map";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 2,
      ready: false
    };
  }

  componentDidMount() {
    this.updateCoordinates();
    setInterval(this.updateCoordinates, 5000);
  }

  render() {
    return (
      <div>
        {this.state.ready ? (
          <Map lat={this.state.lat} lng={this.state.lng} zoom="3" />
        ) : (
          <div className="loadScreen">
            <h1>Loading...</h1>
          </div>
        )}
      </div>
    );
  }

  updateCoordinates = () => {
    fetch("http://api.open-notify.org/iss-now.json")
      .then(res => res.json())
      .then(data => {
        console.log(data.iss_position);
        this.setState({
          lat: data.iss_position.latitude,
          lng: data.iss_position.longitude,
          ready: true
        });
        console.log(this.state.lat);
      })
      .catch(console.log);
  };
}

export default App;
