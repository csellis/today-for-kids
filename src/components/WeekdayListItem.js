import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import store from 'store';
import format from 'date-fns/format';

import { ListItemSecondaryAction } from '@material-ui/core';

const observe = require('store/plugins/observe');

store.addPlugin(observe);

function WeekdayListItem(props) {
  const { weekday, setSelectedItem } = props;

  const [weekdayStore, setWeekdayStore] = useState([]);

  const handleWeekdayStore = returnedStore => {
    if (!returnedStore) {
      return setWeekdayStore([]);
    }
    const filteredStore = returnedStore.filter(
      event => event.weekday === weekday
    );
    setWeekdayStore(filteredStore);
  };

  useEffect(() => {
    const obsId = store.observe('events', handleWeekdayStore);

    return function cleanup() {
      store.unobserve(obsId);
    };
  }, [weekday]);

  const handleWeekdayClick = () => {
    setSelectedItem({
      weekday,
      open: true,
      action: 'insert',
    });
  };

  const handleEventClick = event => {
    setSelectedItem({
      weekday,
      open: true,
      action: 'edit',
      event,
    });
  };

  return (
    <>
      <ListItem
        onClick={() => handleWeekdayClick(weekday)}
        button
        key={weekday}
      >
        <ListItemIcon aria-label="Add Item">
          <SendIcon />
        </ListItemIcon>
        <ListItemText inset primary={weekday} />
      </ListItem>

      {weekdayStore.map(event => {
        const now = new Date();
        now.setHours(event.hours);
        now.setMinutes(event.minutes);
        const dateAndTime = `${format(now, 'p')}`;

        return (
          <ListItem
            key={event.id}
            button
            onClick={() => handleEventClick(event)}
          >
            <ListItemText inset primary={event.title} />
            <ListItemSecondaryAction>{dateAndTime}</ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </>
  );
}
WeekdayListItem.propTypes = {
  weekday: PropTypes.string.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
};

export default WeekdayListItem;
