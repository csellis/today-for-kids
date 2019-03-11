import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';

import ScheduleDialog from './ScheduleDialog';
import WeekdayListItem from './WeekdayListItem';

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
    action: 'insert',
  };

  const [selectedItem, setSelectedItem] = useState(initialWeekday);

  return (
    <>
      <List component="nav" className={classes.root}>
        {daysOfWeek.map(weekday => (
          <WeekdayListItem
            key={weekday}
            weekday={weekday}
            setSelectedItem={setSelectedItem}
          />
        ))}
      </List>
      <ScheduleDialog selectedItem={selectedItem} />
    </>
  );
}

export default ScheduleDates;
