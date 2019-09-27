import React from 'react';
import actionableDropdownReducer, {
  ACTIONABLE_DROPDOWN_ACTIONS,
} from './actionable-dropdown-reducer';

const useActionableDropdown = initialValues => {
  const oldValuesRef = React.useRef(initialValues);
  const [state, dispatch] = React.useReducer(actionableDropdownReducer, {
    values: initialValues,
    isOpen: false,
    isPending: false,
  });

  const { current: oldValues } = oldValuesRef;

  const openDropdown = React.useCallback(() => {
    dispatch({ type: ACTIONABLE_DROPDOWN_ACTIONS.open });
  }, [dispatch]);

  const closeDropdown = React.useCallback(() => {
    dispatch({ type: ACTIONABLE_DROPDOWN_ACTIONS.close, payload: oldValues });
  }, [dispatch, oldValues]);

  const setValues = React.useCallback(newValues => {
    dispatch({ type: ACTIONABLE_DROPDOWN_ACTIONS.set, payload: newValues });
  }, []);

  const applyValues = React.useCallback(() => {
    dispatch({ type: ACTIONABLE_DROPDOWN_ACTIONS.apply });
  }, [dispatch]);

  React.useEffect(() => {
    setValues(initialValues);
    oldValuesRef.current = initialValues;
  }, [initialValues, setValues]);

  const actionCreators = React.useMemo(
    () => ({
      openDropdown,
      closeDropdown,
      setValues,
      applyValues,
    }),
    [openDropdown, closeDropdown, applyValues, setValues]
  );

  return [state, actionCreators];
};

export default useActionableDropdown;
