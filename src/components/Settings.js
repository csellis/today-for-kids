import React, { Component } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";

class Settings extends Component {
  state = {
    zipcode: ""
  };

  handleZipcode = event => {
    this.setState({ zipcode: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <TextField
          id='standard-dense'
          label='Zipcode'
          onChange={this.handleZipcode}
          className={classNames(classes.textField, classes.dense)}
          margin='dense'
        />
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
});

Settings.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Settings);
