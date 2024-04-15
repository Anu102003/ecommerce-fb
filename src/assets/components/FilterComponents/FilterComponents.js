import React, { useEffect, useState } from 'react'
import "./_filterComponents.scss"
import FilterInput from '../Buttons/FilterInput/FilterInput'

export const FilterComponents = ({ handleFilterChange, filterFields, filterType, checkbox, listbox }) => {
  const [data, setData] = useState([]);
  const displaydata = data?.map(
    (element, index) => {
      return (
        <FilterInput
          key={index}
          handleFilterChange={handleFilterChange}
          value={element.value}
          title={element.title}
          name={element.name}
          filterType={filterType}
          checkbox={checkbox}
          listbox={listbox}
          color={element.color}
        />
      )
    }
  )

  useEffect(() => {
    const generateData = (extraFields) => {
      return [
        {
          "value": "", "title": "All", "name": "test2", "color": "conic-gradient( red,orange,yellow,green,blue,indigo,violet)"
        },
        ...(Array.isArray(extraFields) ? extraFields.map(field => ({ ...field })) : []),
        ...(Array.isArray(filterFields) ? filterFields : [])
      ];
    };

    let categoryData;
    switch (filterType) {
      case "Category":
      case "Brand":
      case "Size":
      case "Pattern":
      case "Material":
      case "Sleeve Type":
      case "Collar Style":
      case "Closure Type":
      case "Occasion Type":
      case "Weight":
      case "Device Interface":
      case "Os":
      case "Ram":
        case "Charging Time":
      case "Form Factor":
        categoryData = generateData();
        break;
      case "Price":
        categoryData = generateData(
          [{
            "value": "500",
            "title": "Rs.0 - Rs.500",
            "name": "test2",
          },
          {
            "value": "1000",
            "title": "Rs.500 - Rs.1000",
            "name": "test2",
          },
          {
            "value": "1500",
            "title": "Rs.1000 - Rs.1500",
            "name": "test2",
          },
          {
            "value": "2000",
            "title": "Over Rs.1500",
            "name": "test2",
          },]
        );
        break;
      case "Discount":
        categoryData = generateData(
          [{
            "value": "10",
            "title": "10% Off or more",
            "name": "test2",
          },
          {
            "value": "20",
            "title": "20% Off or more",
            "name": "test2",
          },
          {
            "value": "30",
            "title": "30% Off or more",
            "name": "test2",
          },
          {
            "value": "40",
            "title": "40% Off or more",
            "name": "test2",
          },
          {
            "value": "50",
            "title": "50% Off or more",
            "name": "test2",
          },
          {
            "value": "60",
            "title": "60% Off or more",
            "name": "test2",
          },
          {
            "value": "70",
            "title": "Over 70% Off",
            "name": "test2",
          },]
        );
        break;
      case "Color":
        categoryData = generateData();
        break;
      default:
        categoryData = [];
        break;
    }
    setData(categoryData);
  }, [filterFields, filterType]);

  return (
    <div className="category-card">
      <p className="category-card__title">{filterType}</p>
      <div className={listbox && "display-f"}>
        {displaydata}
      </div>

    </div>
  )
}
