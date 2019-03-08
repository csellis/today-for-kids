import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import getDay from 'date-fns/get_day';

const today = getDay(new Date());
const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
const dayName = days[today - 1];

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

const filtered = schedule.filter(item => item.day === dayName);
const trimAllSpace = string => string.replace(/\s/g, '');

function Today() {
  return (
    <>
      <h2>{dayName}</h2>
      <List>
        {filtered.map(event => (
          <ListItem
            key={`${dayName}-${trimAllSpace(event.title)}-${trimAllSpace(
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
