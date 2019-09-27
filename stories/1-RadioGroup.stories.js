import React from 'react';
import { Radio } from 'react-bootstrap';

import RadioGroupUsingCloneChildren from 'components/RadioGroupUsingCloneChildren';
import RadioGroupUsingClassComponent from 'components/RadioGroupUsingClassComponent';
import RadioGroupUsingHooks from 'components/RadioGroupUsingHooks';

export default {
  title: 'RadioGroup',
};

const makeRadioGroup = Component => () => {
  const [value, setValue] = React.useState('a');

  const handleChange = event => {
    setValue(event.target.value);
  };

  return (
    <Component selectedValue={value} name="RadioGroup" onChange={handleChange}>
      <Component.Choice value="a">option A</Component.Choice>
      <Component.Choice value="b">option B</Component.Choice>
      <Component.Choice value="c">option C</Component.Choice>
    </Component>
  );
};
export const usingCloneChildren = () => {
  const [value, setValue] = React.useState('a');

  const handleChange = event => {
    setValue(event.target.value);
  };

  return (
    <RadioGroupUsingCloneChildren
      selectedValue={value}
      name="RadioGroup"
      onChange={handleChange}
    >
      <Radio value="a">option A</Radio>
      <Radio value="b">option B</Radio>
      <Radio value="c">option C</Radio>
    </RadioGroupUsingCloneChildren>
  );
};

export const usingClassComponent = makeRadioGroup(
  RadioGroupUsingClassComponent
);
export const usingHooks = makeRadioGroup(RadioGroupUsingHooks);
