import React from 'react';

const RadioGroupContext = React.createContext();

const RadioGroupProvider = ({
  children,
  selectedValue,
  onChange,
  name,
  inline,
  disabled,
}) => {
  const context = {
    selectedValue,
    onChange,
    name,
    inline,
    disabled,
  };

  return (
    <RadioGroupContext.Provider value={context}>
      {children}
    </RadioGroupContext.Provider>
  );
};

const useRadioGroupContext = () => {
  const context = React.useContext(RadioGroupContext);

  if (context === undefined) {
    throw new Error(
      'useRadioGroupContext must be used within a RadioGroupProvider'
    );
  }

  return context;
};

export { RadioGroupProvider, useRadioGroupContext };
