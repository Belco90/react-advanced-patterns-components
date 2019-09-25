import React from 'react';

const RadioGroupContext = React.createContext();

const RadioGroupProvider = ({ children, ...remainingProps }) => (
  <RadioGroupContext.Provider value={remainingProps}>
    {children}
  </RadioGroupContext.Provider>
);

const RadioGroupConsumer = ({ children }) => (
  <RadioGroupContext.Consumer>
    {context => {
      if (context === undefined) {
        throw new Error(
          'RadioGroupConsumer must be used within a RadioGroupProvider'
        );
      }
      return children(context);
    }}
  </RadioGroupContext.Consumer>
);

const useRadioGroupContext = () => {
  const context = React.useContext(RadioGroupContext);

  if (context === undefined) {
    throw new Error(
      'useRadioGroupContext must be used within a RadioGroupProvider'
    );
  }

  return context;
};

export { RadioGroupProvider, RadioGroupConsumer, useRadioGroupContext };
