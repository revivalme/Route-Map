import React, { Component } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { GlobalStyle } from "../themes";

import { AddInput } from "./AddInput";
import { RouteItem } from "./RouteItem";
import { Map } from "./Map";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const SideBar = styled.div`
  flex-basis: 250px;
  background: ${({ theme }) => theme.bgPrimary};
  display: flex;
  flex-direction: column;
`;
const RoutesWrapper = styled.div`
  padding: 10px;
  flex: 1;
`;
const MapWrapper = styled.div`
  flex: 1;
`;

class App extends Component {
  state = {
    routes: [],
  };

  handleInputEnter = value => {
    const google = window.google.maps;
    const myMap = window.__map;

    const newRoute = {
      id: this.state.routes.length + 1,
      label: value,
      marker: new google.Marker({
        position: myMap.getCenter(),
        map: myMap,
        title: value,
        draggable: true,
      }),
    };

    newRoute.marker.addListener("click", () =>
      new google.InfoWindow({
        content: value,
      }).open(myMap, newRoute.marker)
    );
    newRoute.marker.addListener("dragend", ({ latLng }) =>
      this.setState({
        routes: this.state.routes.map(route => {
          if (route.id === newRoute.id) {
            route.marker.position = latLng;
          }
          return route;
        }),
      })
    );

    this.setState({
      routes: [...this.state.routes, newRoute],
    });
  };

  handleRouteDelete = id => {
    this.setState({
      routes: this.state.routes.filter(route => {
        if (route.id !== id) {
          return true;
        }

        route.marker.setMap(null);
        return false;
      }),
    });
  };

  handleRouteDragEnd = ({ destination, source }) => {
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const routes = [...this.state.routes];
    const draggedRoute = routes[source.index];
    routes.splice(source.index, 1);
    routes.splice(destination.index, 0, draggedRoute);

    this.setState({ routes });
  };

  render() {
    const {
      handleInputEnter,
      handleRouteDragEnd,
      handleRouteDelete,
      state: { routes },
    } = this;
    return (
      <DragDropContext onDragEnd={handleRouteDragEnd}>
        <Wrapper>
          <SideBar>
            <AddInput onEnter={handleInputEnter} />
            <Droppable droppableId="droppable-1">
              {provided => (
                <RoutesWrapper
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {routes.map((item, index) => (
                    <RouteItem
                      key={item.id}
                      index={index}
                      id={item.id}
                      label={item.label}
                      onDelete={handleRouteDelete}
                    />
                  ))}
                </RoutesWrapper>
              )}
            </Droppable>
          </SideBar>
          <MapWrapper>
            <Map
              routes={routes}
              customStyles={{ width: "100%", height: "100%" }}
              id="map"
            />
          </MapWrapper>
          <GlobalStyle />
        </Wrapper>
      </DragDropContext>
    );
  }
}

export default App;
