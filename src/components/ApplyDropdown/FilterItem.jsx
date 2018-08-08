import React from 'react';
import { isEqual } from 'lodash/lang';

class FilterItem extends React.Component {

  state = {
    modifiedValue: this.props.value,
  };

  handleValueChange = value => {
    this.setState({ modifiedValue: value }, this.props.onChange);
  };

  restoreFilter() {
    this.setState({ modifiedValue: this.props.value });
  }

  applyFilter() {
    this.props.onApply(this.state.modifiedValue);
  }

  hasChanged() {
    return !isEqual(this.state.modifiedValue, this.props.value);
  }

  render() {
    const { children } = this.props;
    const { modifiedValue } = this.state;

    return React.Children.map(children, filter =>
      React.cloneElement(filter, {
        onChange: this.handleValueChange,
        value: modifiedValue,
      })
    );
  }
}

export default FilterItem;
