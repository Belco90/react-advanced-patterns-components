import React from 'react';

const DropdownContext = React.createContext();

const DropdownProvider = ({ children, ...remainingProps }) => (
  <DropdownContext.Provider value={remainingProps}>
    {children}
  </DropdownContext.Provider>
);

const withDropdownContext = Component => {
  class ComponentWithDropdownContext extends React.PureComponent {
    render() {
      return (
        <DropdownContext.Consumer>
          {context => {
            if (context === undefined) {
              throw new Error(
                'withDropdownContext must be used within a DropdownProvider'
              );
            }

            const { getComponentRef, onChange } = context;
            return (
              <Component
                {...this.props}
                ref={getComponentRef}
                onChange={onChange}
              />
            );
          }}
        </DropdownContext.Consumer>
      );
    }
  }

  return ComponentWithDropdownContext;
};

const useDropdownContext = () => {
  const context = React.useContext(DropdownContext);

  if (context === undefined) {
    throw new Error(
      'useDropdownContext must be used within a DropdownProvider'
    );
  }

  return context;
};

export { DropdownProvider, withDropdownContext, useDropdownContext };
