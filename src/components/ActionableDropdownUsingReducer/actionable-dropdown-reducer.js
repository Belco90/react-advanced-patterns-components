import isEqual from 'lodash.isequal';

export const ACTIONABLE_DROPDOWN_ACTIONS = {
  open: 'open',
  close: 'close',
  set: 'set',
  apply: 'apply',
  restore: 'restore',
};

const actionableDropdownReducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONABLE_DROPDOWN_ACTIONS.open:
      return {
        ...state,
        isOpen: true,
      };
    case ACTIONABLE_DROPDOWN_ACTIONS.close:
      return {
        ...state,
        isOpen: false,
        isPending: false,
        values: payload,
      };
    case ACTIONABLE_DROPDOWN_ACTIONS.set:
      return {
        ...state,
        isPending: !isEqual(state.values, payload),
        values: payload,
      };
    case ACTIONABLE_DROPDOWN_ACTIONS.apply:
      return {
        ...state,
        isOpen: false,
      };
    case ACTIONABLE_DROPDOWN_ACTIONS.restore:
      return {
        ...state,
        isPending: false,
        values: payload,
      };
    default: {
      throw new Error(`Unknown type: ${type}`);
    }
  }
};

export default actionableDropdownReducer;
