import React, { Component } from "react";
import styled from "styled-components";
import { GoogleMapAPI } from "../../constants";

const Wrapper = styled.div(({ width, height }) => ({
  width: width || "500px",
  height: height || "500px",
}));

class Map extends Component {
  componentDidMount() {
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.google.com/maps/api/js?key=${GoogleMapAPI}`;
      script.onload = () => this.onScriptLoad();
      document.body.appendChild(script);
    } else {
      this.onScriptLoad();
    }
  }

  componentDidUpdate() {
    this.polyline.setPath(
      this.props.routes.map(route => route.marker.position)
    );
  }

  onScriptLoad = () => {
    window.__map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      {
        center: { lat: 55.7558, lng: 37.6173 },
        zoom: 8,
      }
    );

    this.polyline = new window.google.maps.Polyline({
      map: window.__map,
      geodesic: false,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });
  };

  render() {
    return <Wrapper {...this.props.customStyles} id={this.props.id} />;
  }
}

export default Map;
