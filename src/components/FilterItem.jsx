import React from 'react';

class FilterItem extends React.PureComponent {

  render() {
    const { children, setFilter, appliedValue } = this.props;

    return React.Children.map(children, filter =>
      React.cloneElement(filter, {
        ref: this.props.getComponentRef,
        onChange: this.props.onChange,
        setFilter,
        appliedValue,
      })
    );
  }
}

export default FilterItem;
