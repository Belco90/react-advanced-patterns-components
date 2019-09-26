import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

const propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
};

class EditableItem extends React.Component {
  state = {
    modifiedValue: this.props.value,
  };

  handleValueChange = value => {
    this.setState({ modifiedValue: value }, this.props.onChange);
  };

  restoreValue() {
    this.setState({ modifiedValue: this.props.value });
  }

  applyValue() {
    this.props.onApply(this.state.modifiedValue);
  }

  hasChanged() {
    return !isEqual(this.state.modifiedValue, this.props.value);
  }

  render() {
    const { children } = this.props;
    const { modifiedValue } = this.state;

    return React.Children.map(children, child =>
      React.cloneElement(child, {
        onChange: this.handleValueChange,
        value: modifiedValue,
      })
    );
  }
}

EditableItem.propTypes = propTypes;

export default EditableItem;
