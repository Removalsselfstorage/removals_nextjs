export const serviceOptions = [
    // { value: 'ocean', label: 'Complete house removal', color: '#015701' },
    { value: 'blue', label: 'Select' },
    { value: 'purple', label: 'Studio flat' },
    { value: 'red', label: '1 bedroom apartment' },
    { value: 'orange', label: '2 bedroom apartment' },
    { value: 'yellow', label: '3 bed house' },
    { value: 'green', label: '4 bed house' },
    { value: 'forest', label: 'Storage' },
    //   { value: 'slate', label: 'Slate', color: '#253858' },
    //   { value: 'silver', label: 'Silver', color: '#666666' },
  ];

  export const citiesOptions = [
    { value: 'london', label: 'London' },
    { value: 'birmingham', label: 'Birmingham' },
    { value: 'manchester', label: 'Manchester' },
    { value: 'liverpool', label: 'Liverpool' },
    { value: 'bristol', label: 'Bristol' },
    { value: 'leeds', label: 'Leeds' },
    { value: 'newcastle', label: 'Newcastle' },
    { value: 'sheffield', label: 'Sheffield' },
    { value: 'nottingham', label: 'Nottingham' },
    { value: 'southampton', label: 'Southampton' },
    { value: 'norwich', label: 'Norwich' },
    { value: 'cardiff', label: 'Cardiff' },
    { value: 'cambridge', label: 'Cambridge' },
    { value: 'oxford', label: 'Oxford' },
    { value: 'brighton', label: 'Brighton' },
    { value: 'plymouth', label: 'Plymouth' },
    { value: 'portsmouth', label: 'Portsmouth' },
    { value: 'leicester', label: 'Leicester' },
    { value: 'coventry', label: 'Coventry' },
    { value: 'york', label: 'York' },
    { value: 'hull', label: 'Hull' },
    { value: 'bradford', label: 'Bradford' },
    { value: 'stoke-on-trent', label: 'Stoke-on-Trent' },
    { value: 'wolverhampton', label: 'Wolverhampton' },
    { value: 'derby', label: 'Derby' },
    { value: 'swansea', label: 'Swansea' },
    { value: 'southend-on-sea', label: 'Southend-on-Sea' },
    { value: 'sunderland', label: 'Sunderland' },
    { value: 'nottingham', label: 'Nottingham' },
    { value: 'luton', label: 'Luton' },
    { value: 'preston', label: 'Preston' },
    { value: 'blackpool', label: 'Blackpool' },
    { value: 'reading', label: 'Reading' },
    { value: 'northampton', label: 'Northampton' },
    { value: 'middlesbrough', label: 'Middlesbrough' },
    { value: 'peterborough', label: 'Peterborough' },
    { value: 'bournemouth', label: 'Bournemouth' },
    { value: 'stockport', label: 'Stockport' },
    { value: 'ipswich', label: 'Ipswich' },
    { value: 'sunderland', label: 'Sunderland' },
    { value: 'oxford', label: 'Oxford' },
    { value: 'bristol', label: 'Bristol' },
    { value: 'swindon', label: 'Swindon' },
    { value: 'huddersfield', label: 'Huddersfield' },
    { value: 'glasgow', label: 'Glasgow' },
    { value: 'edinburgh', label: 'Edinburgh' },
    { value: 'dundee', label: 'Dundee' },
  ];




















//   const fontStyles = {
//     control: (styles) => ({ ...styles, backgroundColor: 'white' }),
//     option: (styles, { data, isDisabled, isFocused, isSelected }) => {
//       const color = chroma(data.color);
//       return {
//         ...styles,
//         backgroundColor: isDisabled
//           ? undefined
//           : isSelected
//           ? data.color
//           : isFocused
//           ? color.alpha(0.1).css()
//           : undefined,
//         color: isDisabled
//           ? '#ccc'
//           : isSelected
//           ? chroma.contrast(color, 'white') > 2
//             ? 'white'
//             : 'black'
//           : data.color,
//         cursor: isDisabled ? 'not-allowed' : 'default',
  
//         ':active': {
//           ...styles[':active'],
//           backgroundColor: !isDisabled
//             ? isSelected
//               ? data.color
//               : color.alpha(0.3).css()
//             : undefined,
//         },
//       };
//     },
//     multiValue: (styles, { data }) => {
//       const color = chroma(data.color);
//       return {
//         ...styles,
//         backgroundColor: color.alpha(0.1).css(),
//       };
//     },
//     multiValueLabel: (styles, { data }) => ({
//       ...styles,
//       color: data.color,
//     }),
//     multiValueRemove: (styles, { data }) => ({
//       ...styles,
//       color: data.color,
//       ':hover': {
//         backgroundColor: data.color,
//         color: 'white',
//       },
//     }),
//   };





//   const colourStyles = {
//     control: (styles) => ({ ...styles, backgroundColor: 'white' }),
//     option: (styles, { data, isDisabled, isFocused, isSelected }) => {
//       const color = chroma(data.color);
//       return {
//         ...styles,
//         backgroundColor: isDisabled
//           ? undefined
//           : isSelected
//           ? data.color
//           : isFocused
//           ? color.alpha(0.1).css()
//           : undefined,
//         color: isDisabled
//           ? '#ccc'
//           : isSelected
//           ? chroma.contrast(color, 'white') > 2
//             ? 'white'
//             : 'black'
//           : data.color,
//         cursor: isDisabled ? 'not-allowed' : 'default',
  
//         ':active': {
//           ...styles[':active'],
//           backgroundColor: !isDisabled
//             ? isSelected
//               ? data.color
//               : color.alpha(0.3).css()
//             : undefined,
//         },
//       };
//     },
//     multiValue: (styles, { data }) => {
//       const color = chroma(data.color);
//       return {
//         ...styles,
//         backgroundColor: color.alpha(0.1).css(),
//       };
//     },
//     multiValueLabel: (styles, { data }) => ({
//       ...styles,
//       color: data.color,
//     }),
//     multiValueRemove: (styles, { data }) => ({
//       ...styles,
//       color: data.color,
//       ':hover': {
//         backgroundColor: data.color,
//         color: 'white',
//       },
//     }),
//   };