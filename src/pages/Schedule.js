import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

function Schedule(props) {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <Typography variant="h5" gutterBottom>
        Schedule
      </Typography>
    </div>
  );
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    height: '100vh',
    flexDirection: 'column',
    margin: `${theme.spacing.unit * 2}px auto`,
    alignItems: 'center',
  },
});

Schedule.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Schedule);
