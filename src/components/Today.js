import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import format from 'date-fns/format';
import store from 'store';

const now = new Date();
const today = format(now, 'EEEE');

const schedule = store.get('events');
const filtered = schedule.filter(event => event.weekday === today);

function Today() {
  return (
    <>
      <h2>{today}</h2>
      <List>
        {filtered.map(event => {
          const { id, title, hours, minutes } = event;
          const start = new Date();
          start.setHours(hours);
          start.setMinutes(minutes);
          console.log(start);
          return (
            <ListItem key={id}>
              <ListItemText primary={title} />
              <ListItemSecondaryAction>
                {format(start, 'p')}
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}

export default Today;
