import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteUserEvent,
  updateUserEvent,
  UserEvent,
} from '../../redux/user-events';

interface Props {
  event: UserEvent;
}

const EventItem: React.FC<Props> = ({ event }) => {
  const dispatch = useDispatch();
  const handleDeleteClick = () => {
    dispatch(deleteUserEvent(event.id));
  };

  const [editable, setEditable] = useState(false);

  const handleTitleClick = () => {
    setEditable(true);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (editable) {
      inputRef.current?.focus();
    }
  }, [editable]);

  const [title, setTitle] = useState(event.title);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleBlur = () => {
    if (title !== event.title) {
      dispatch(
        updateUserEvent({
          ...event,
          title,
        })
      );
    }
    setEditable(false);
  };

  return (
    <div key={event.id} className="calendar-event">
      <div className="calendar-event-info">
        <div className="calender-event-time">10:00 - 12:00</div>
        <div className="calendar-event-title">
          {editable ? (
            <input
              type="text"
              ref={inputRef}
              value={title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          ) : (
            <span onClick={handleTitleClick}>{event.title}</span>
          )}
        </div>
      </div>
      <button
        className="calendar-event-delete-button"
        onClick={handleDeleteClick}
      >
        &times;
      </button>
    </div>
  );
};

export default EventItem;
