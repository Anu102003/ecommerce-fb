import React from 'react'

export const InputAddProduct = ({ type, name, placeholder, value, handleChange }) => {
    return (
        <div className='form__fields'>
            <p>{placeholder} </p>:
            <input type={type}
                name={name}
                placeholder={placeholder}
                value={value === "" ? "" : value}
                onChange={handleChange}
                autoComplete='off' />
        </div>
    )
}
