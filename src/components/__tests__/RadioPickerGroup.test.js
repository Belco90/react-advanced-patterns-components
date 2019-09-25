import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import RadioPickerGroup from 'components/RadioPickerGroup';

it('should render radio picker group containing radio choices', () => {
  const TestingComponent = () => {
    const [value, setValue] = React.useState('a');

    return (
      <form data-testid="testing-form">
        <RadioPickerGroup
          selectedValue={value}
          name="radioField"
          onChange={event => {
            setValue(event.target.value);
          }}
        >
          <RadioPickerGroup.Choice value="a">option A</RadioPickerGroup.Choice>
          <RadioPickerGroup.Choice value="b">option B</RadioPickerGroup.Choice>
          <div>
            {/* div between radio group and choice to test it works at any level */}
            <RadioPickerGroup.Choice value="c">
              option C
            </RadioPickerGroup.Choice>
          </div>
        </RadioPickerGroup>
      </form>
    );
  };

  const { queryByRole, queryAllByRole, getByTestId, getByLabelText } = render(
    <TestingComponent />
  );

  expect(queryByRole('group')).toBeInTheDocument();
  expect(queryAllByRole('radio')).toHaveLength(3);
  expect(getByTestId('testing-form')).toHaveFormValues({
    radioField: 'a',
  });

  fireEvent.click(getByLabelText('option C'));
  expect(getByTestId('testing-form')).toHaveFormValues({
    radioField: 'c',
  });
});

it.each(['success', 'danger'])(
  'should render radio choices with "%s" emphasis',
  emphasis => {
    const TestingComponent = () => {
      const [value, setValue] = React.useState('a');

      return (
        <form data-testid="testing-form">
          <RadioPickerGroup
            selectedValue={value}
            name="radioField"
            onChange={event => {
              setValue(event.target.value);
            }}
            emphasis={emphasis}
          >
            <RadioPickerGroup.Choice value="a">
              option A
            </RadioPickerGroup.Choice>
            <RadioPickerGroup.Choice value="b">
              option B
            </RadioPickerGroup.Choice>
            <div>
              {/* div between radio group and choice to test it works at any level */}
              <RadioPickerGroup.Choice value="c">
                option C
              </RadioPickerGroup.Choice>
            </div>
          </RadioPickerGroup>
        </form>
      );
    };

    const { container, getByLabelText, getByTestId } = render(
      <TestingComponent />
    );

    // This is testing implementation details, but I can't check the style itself
    expect(container.querySelectorAll(`.${emphasis}`)).toHaveLength(3);

    fireEvent.click(getByLabelText('option C'));
    expect(getByTestId('testing-form')).toHaveFormValues({
      radioField: 'c',
    });
  }
);

it('should hide radio indicator', () => {
  const TestingComponent = () => {
    const [value, setValue] = React.useState('a');

    return (
      <form data-testid="testing-form">
        <RadioPickerGroup
          selectedValue={value}
          name="radioField"
          onChange={event => {
            setValue(event.target.value);
          }}
          hideIndicator
        >
          <RadioPickerGroup.Choice value="a">option A</RadioPickerGroup.Choice>
          <RadioPickerGroup.Choice value="b">option B</RadioPickerGroup.Choice>
          <div>
            {/* div between radio group and choice to test it works at any level */}
            <RadioPickerGroup.Choice value="c">
              option C
            </RadioPickerGroup.Choice>
          </div>
        </RadioPickerGroup>
      </form>
    );
  };

  const { container, getByTestId, getByLabelText } = render(
    <TestingComponent />
  );

  // This is testing implementation details, but I can't check the style itself
  expect(container.querySelectorAll('.hideIndicator')).toHaveLength(3);

  fireEvent.click(getByLabelText('option C'));
  expect(getByTestId('testing-form')).toHaveFormValues({
    radioField: 'c',
  });
});

it('should render conditional elements within radio choices', () => {
  const TestingComponent = () => {
    const [value, setValue] = React.useState('a');

    return (
      <form data-testid="testing-form">
        <RadioPickerGroup
          selectedValue={value}
          name="radioField"
          onChange={event => {
            setValue(event.target.value);
          }}
        >
          <RadioPickerGroup.Choice value="a">
            option A
            <RadioPickerGroup.IfChecked>
              <p>Only visible if option A checked</p>
            </RadioPickerGroup.IfChecked>
          </RadioPickerGroup.Choice>
          <RadioPickerGroup.Choice value="b">
            option B
            <RadioPickerGroup.IfChecked>
              <p>Only visible if option B checked</p>
            </RadioPickerGroup.IfChecked>
          </RadioPickerGroup.Choice>
          <div>
            {/* div between radio group and choice to test it works at any level */}
            <RadioPickerGroup.Choice value="c">
              option C
              <RadioPickerGroup.IfChecked>
                <p>Only visible if option C checked</p>
              </RadioPickerGroup.IfChecked>
            </RadioPickerGroup.Choice>
          </div>
        </RadioPickerGroup>
      </form>
    );
  };

  const { queryByText, getByTestId, getByLabelText } = render(
    <TestingComponent />
  );

  expect(getByTestId('testing-form')).toHaveFormValues({
    radioField: 'a',
  });
  expect(queryByText('Only visible if option A checked')).toBeInTheDocument();
  expect(
    queryByText('Only visible if option B checked')
  ).not.toBeInTheDocument();
  expect(
    queryByText('Only visible if option C checked')
  ).not.toBeInTheDocument();

  fireEvent.click(getByLabelText('option C'));
  expect(getByTestId('testing-form')).toHaveFormValues({
    radioField: 'c',
  });
  expect(
    queryByText('Only visible if option A checked')
  ).not.toBeInTheDocument();
  expect(
    queryByText('Only visible if option B checked')
  ).not.toBeInTheDocument();
  expect(queryByText('Only visible if option C checked')).toBeInTheDocument();
});
