import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { FaTrashAlt } from "react-icons/fa";
import PropTypes from "prop-types";
import ItemTypes from "./ItemTypes";
const style = {
  border: "1px solid gray",
  padding: "0.5rem 1rem",
  margin: "auto",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move",
  textAlign: "center",
  width: "400px",
  position: "relative",
};

const SectionCard = ({ id, text, index, moveCard, onSectionDelete }) => {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div ref={ref} style={{ ...style, opacity }}>
      {text}
      <button
        onClick={onSectionDelete}
        style={{
          position: "absolute",
          right: "2rem",
          color: "red",
        }}
      >
        <FaTrashAlt />
      </button>
    </div>
  );
};

SectionCard.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  moveCard: PropTypes.func.isRequired,
  onSectionDelete: PropTypes.func.isRequired,
};

export default SectionCard;
