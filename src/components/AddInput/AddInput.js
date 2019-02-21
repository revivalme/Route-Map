import React, { Component } from "react";
import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  padding: 15px;
  background: transparent;
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.colorSecondary};
  color: ${({ theme }) => theme.colorPrimary};
  text-align: center;
  font-size: 16px;
  transition: all 0.4s ease;

  &:focus {
    outline: none;
    border-bottom: 2px solid ${({ theme }) => theme.colorPrimary};

    &::-webkit-input-placeholder {
      transition: all 0.4s ease;
      color: transparent;
    }
  }
`;

class AddInput extends Component {
  state = {
    value: "",
  };

  handleInputChange = e => {
    this.setState({ value: e.target.value });
  };

  handleKeyPress = e => {
    if (e.keyCode === 13) {
      this.props.onEnter(this.state.value);
      this.setState({ value: "" });
    }
  };

  render() {
    return (
      <Input
        type="text"
        value={this.state.value}
        onChange={this.handleInputChange}
        onKeyDown={this.handleKeyPress}
        placeholder="Новая точка маршрута"
      />
    );
  }
}

export default AddInput;
