import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  selectedValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  inline: PropTypes.bool,
  disabled: PropTypes.bool,
};

const defaultProps = {
  inline: false,
  disabled: false,
};

class RadioGroupUsingCloneChildren extends React.Component {
  render() {
    const {
      children,
      selectedValue,
      onChange,
      name,
      inline,
      disabled,
      ...remainingProps
    } = this.props;

    return (
      <fieldset {...remainingProps}>
        {React.Children.map(children, child =>
          React.cloneElement(child, {
            onChange,
            name,
            inline,
            disabled,
            checked: child.props.value === selectedValue, // <-- where magic happens
          })
        )}
      </fieldset>
    );
  }
}

RadioGroupUsingCloneChildren.propTypes = propTypes;
RadioGroupUsingCloneChildren.defaultProps = defaultProps;

export default RadioGroupUsingCloneChildren;
