import React from 'react';

const Input = ({ placeholder, children, onUpdate, onSubmit }) => (
  <p>
    <input
      onKeyUp={e => {
        if (e.which === 13) {
          onSubmit();
        } else {
          onUpdate(e.target.value);
        }
      }}
      placeholder={placeholder}/>
    {' '}
    <button onClick={onSubmit}>{children}</button>
  </p>
);

export default Input;
