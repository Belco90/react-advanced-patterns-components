import React from 'react';
import RadioGroup from 'components/RadioGroup';

export default {
  title: 'RadioGroup',
};

export const usingHooks = () => {
  const [value, setValue] = React.useState('a');

  return (
    <RadioGroup
      selectedValue={value}
      name="RadioGroup-story-stacked"
      onChange={event => {
        setValue(event.target.value);
      }}
      disabled
    >
      <RadioGroup.Choice value="a">option A</RadioGroup.Choice>
      <RadioGroup.Choice value="b">option B</RadioGroup.Choice>
      <RadioGroup.Choice value="c">option C</RadioGroup.Choice>
    </RadioGroup>
  );
};
