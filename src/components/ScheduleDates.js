import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';

import ScheduleDialog from './ScheduleDialog';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    maxWidth: 360,
  },
  nested: {
    paddingLeft: '4rem',
  },
}));

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

function ScheduleDates() {
  const classes = useStyles();
  const initialWeekday = {
    weekday: 'Monday',
    open: false,
  };

  const [selectedItem, setSelectedItem] = useState(initialWeekday);

  const handleWeekdayClick = weekday => {
    setSelectedItem({
      weekday,
      open: true,
    });
  };

  return (
    <>
      <List component="nav" className={classes.root}>
        {daysOfWeek.map(weekday => {
          const chicken = 'bawr';
          return (
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
          );
        })}
      </List>
      <ScheduleDialog selectedItem={selectedItem} />
    </>
  );
}

ScheduleDates.propTypes = {};

export default ScheduleDates;
