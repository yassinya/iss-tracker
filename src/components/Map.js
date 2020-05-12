import React from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import Marker from "./Marker";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

class Map extends React.Component {
  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/satellite-v9",
      center: [this.props.lng, this.props.lat],
      zoom: this.props.zoom
    });
    const markerNode = document.createElement("div");
    ReactDOM.render(<Marker />, markerNode);
    this.marker = new mapboxgl.Marker(markerNode)
      .setLngLat([this.props.lng, this.props.lat])
      .addTo(this.map);

    setInterval(() => {
      this.marker.setLngLat([this.props.lng, this.props.lat]);
    }, 1000);
  }

  render() {
    return (
      <div ref={el => (this.mapContainer = el)} className="mapContainer"></div>
    );
  }
}

export default Map;
