import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import {
  InputLabel,
  Select,
  Input,
  List,
  ListItem,
  ListItemSecondaryAction,
  TextField,
} from '@material-ui/core';
import { TimePicker } from 'material-ui-pickers';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { getHours, getMinutes, format } from 'date-fns';
import store from 'store';
import PropTypes from 'prop-types';
import remove from 'lodash/remove';

const operations = require('store/plugins/operations');

store.addPlugin(operations);

const useStyles = makeStyles({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  picker: {
    width: '125px',
  },
});

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function FullScreenDialog(props) {
  const { selectedItem } = props;
  const classes = useStyles();

  const timeStart = new Date();
  timeStart.setHours(8);
  timeStart.setMinutes(0);

  const [open, setOpen] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formWeekday, setFormWeekday] = useState(selectedItem.weekday);
  const [formTime, setFormTime] = useState(timeStart);
  const [eventId, setEventId] = useState();

  const resetSelectedItem = () => {
    timeStart.setHours(8);
    timeStart.setMinutes(0);

    setFormTitle('');
    setFormTime(timeStart);
    setEventId();
  };

  // Initial props when modal opening
  //  -- have to reset select in case of escape from form
  useEffect(() => {
    // console.log(selectedItem);
    setFormWeekday(selectedItem.weekday);
    setFormTitle(selectedItem.title);
    if (selectedItem.action === 'edit') {
      const { title, hours, minutes, id } = selectedItem.event;
      timeStart.setHours(hours);
      timeStart.setMinutes(minutes);

      setFormTitle(title);
      setFormTime(timeStart);
      setEventId(id);
    } else {
      resetSelectedItem();
    }
    if (selectedItem.open) {
      setOpen(true);
    }
  }, [selectedItem]);

  function handleClose() {
    setOpen(false);
    resetSelectedItem();
  }

  const handleSelectChange = event => {
    setFormWeekday(event.target.value);
  };

  const handleTimeChange = event => {
    setFormTime(event);
  };

  const handleTitleChange = event => {
    setFormTitle(event.target.value);
  };

  const handleDelete = () => {
    const allEvents = store.get('events');
    remove(allEvents, event => event.id === eventId);
    store.set('events', allEvents);
    handleClose();
  };

  const handleFormSave = () => {
    if (selectedItem.action === 'insert') {
      const event = {
        id: format(new Date(), 'T'),
        title: formTitle.trim(),
        weekday: formWeekday,
        hours: getHours(formTime),
        minutes: getMinutes(formTime),
      };
      store.push('events', event);
    } else {
      // Fetch and remove this event
      const allEvents = store.get('events');
      const updated = remove(allEvents, event => event.id === eventId)[0];
      store.set('events', allEvents);
      // Update event
      updated.title = formTitle.trim();
      updated.weekday = formWeekday;
      updated.hours = getHours(formTime);
      updated.minutes = getMinutes(formTime);
      // Push updated event
      store.push('events', updated);
    }
    handleClose();
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={handleClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              {formWeekday}
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <form className={classes.container}>
            <List className={classes.root}>
              <ListItem>
                <TextField
                  className={classes.textField}
                  defaultValue={formTitle}
                  placeholder="Enter title"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  autoFocus
                  onChange={handleTitleChange}
                />
              </ListItem>
              <ListItem>
                <InputLabel htmlFor="weekday">Weekday</InputLabel>
                <ListItemSecondaryAction>
                  <FormControl className={classes.formControl}>
                    <Select
                      native
                      value={formWeekday}
                      onChange={handleSelectChange}
                      input={<Input id="weekday" />}
                    >
                      {daysOfWeek.map(weekday => (
                        <option key={weekday} value={weekday}>
                          {weekday}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <InputLabel htmlFor="time">Time</InputLabel>
                <ListItemSecondaryAction>
                  <div className={classes.picker}>
                    <TimePicker
                      autoOk
                      format="p"
                      value={formTime}
                      onChange={handleTimeChange}
                    />
                  </div>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFormSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

FullScreenDialog.propTypes = {
  selectedItem: PropTypes.object.isRequired,
};

export default FullScreenDialog;
