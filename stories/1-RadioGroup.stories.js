import React from 'react';
import RadioGroupUsingClassComponent from 'components/RadioGroupUsingClassComponent';
import RadioGroup from 'components/RadioGroupUsingHooks';

export default {
  title: 'RadioGroup',
};

const makeRadioGroup = Component => () => {
  const [value, setValue] = React.useState('a');

  return (
    <Component
      selectedValue={value}
      name="RadioGroupUsingHooks"
      onChange={event => {
        setValue(event.target.value);
      }}
    >
      <Component.Choice value="a">option A</Component.Choice>
      <Component.Choice value="b">option B</Component.Choice>
      <Component.Choice value="c">option C</Component.Choice>
    </Component>
  );
};

export const usingClassComponent = makeRadioGroup(
  RadioGroupUsingClassComponent
);
export const usingHooks = makeRadioGroup(RadioGroup);
