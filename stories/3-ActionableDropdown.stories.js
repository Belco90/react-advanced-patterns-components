import React from 'react';

import { ExampleUsingChildrenRefs } from 'components/ActionableDropdownUsingChildrenRefs';
import { ExampleUsingHooks } from 'components/ActionableDropdownUsingHooks';

export default {
  title: 'ActionableDropdown',
};

export const usingChildrenRefs = () => <ExampleUsingChildrenRefs />;
export const usingHooks = () => <ExampleUsingHooks />;
