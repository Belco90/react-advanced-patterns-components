import React from 'react';

import { ExampleUsingChildrenRefs } from 'components/ActionableDropdownUsingChildrenRefs';
import { ExampleUsingHooks } from 'components/ActionableDropdownUsingHooks';
import { ExampleUsingStateInitializers } from 'components/ActionableDropdownUsingStateInitializers';

export default {
  title: 'ActionableDropdown',
};

export const usingChildrenRefs = () => <ExampleUsingChildrenRefs />;
export const usingHooks = () => <ExampleUsingHooks />;
export const usingStateInitializers = () => <ExampleUsingStateInitializers />;
