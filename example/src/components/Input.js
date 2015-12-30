import React from 'react';

const Input = ({ placeholder, children, onSubmit }) => {
  let input;

  return (
    <p>
      <input
        ref={i => input = i}
        placeholder={placeholder}/>
      {' '}
      <button onClick={() => {
        onSubmit(input.value);
        input.value = '';
      }}>{children}</button>
    </p>
  );
};

export default Input;
