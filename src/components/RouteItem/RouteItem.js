import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  background: transparent;
  color: ${({ theme }) => theme.colorPrimary};
  border-bottom: 2px solid ${({ theme }) => theme.colorSecondary};
  transition: all 0.4s ease;
`;
const TrashIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colorPrimary};
  cursor: pointer;
  transition: all 0.4s ease;

  &:hover {
    color: #b4151e;
  }
`;

class RouteItem extends Component {
  render() {
    const { id, index, label, onDelete } = this.props;
    return (
      <Draggable draggableId={id} index={index}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Wrapper>
              {label}
              <TrashIcon icon="trash-alt" onClick={() => onDelete(id)} />
            </Wrapper>
          </div>
        )}
      </Draggable>
    );
  }
}

export default RouteItem;
