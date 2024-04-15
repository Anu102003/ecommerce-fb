import React from 'react'
import { FilterComponents } from '../FilterComponents/FilterComponents'
import "./_sideFilter.scss"
export const SideFilter = ({ category, menu, allTypeArray, handleFilterChange }) => {
  const isShirtPresent = category?.includes('Shirt') || category?.includes('Kurthi');
  const isPantPresent = category?.includes('Pant')
  return (
    <div className='sidefilter-container'>
      <FilterComponents filterFields={allTypeArray[0].categoryArray} handleFilterChange={handleFilterChange} filterType="Category" checkbox={true} listbox={false} />
      <FilterComponents filterFields={allTypeArray[1].brandArray} handleFilterChange={handleFilterChange} filterType="Brand" checkbox={true} listbox={false} />
      <FilterComponents handleFilterChange={handleFilterChange} filterType="Price" checkbox={false} listbox={false} />
      <FilterComponents filterFields={allTypeArray[2].colorArray} handleFilterChange={handleFilterChange} filterType="Color" checkbox={true} listbox={true} />
      <FilterComponents handleFilterChange={handleFilterChange} filterType="Discount" checkbox={false} listbox={false} />
      {
        (menu === "Men" || menu === "Women") &&
        <FilterComponents filterFields={allTypeArray[3].sizeArray} filterType="Size" handleFilterChange={handleFilterChange} checkbox={true} listbox={true} />
      }
      {
        menu !== "Mobiles" &&
        <FilterComponents filterFields={allTypeArray[5].materialArray} handleFilterChange={handleFilterChange} filterType="Material" checkbox={true} listbox={false} />
      }
      {
        isShirtPresent &&
        <>
          <FilterComponents filterFields={allTypeArray[4].patternArray} handleFilterChange={handleFilterChange} filterType="Pattern" checkbox={true} listbox={false} />
          <FilterComponents filterFields={allTypeArray[6].sleeveTypeArray} handleFilterChange={handleFilterChange} filterType="Sleeve Type" checkbox={true} listbox={false} />
          <FilterComponents filterFields={allTypeArray[7].collarStyleArray} handleFilterChange={handleFilterChange} filterType="Collar Style" checkbox={true} listbox={false} />
        </>
      }
      {
        isPantPresent &&
        <>
          <FilterComponents filterFields={allTypeArray[8].closureTypeArray} handleFilterChange={handleFilterChange} filterType="Closure Type" checkbox={true} listbox={false} />
          <FilterComponents filterFields={allTypeArray[9].occasionTypeArray} handleFilterChange={handleFilterChange} filterType="Occasion Type" checkbox={true} listbox={false} />
        </>
      }
      {
        (menu === "Mobile") &&
        <>
          <FilterComponents filterFields={allTypeArray[10].weightArray} handleFilterChange={handleFilterChange} filterType="Weight" checkbox={true} listbox={false} />
          <FilterComponents filterFields={allTypeArray[11].deviceInterfaceArray} handleFilterChange={handleFilterChange} filterType="Device Interface" checkbox={true} listbox={false} />
          <FilterComponents filterFields={allTypeArray[12].osArray} handleFilterChange={handleFilterChange} filterType="Os" checkbox={true} listbox={false} />
          <FilterComponents filterFields={allTypeArray[13].ramArray} handleFilterChange={handleFilterChange} filterType="Ram" checkbox={true} listbox={false} />
        </>
      }
      {
        (menu === "Electronics") &&
        <>
          <FilterComponents filterFields={allTypeArray[14].chargingTimeArray} handleFilterChange={handleFilterChange} filterType="Charging Time" checkbox={true} listbox={false} />
          <FilterComponents filterFields={allTypeArray[15].formFactorArray} handleFilterChange={handleFilterChange} filterType="Form Factor" checkbox={true} listbox={false} />
        </>
      }
    </div>
  )
}
