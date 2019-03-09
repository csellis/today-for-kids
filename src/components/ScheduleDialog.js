import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import {
  InputLabel,
  Select,
  MenuItem,
  Input,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import { TimePicker } from 'material-ui-pickers';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
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
  console.log(selectedItem);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [formWeekday, setFormWeekday] = useState(selectedItem.weekday);
  const [formTime, setFormTime] = useState();

  // Initial props when modal opening
  //  -- have to reset select in case of escape from form
  useEffect(() => {
    setFormWeekday(selectedItem.weekday);
    if (selectedItem.open) {
      setOpen(true);
    }
  }, [selectedItem]);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const handleSelectChange = event => {
    setFormWeekday(event.target.value);
  };

  const handleTimeChange = event => {
    console.log('time changed');
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
                  <div className="picker">
                    <TimePicker
                      autoOk
                      label="12 hours"
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
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
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
