import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'react-bootstrap';

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
            checked: child.props.value === selectedValue,
          })
        )}
      </fieldset>
    );
  }
}

RadioGroupUsingCloneChildren.propTypes = propTypes;
RadioGroupUsingCloneChildren.defaultProps = defaultProps;
RadioGroupUsingCloneChildren.Choice = Radio;

export default RadioGroupUsingCloneChildren;
