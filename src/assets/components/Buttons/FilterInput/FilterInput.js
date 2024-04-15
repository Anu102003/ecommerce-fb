import React, { useContext, useEffect, useState } from 'react'
import "./_filterInput.scss"
import { FiltersContext } from '../../../../Context/LocaleContext';
function Input({ value, title, name, color, checkbox, handleFilterChange, filterType, listbox }) {
    const [isCheckboxActive, setIsCheckboxActive] = useState(false)
    const [isActive, setIsActive] = useState(false)

    const filters = useContext(FiltersContext)
    useEffect(() => {
        if (checkbox && filters[filterType.toLowerCase().replace(/ /g, "")]?.includes(value)) {
            setIsCheckboxActive(true);
        } else {
            setIsCheckboxActive(false);
        }
    }, [checkbox, filters, filterType, value]);

    const handleChange = (e) => {
        setIsCheckboxActive(e.target.checked);
        handleFilterChange(filterType, e.target.value);
    };
    return (
        <>
            {
                !(listbox) ?
                    <label className={checkbox ? "checkbox-container" : "radio-container"}>
                        <p className='label'>{title}</p>
                        <input
                            value={value}
                            type={checkbox ? "checkbox" : "radio"}
                            name={name}
                            checked={checkbox ? isCheckboxActive : filters[filterType.toLowerCase()] === value}
                            onChange={handleChange}
                        />
                        <span className={checkbox ? "checkmarkk" : "checkmark"}>
                        </span>
                    </label >
                    :
                    <>
                        <div
                            className={`filter-options ${isActive && 'option-active'} ${filterType === "Color" && "color-options"}`}
                            style={{ background: filterType === "Color" && color }}
                            onClick={() => { setIsActive(!isActive); handleFilterChange(filterType, value) }}>
                            {filterType !== "Color" &&
                                <p>{title}</p>}
                            <span className={(filterType === "Color" && isActive) && 'color-options-active'}
                                style={{ background: color === "White" ? "black" : "white" }}></span>
                        </div>
                    </>
            }
        </>

    )
}
export default Input;
