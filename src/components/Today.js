import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import format from 'date-fns/format';

const now = new Date();
console.log(now);
const today = format(now, 'EEEE');

const schedule = [
  {
    day: 'Friday',
    title: 'Friends',
    start: '10 am',
  },
  {
    day: 'Friday',
    title: 'Eat Out',
    start: '5 pm',
  },
  {
    day: 'Tuesday',
    title: 'Friends',
    start: '10 am',
  },
  {
    day: 'Wednesday',
    title: 'Friends',
    start: '10 am',
  },
];

const filtered = schedule.filter(item => item.day === today);
const trimAllSpace = string => string.replace(/\s/g, '');

function Today() {
  return (
    <>
      <h2>{today}</h2>
      <List>
        {filtered.map(event => (
          <ListItem
            key={`${today}-${trimAllSpace(event.title)}-${trimAllSpace(
              event.start
            )}`}
          >
            <ListItemText primary={event.title} />
            <ListItemSecondaryAction>{event.start}</ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default Today;
