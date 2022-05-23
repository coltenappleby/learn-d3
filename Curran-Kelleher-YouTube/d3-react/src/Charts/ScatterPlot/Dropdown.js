import React from 'react';


export const Dropdown = ({ options, id, selectedValue, onSelectedValueChange }) => (
    <select id={id} onChange={event => onSelectedValueChange(event.target.value)} key={id}>
        {options.map(({ value, label }) => (
            <option value={value} selected={value === selectedValue} key={value}>
                {label}
            </option>
        ))}


    </select>
)