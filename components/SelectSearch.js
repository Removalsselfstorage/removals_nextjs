import React from 'react';
import Select, { StylesConfig } from 'react-select';

const SelectSearch = ({
  options,
  isSearchable,
  name,
  defaultValue,
  placeholder,
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
          primary: '#008000',
          primary25: '#E0EDE0',
          primary50: '#E0EDE0',
          primary75: '#E0EDE0',
        },
      })}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderRadius: '10px',
          fontSize: '15px'
        //   borderColor: state.isFocused ? '#F55E1E' : '#008000',
        }),
      }}
    />
  );
};

export default SelectSearch;
