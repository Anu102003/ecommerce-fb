import React, { useContext, useEffect, useState } from 'react'
import "./listAllProducts.scss"
import { SideFilter } from '../../../assets/components/SideFilter/SideFilter'
import Card from '../../../assets/components/Card/Card'
import { useLocation } from 'react-router-dom'
import Menu, { FiltersContext } from '../../../Context/LocaleContext'

export const ListAllProducts
  = () => {

    const [details, setDetails] = useState();

    const navMenuSelected = useContext(Menu);

    const getUniqueValues = (key) => {
      const uniqueValuesSet = new Set();
      return details
        ?.filter(item => {
          if (item[key] !== "" && !uniqueValuesSet.has(item[key])) {
            uniqueValuesSet.add(item[key]);
            return true;
          }
          return false;
        })
        .map(item => ({
          title: item[key],
          value: item[key],
          name: item[key],
          ...(key === 'colour' && { color: item[key] }),
        }));
    };

    const categoryArray = getUniqueValues('category');
    const brandArray = getUniqueValues('brand');
    const colorArray = getUniqueValues('colour');
    const sizeArray = getUniqueValues('size')
    const patternArray = getUniqueValues('pattern');
    const materialArray = getUniqueValues('material');
    const sleeveTypeArray = getUniqueValues('sleeveType')
    const collarStyleArray = getUniqueValues('collarStyle')
    const closureTypeArray = getUniqueValues('closureType')
    const occasionTypeArray = getUniqueValues('occasionType')
    const weightArray = getUniqueValues('weight');
    const deviceInterfaceArray = getUniqueValues('deviceInterface');
    const osArray = getUniqueValues('os')
    const ramArray = getUniqueValues('ram');
    const chargingTimeArray = getUniqueValues('chargingTime');
    const formFactorArray = getUniqueValues('formFactor')


    const allTypeArray = [
      { categoryArray: categoryArray },
      { brandArray: brandArray },
      { colorArray: colorArray },
      { sizeArray: sizeArray },
      { patternArray: patternArray },
      { materialArray: materialArray },
      { sleeveTypeArray: sleeveTypeArray },
      { collarStyleArray: collarStyleArray },
      { closureTypeArray: closureTypeArray },
      { occasionTypeArray: occasionTypeArray },
      { weightArray: weightArray },
      { deviceInterfaceArray: deviceInterfaceArray },
      { osArray: osArray },
      { ramArray: ramArray },
      { chargingTimeArray: chargingTimeArray },
      { formFactorArray: formFactorArray },
    ]

    const initialFilters = {
      price: null,
      brand: [],
      color: [],
      category: [],
      size: [],
      pattern: [],
      material: [],
      sleevetype: [],
      discount: null,
      collarstyle: [],
      closuretype: [],
      occasiontype: [],
      weight: [],
      deviceinterface: [],
      os: [],
      ram: [],
      chargingtime: [],
      formfactor: []
    };

    const [filters, setFilters] = useState(initialFilters);
    const handleFilterChange = (filterType, value) => {
      const type = filterType.toLowerCase().replace(/ /g, "");
      setFilters(prevFilters => {
        const updatedFilters = { ...prevFilters };

        if (filterType === 'Price') {
          updatedFilters.price = value;
        } else if (filterType === 'Discount') {
          updatedFilters.discount = value;
        } else {
          updatedFilters[type] = prevFilters[type]?.includes(value)
            ? prevFilters[type]?.filter(option => option !== value)
            : [...prevFilters[type], value];
        }
        return updatedFilters;
      });
    };
    function filteredData(details, filters) {
      let discountPrice;
      return details
        ?.filter(item => {
          const discountValue = item.price.discount / 100
          const discount = item.price.normalPrice * discountValue
          const result = item.price.normalPrice - discount
          discountPrice = result.toFixed(0)
          item.overallPrice = discountPrice;
          return (
            (filters.category.length === 0 || filters.category.includes("") || filters.category.includes(item.category)) &&
            (filters.size.length === 0 || filters.size.includes("") || filters.size.includes(item.size)) &&
            (filters.brand.length === 0 || filters.brand.includes("") || filters.brand.includes(item.brand)) &&
            (filters.pattern.length === 0 || filters.pattern.includes("") || filters.pattern.includes(item.pattern)) &&
            (filters.material.length === 0 || filters.material.includes("") || filters.material.includes(item.material)) &&
            (filters.sleevetype.length === 0 || filters.sleevetype.includes("") || filters.sleevetype.includes(item.sleeveType)) &&
            (filters.collarstyle.length === 0 || filters.collarstyle.includes("") || filters.collarstyle.includes(item.collarStyle)) &&
            (filters.closuretype.length === 0 || filters.closuretype.includes("") || filters.closuretype.includes(item.closureType)) &&
            (filters.occasiontype.length === 0 || filters.occasiontype.includes("") || filters.occasiontype.includes(item.occasionType)) &&
            (filters.weight.length === 0 || filters.weight.includes("") || filters.weight.includes(item.weight)) &&
            (filters.deviceinterface.length === 0 || filters.deviceinterface.includes("") || filters.deviceinterface.includes(item.deviceInterface)) &&
            (filters.os.length === 0 || filters.os.includes("") || filters.os.includes(item.os)) &&
            (filters.ram.length === 0 || filters.ram.includes("") || filters.ram.includes(item.ram)) &&
            (filters.chargingtime.length === 0 || filters.chargingtime.includes("") || filters.chargingtime.includes(item.chargingTime)) &&
            (filters.formfactor.length === 0 || filters.formfactor.includes("") || filters.formfactor.includes(item.formFactor)) &&
            (filters.color.length === 0 || filters.color.includes("") || filters.color.includes(item.colour)) &&
            (!filters.price ||
              (filters.price === "500" && parseInt(discountPrice) < 500) ||
              (filters.price === "1000" && parseInt(discountPrice) >= 500 && parseInt(discountPrice) <= 1000) ||
              (filters.price === "1500" && parseInt(discountPrice) >= 1000 && parseInt(discountPrice) <= 1500) ||
              (filters.price === "2000" && parseInt(discountPrice) > 1500))
            &&
            (!filters.discount ||
              (filters.discount === "10" && parseInt(item.price?.discount) < 20) ||
              (filters.discount === "20" && parseInt(item.price?.discount) >= 20 && parseInt(item.price?.discount) < 35) ||
              (filters.discount === "35" && parseInt(item.price?.discount) >= 35 && parseInt(item.price?.discount) < 50) ||
              (filters.discount === "50" && parseInt(item.price?.discount) >= 50 && parseInt(item.price?.discount) < 60) ||
              (filters.discount === "60" && parseInt(item.price?.discount) >= 60 && parseInt(item.price?.discount) < 70) ||
              (filters.discount === "70" && parseInt(item.price?.discount) >= 70))
          );
        });
    }

    useEffect(() => {
      if (navMenuSelected !== "Home") {
        const fetchData = async () => {
          try {
            // const messagesCollection = collection(db, `${navMenuSelected.toLowerCase()}`);
            // const q = query(messagesCollection, orderBy('productId', 'asc'));
            // const messagesSnapshot = await getDocs(q);
            // const messagesData = messagesSnapshot.docs.map(doc => (
            //   {
            //     id: doc.id,
            //     ...doc.data()
            //   }
            // ));
            // setDetails(messagesData);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        fetchData();
      }
      setFilters(initialFilters)
    }, [navMenuSelected]);

    const result = filteredData(details, filters);

    return (
      <div className='all-product-container'>
        <FiltersContext.Provider value={filters}>
          <div className='sidefilter-wrapper'>
            <SideFilter category={filters.category} menu={navMenuSelected} allTypeArray={allTypeArray} handleFilterChange={handleFilterChange} />
          </div>
        </FiltersContext.Provider>
        <div className='products-wrapper'>
          {result?.map((product) => (
            <Card key={product.ASIN} product={product} />
          ))}
        </div>
      </div>
    )
  }


























