import React from 'react';

class FilterItem extends React.PureComponent {

  render() {
    const { children } = this.props;

    return React.Children.map(children, filter =>
      React.cloneElement(filter, {
        ref: this.props.getComponentRef,
      })
    );
  }
}

export default FilterItem;
