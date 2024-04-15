import React, { useEffect, useState } from 'react'
import "./_products.scss"
import i18n from '../../../i18n'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faClose, faMagnifyingGlass, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { AddProduct } from '../../../assets/components/Popup/AddProduct/AddProduct'
import { ListProducts } from '../../../assets/components/ListProducts/ListProducts';
import { useTranslation } from 'react-i18next'
import { allProductApi, fetchCategoryApi } from '../../../Api/Api'

export const Products = () => {
  const { t } = useTranslation();
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categorySelect, setCategorySelect] = useState("");
  const [addEnable, setAddEnable] = useState(false);
  const [productData, setProductData] = useState([])
  const [editEnable, setEditEnable] = useState(false);
  const [editId, setEditId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const searchQuery = (e) => {
    setSearchTerm(e.target.value);
  }
  const handleCategory = (category) => {
    setCategoryOpen(false)
    setCategorySelect(category)
  }

  useEffect(() => {
    function handle(e) {
      if (e.target.className === "product-popup-parent") {
        setAddEnable(false)
        setEditEnable(false)
      }
    }
    window.addEventListener("click", handle)
    return () => window.removeEventListener("click", handle)
  }, [])

  const [details, setDetails] = useState();
  useEffect(() => {
    if (categorySelect.length > 0) {
      const fetchData = async () => {
        try {
          const allproduct = await allProductApi();
          setDetails(allproduct);
        } catch (error) {
          console.error("Error in fetching products:", error);
        }
      };
      fetchData();
    }
  }, [categorySelect,addEnable,editEnable]);

  const [categoryList, setCategoryList] = useState()
  useEffect(() => {
    const categoryNames = async () => {
      try {
        const category = await fetchCategoryApi();
        setCategoryList(category)
      } catch (error) {
        console.error("Error in fetching category:", error);
      }
    }
    categoryNames();
  }, [])
  // const filteredProducts = details?.filter(product => {
  //   const searchableCategory = product.category?.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '');
  //   const searchableColour = product.colour?.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '');
  //   const searchablePrice = product.price?.normalPrice?.toString().toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '');
  //   const searchTermFormatted = searchTerm.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '');
  //   return searchableColour?.includes(searchTermFormatted) || searchableCategory?.includes(searchTermFormatted) || searchablePrice?.includes(searchTermFormatted);
  // });




  const renderCategory = () => {
    switch (categorySelect) {
      case "":
        return <div className='select-category'>
          <p className='p1'>Select any category
          </p>
        </div>
      default:
        return <ListProducts category={categorySelect} details={details} setEditId={setEditId} setEditEnable={setEditEnable} setProductData={setProductData} />
    }
  }
  return (
    <div className='products-container'>
      <div className='category-search-container'>
        <div className='search'>
          <input type='text' placeholder='Search Category, Colour, Price' onChange={searchQuery} value={searchTerm} />
          <div className='search-icon'>
            <FontAwesomeIcon icon={faMagnifyingGlass} color="gray" />
          </div>
        </div>
        <div className='add-category'>
          {
            categorySelect.length > 0 &&
            <div className='add-btn' onClick={() => { setAddEnable(true) }}>
              {i18n.t('PRODUCTS.ADD_PRODUCTS')} <FontAwesomeIcon icon={faPlusCircle} />
            </div>
          }
          <div className='product-category' onClick={() => { setCategoryOpen(!categoryOpen) }}>
            {i18n.t('PRODUCTS.SELECT_ANY_CATEGORY')}
            <FontAwesomeIcon icon={faAngleDown} />
          </div>
        </div>
      </div>
      {
        categoryOpen &&
        <div className='product-category-options'>
          {
            categoryList.map((name) => (
              <p className='options' onClick={() => { handleCategory(name) }}>{name}</p>
            ))
          }
        </div>
      }
      {
        renderCategory()
      }
      {
        (editEnable || addEnable) &&
        <div className='product-popup-parent'>
          <div className='product-popup'>
            <div className='close-icon' onClick={() => { setAddEnable(false); setEditEnable(false); setProductData([]); setEditId('') }}>
              <FontAwesomeIcon icon={faClose} size='2xl' />
            </div>
            <AddProduct mainCategory={categorySelect} editId={editId} editEnable={editEnable} setAddEnable={setAddEnable} productData={productData} setProductData={setProductData} setEditEnable={setEditEnable} />
          </div>
        </div>
      }
    </div>
  )
}
