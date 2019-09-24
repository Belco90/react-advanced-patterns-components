import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import RadioGroup from './RadioGroup';

const TestingRadioGroup = props => {
  const [value, setValue] = React.useState('a');

  return (
    <form data-testid="testing-form">
      <RadioGroup
        selectedValue={value}
        name="RadioGroup-testing"
        onChange={event => {
          setValue(event.target.value);
        }}
        {...props}
      >
        <RadioGroup.Choice value="a">option A</RadioGroup.Choice>
        <RadioGroup.Choice value="b">option B</RadioGroup.Choice>
        <div>
          {/* div between radio group and choice to test it works at any level */}
          <RadioGroup.Choice value="c">option C</RadioGroup.Choice>
        </div>
      </RadioGroup>
    </form>
  );
};

const setUp = (props = {}) => render(<TestingRadioGroup {...props} />);

it('should render radio group containing radio choices', () => {
  const { queryByRole, queryAllByRole } = setUp();

  expect(queryByRole('group')).toBeInTheDocument();
  expect(queryAllByRole('radio')).toHaveLength(3);
});

it('should render radio choices inline', () => {
  const { getByText } = setUp({ inline: true });

  expect(getByText('option A')).toHaveClass('radio-inline');
  expect(getByText('option B')).toHaveClass('radio-inline');
  expect(getByText('option C')).toHaveClass('radio-inline');
});

it('should render radio choices disabled', () => {
  const { queryAllByRole } = setUp({ disabled: true });

  queryAllByRole('radio').forEach(radioElement => {
    expect(radioElement).toBeDisabled();
  });
});

it('should handle new value on radio clicked', () => {
  const { getByTestId, getByLabelText } = setUp();

  expect(getByTestId('testing-form')).toHaveFormValues({
    'RadioGroup-testing': 'a',
  });

  fireEvent.click(getByLabelText('option B'));
  expect(getByTestId('testing-form')).toHaveFormValues({
    'RadioGroup-testing': 'b',
  });

  fireEvent.click(getByLabelText('option C'));
  expect(getByTestId('testing-form')).toHaveFormValues({
    'RadioGroup-testing': 'c',
  });

  fireEvent.click(getByLabelText('option A'));
  expect(getByTestId('testing-form')).toHaveFormValues({
    'RadioGroup-testing': 'a',
  });
});
