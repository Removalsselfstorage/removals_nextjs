import React from 'react';
import Select, { StylesConfig } from 'react-select';

const SelectSearch = ({
  options,
  isSearchable,
  name,
  defaultValue,
  placeholder,
  large,
  blue,
}) => {
  return (
    <Select
      defaultValue={defaultValue}
      isSearchable={isSearchable}
      name={name}
      options={options}
      placeholder={placeholder}
      isClearable={true}
      //   isDisabled={isDisabled}
      //   isLoading={isLoading}
      //   isRtl={isRtl}

      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary: blue ? '#1976D2' : '#008000',
          primary25: blue ? '#d4e8fc' : '#E0EDE0',
          primary50: blue ? '#d4e8fc' : '#E0EDE0',
          primary75: blue ? '#d4e8fc' : '#E0EDE0',
        },
      })}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderRadius: '10px',
          fontSize: '15px',
          borderColor: state.isFocused ? '#008000' : '#008000',
          //   padding: '7px 7px',
          padding: large ? '7px 7px' : '3px',
        }),
      }}
    />
  );
};

export default SelectSearch;
