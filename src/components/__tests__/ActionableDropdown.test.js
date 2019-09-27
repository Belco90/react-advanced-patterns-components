import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithRedux } from 'utils';

import { ExampleUsingChildrenRefs } from 'components/ActionableDropdownUsingChildrenRefs';
import { ExampleUsingHooks } from 'components/ActionableDropdownUsingHooks';
import { ExampleUsingStateInitializers } from 'components/ActionableDropdownUsingStateInitializers';
import { ExampleUsingReducer } from 'components/ActionableDropdownUsingReducer';

const componentMapping = {
  ExampleUsingChildrenRefs,
  ExampleUsingHooks,
  ExampleUsingStateInitializers,
  ExampleUsingReducer,
};

describe.each`
  componentName                      | needsToReopenForRestoring
  ${'ExampleUsingChildrenRefs'}      | ${true}
  ${'ExampleUsingHooks'}             | ${true}
  ${'ExampleUsingStateInitializers'} | ${false}
  ${'ExampleUsingReducer'}           | ${false}
`(
  '$componentName component',
  ({ componentName, needsToReopenForRestoring }) => {
    const Example = componentMapping[componentName];

    const setUp = () =>
      renderWithRedux(
        <form data-testid="testing-form">
          <Example />
        </form>
      );

    it('should render actionable dropdown with default filters', () => {
      const { getByText, getByTestId } = setUp();

      const dropdownButton = getByText('Filters');
      expect(dropdownButton).toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(getByText('Filters'));
      expect(dropdownButton).toHaveAttribute('aria-expanded', 'true');
      expect(getByTestId('testing-form')).toHaveFormValues({
        min: null,
        max: null,
        starred: false,
        location: '',
        content: '',
      });
    });

    it('should apply filters', () => {
      const {
        getByText,
        getByLabelText,
        getByTestId,
        getByPlaceholderText,
        getAllByLabelText,
      } = setUp();
      expect(getByTestId('testing-form')).toHaveFormValues({
        min: null,
        max: null,
        starred: false,
        location: '',
        content: '',
      });

      // open dropdown
      fireEvent.click(getByText('Filters'));

      // select content type
      fireEvent.change(getByLabelText('Content'), {
        target: { value: 'image' },
      });

      // enter location
      fireEvent.change(getByLabelText('Location'), {
        target: { value: 'Málaga' },
      });

      // enter min age
      fireEvent.change(getByPlaceholderText('min'), {
        target: { value: 30 },
      });

      // enter min age
      fireEvent.change(getByPlaceholderText('max'), {
        target: { value: 35 },
      });

      // check starred
      fireEvent.click(getByLabelText('Only starred'));

      // check form values before being applied
      expect(getByTestId('testing-form')).toHaveFormValues({
        min: 30,
        max: 35,
        starred: true,
        location: 'Málaga',
        content: 'image',
      });

      fireEvent.click(getByText('Apply'));

      // dropdown must be closed after applying
      expect(getByText('Filters')).toHaveAttribute('aria-expanded', 'false');

      // clear all and tags should appear
      expect(getByText('Clear all')).toBeInTheDocument();
      expect(getAllByLabelText(/^clear \w+$/)).toHaveLength(4);
    });

    it('should restore filter values on cancel clicked', () => {
      const {
        getByText,
        getByLabelText,
        getByTestId,
        queryByText,
        queryAllByLabelText,
      } = setUp();

      // open dropdown and fill couple of fields
      fireEvent.click(getByText('Filters'));
      fireEvent.change(getByLabelText('Content'), {
        target: { value: 'image' },
      });
      fireEvent.click(getByLabelText('Only starred'));
      expect(getByTestId('testing-form')).toHaveFormValues({
        min: null,
        max: null,
        starred: true,
        location: '',
        content: 'image',
      });

      // now cancel and check nothing was applied
      fireEvent.click(getByText('Cancel'));
      expect(getByText('Filters')).toHaveAttribute('aria-expanded', 'false');
      expect(getByTestId('testing-form')).toHaveFormValues({
        min: null,
        max: null,
        starred: false,
        location: '',
        content: '',
      });
      expect(queryByText('Clear all')).not.toBeInTheDocument();
      expect(queryAllByLabelText(/^clear \w+$/)).toHaveLength(0);
    });

    it('should restore filter values on dropdown closed', () => {
      const {
        getByText,
        getByLabelText,
        getByTestId,
        queryByText,
        queryAllByLabelText,
      } = setUp();

      // open dropdown and fill couple of fields
      fireEvent.click(getByText('Filters'));
      fireEvent.change(getByLabelText('Content'), {
        target: { value: 'image' },
      });
      fireEvent.click(getByLabelText('Only starred'));
      expect(getByTestId('testing-form')).toHaveFormValues({
        min: null,
        max: null,
        starred: true,
        location: '',
        content: 'image',
      });

      // now close the dropdown and check nothing was applied
      fireEvent.click(getByText('Filters'));
      expect(getByText('Filters')).toHaveAttribute('aria-expanded', 'false');
      expect(getByTestId('testing-form')).toHaveFormValues({
        min: null,
        max: null,
        starred: false,
        location: '',
        content: '',
      });
      expect(queryByText('Clear all')).not.toBeInTheDocument();
      expect(queryAllByLabelText(/^clear \w+$/)).toHaveLength(0);
    });

    it('should clear individual filters', () => {
      const {
        getByText,
        getByLabelText,
        getByTestId,
        getAllByLabelText,
      } = setUp();

      // open dropdown, fill couple of fields and apply
      fireEvent.click(getByText('Filters'));
      fireEvent.change(getByLabelText('Content'), {
        target: { value: 'image' },
      });
      fireEvent.click(getByLabelText('Only starred'));
      fireEvent.click(getByText('Apply'));
      expect(getByTestId('testing-form')).toHaveFormValues({
        min: null,
        max: null,
        starred: true,
        location: '',
        content: 'image',
      });
      expect(getAllByLabelText(/^clear \w+$/)).toHaveLength(2);

      // clear one filter and check is properly restored
      fireEvent.click(getByLabelText('clear content'));
      expect(getAllByLabelText(/^clear \w+$/)).toHaveLength(1);

      if (needsToReopenForRestoring) {
        // the only difference between implementations is some needs to reopen
        // the dropdown for restoring
        fireEvent.click(getByText('Filters'));
      }
      expect(getByTestId('testing-form')).toHaveFormValues({
        min: null,
        max: null,
        location: '',
        content: '', // <-- this has been restored now!
        starred: true, // <-- but this should remain the same
      });
    });

    it('should clear all filters at once', () => {
      const {
        getByText,
        getByLabelText,
        getByTestId,
        getByPlaceholderText,
        getAllByLabelText,
        queryAllByLabelText,
      } = setUp();
      expect(getByTestId('testing-form')).toHaveFormValues({
        min: null,
        max: null,
        starred: false,
        location: '',
        content: '',
      });

      // fill all the fields
      fireEvent.click(getByText('Filters'));
      fireEvent.change(getByLabelText('Content'), {
        target: { value: 'image' },
      });
      fireEvent.change(getByLabelText('Location'), {
        target: { value: 'Málaga' },
      });
      fireEvent.change(getByPlaceholderText('min'), {
        target: { value: 30 },
      });
      fireEvent.change(getByPlaceholderText('max'), {
        target: { value: 35 },
      });
      fireEvent.click(getByLabelText('Only starred'));
      fireEvent.click(getByText('Apply'));
      expect(getByTestId('testing-form')).toHaveFormValues({
        min: 30,
        max: 35,
        starred: true,
        location: 'Málaga',
        content: 'image',
      });
      expect(getAllByLabelText(/^clear \w+$/)).toHaveLength(4);

      // clear all filters at once and check everything is restored
      fireEvent.click(getByText('Clear all'));
      expect(queryAllByLabelText(/^clear \w+$/)).toHaveLength(0);

      if (needsToReopenForRestoring) {
        // the only difference between implementations is some needs to reopen
        // the dropdown for restoring
        fireEvent.click(getByText('Filters'));
      }
      expect(getByTestId('testing-form')).toHaveFormValues({
        min: null,
        max: null,
        starred: false,
        location: '',
        content: '',
      });
    });
  }
);
