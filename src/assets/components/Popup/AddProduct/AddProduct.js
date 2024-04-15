import React, { useEffect, useState } from 'react'
import "./_addProduct.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faPlusCircle, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { InputAddProduct } from '../../Buttons/InputAddProduct/InputAddProduct';
import { isEditable } from '@testing-library/user-event/dist/utils';
import { editProductsApi, fetchSubCategoryApi, saveProductsApi } from '../../../../Api/Api';
// import { commonInput, electronicHeadsetInput, menPantInput, menShirtInput, mobileInput } from '../../../../Database/mock';
export const AddProduct = ({ mainCategory, editId, setAddEnable, editEnable, productData, setEditEnable, setProductData }) => {
   
    const [formData, setFormData] = useState(initialState(mainCategory));
    function initialState(mainCategory) {
        const commonState = {
            title: '',
            description: '',
            price: 0,
            categoryName: '',
            quantity: 0,
            location: '',
            thumbnail: '',
            brand: '',
            modelNo: '',
            color: '',
            weight: '',
            modelName: '',
            images: [],
        };
        const clothingState = {
            size: '',
            pattern: '',
            material: '',
            fitType: '',
            sleeveType: '',
            collarStyle: '',
            length: '',
            packer: '',
            importer: '',
            itemDimensions: '',
            dateFirstAvailable: '',
            ASIN: '',
            style: '',
            closureType: '',
            occasionType: '',
            careInstruction: '',
        }
        const mobileState = {
            cameraFeature: '',
            os: '',
            ram: '',
            dimension: '',
            battery: '',
            wirelessSpecification: '',
            connectivity: '',
            gps: '',
            specialFeature: '',
            displayFeature: '',
            deviceInterface: '',
            formFactor: '',
            resolution: '',
            batteryPower: 0,
            whatsInBox: ''
        }
        const electronicsState = {
            formFactor: '',
            connectivity: '',
            whatsInBox: '',
            itemDimensions: '',
            battery: '',
            hardwarePlatform: '',
            specialFeature: '',
            mountingHardware: '',
            batteryIncluded: '',
            batteryRequired: '',
            batteryCell: '',
            material: '',
            rechargeableBattery: '',
            operatingDistance: '',
            cabelFeature: '',
            chargingTime: '',
        }
        switch (mainCategory) {

            case "Mobile":
                return {
                    ...commonState,
                    specifications: {
                        ...mobileState
                    }
                }
            case "Men":
                return {
                    ...commonState,
                    specifications: {
                        ...clothingState
                    }
                }
            case "Women":
                return {
                    ...commonState,
                    specifications: {
                        ...clothingState
                    }
                }
            case "Electronics":
                return {
                    ...commonState,
                    specifications: {
                        ...electronicsState
                    }
                }
            default:
                return commonState;
        }
    }

    useEffect(() => {
        setFormData(initialState(mainCategory));
    }, [mainCategory])

    useEffect(() => {
        if (editEnable) {
            setFormData(productData)
        }
    }, [editEnable])
    const [categoryOpen, setCategoryOpen] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };
    const handleSpecificationChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            specifications: {
                ...prevState.specifications,
                [name]: value
            }
        }));
    };

    const handleImageChange = (index, e) => {
        const { value } = e.target;
        const updateImage = [...formData.images]
        updateImage[index] = value
        setFormData({
            ...formData,
            images: updateImage
        })
    };

    const handleAddImage = (e) => {
        e.preventDefault();
        setFormData(prevState => ({
            ...prevState,
            images: [...prevState.images, '']
        }));
    };

    const validation = (
        formData?.categoryName !== '' &&
        formData?.title !== '' &&
        formData?.price !== 0 &&
        formData?.thumbnail !== ''
    )

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validation) {
            try {
                if (editEnable) {
                    const editProducts = await editProductsApi(editId, formData);
                    console.log(editProducts)
                    window.alert("Edited successfully")
                    setEditEnable(false)
                } else {
                    const addProducts = await saveProductsApi(formData);
                    console.log(addProducts)
                    window.alert("Added successfully")
                    setAddEnable(false)
                }
                setFormData(initialState(mainCategory));

            } catch (error) {
                console.error('Error adding document: ', error);
                alert('An error occurred while submitting the message.');
            }
        } else {
            alert('Fill form fields');
        }
    }

    const [subCategoryList, setSubCategoryList] = useState()
    useEffect(() => {
        const subCategoryNames = async () => {
            try {
                const subCategory = await fetchSubCategoryApi(mainCategory)
                setSubCategoryList(subCategory)
            } catch (error) {
                console.log("Error in fetching subCategory", error)
            }
        }
        subCategoryNames()
    }, [mainCategory])

    const commonInput = [
        {
            type: "number",
            name: "price",
            placeholder: "Price",
            value: formData.price,
            handleChange: handleChange
        },
        {
            type: "text",
            name: "title",
            placeholder: "Title",
            value: formData.title,
            handleChange: handleChange
        },
        {
            type: "text",
            name: "brand",
            placeholder: "Brand",
            value: formData.brand,
            handleChange: handleChange
        },
        {
            type: "text",
            name: "modelName",
            placeholder: "Model Name",
            value: formData.modelName,
            handleChange: handleChange
        },
        {
            type: "text",
            name: "thumbnail",
            placeholder: "Thumbnail Image",
            value: formData.thumbnail,
            handleChange: handleChange
        },
        {
            type: "text",
            name: "color",
            placeholder: "Color",
            value: formData.color,
            handleChange: handleChange
        },
        {
            type: "text",
            name: "weight",
            placeholder: "Item Weight",
            value: formData.weight,
            handleChange: handleChange
        },
        {
            type: "text",
            name: "modelNo",
            placeholder: "Model Number",
            value: formData.modelNo,
            handleChange: handleChange
        },
        {
            type: "number",
            name: "quantity",
            placeholder: "Quantity",
            value: formData.quantity,
            handleChange: handleChange
        },
        {
            type: "text",
            name: "location",
            placeholder: "Location",
            value: formData.location,
            handleChange: handleChange
        },

    ]
    const mobileInput = [
        { type: "text", name: "cameraFeature", placeholder: "Other Camera Feature", value: formData.specifications.cameraFeature, handleChange: handleChange },
        { type: "text", name: "os", placeholder: "OS", value: formData.specifications.os, handleChange: handleChange },
        { type: "text", name: "ram", placeholder: "RAM", value: formData.specifications.ram, handleChange: handleChange },
        { type: "text", name: "dimension", placeholder: "Dimension", value: formData.specifications.dimension, handleChange: handleChange },
        { type: "text", name: "battery", placeholder: "Battery", value: formData.specifications.battery, handleChange: handleChange },
        { type: "text", name: "wirelesSpecification", placeholder: "Wireless Specification", value: formData.specifications.wirelesSpecification, handleChange: handleChange },
        { type: "text", name: "connectivity", placeholder: "Connectivity", value: formData.specifications.connectivity, handleChange: handleChange },
        { type: "text", name: "gps", placeholder: "GPS", value: formData.specifications.gps, handleChange: handleChange },
        { type: "text", name: "specialFeature", placeholder: "Special Feature", value: formData.specifications.specialFeature, handleChange: handleChange },
        { type: "text", name: "displayFeature", placeholder: "Display Feature", value: formData.specifications.displayFeature, handleChange: handleChange },
        { type: "text", name: "deviceInterface", placeholder: "Device Interface", value: formData.specifications.deviceInterface, handleChange: handleChange },
        { type: "text", name: "formFactor", placeholder: "Form Factor", value: formData.specifications.formFactor, handleChange: handleChange },
        { type: "text", name: "resolution", placeholder: "Resolution", value: formData.specifications.resolution, handleChange: handleChange },
        { type: "text", name: "batteryPower", placeholder: "Battery Power", value: formData.specifications.batteryPower, handleChange: handleChange },
    ]
    const menShirtInput = [
        { type: "text", name: "size", placeholder: "Size", value: formData.specifications.size, handleChange: handleSpecificationChange, },
        { type: "text", name: "pattern", placeholder: "Pattern", value: formData.specifications.pattern, handleChange: handleSpecificationChange, },
        { type: "text", name: "material", placeholder: "Material", value: formData.specifications.material, handleChange: handleSpecificationChange, },
        { type: "text", name: "fitType", placeholder: "Fit Type", value: formData.specifications.fitType, handleChange: handleSpecificationChange, },
        { type: "text", name: "sleeveType", placeholder: "Sleeve Type", value: formData.specifications.sleeveType, handleChange: handleSpecificationChange, },
        { type: "text", name: "collarStyle", placeholder: "Collar Style", value: formData.specifications.collarStyle, handleChange: handleSpecificationChange, },
        { type: "text", name: "length", placeholder: "Length", value: formData.specifications.length, handleChange: handleSpecificationChange, },
        { type: "text", name: "packer", placeholder: "Packer", value: formData.specifications.packer, handleChange: handleSpecificationChange, },
        { type: "text", name: "importer", placeholder: "Importer", value: formData.specifications.importer, handleChange: handleSpecificationChange, },
        { type: "text", name: "itemDimensions", placeholder: "Item Dimensions", value: formData.specifications.itemDimensions, handleChange: handleSpecificationChange, },
        { type: "text", name: "dateFirstAvailable", placeholder: "Date First Available", value: formData.specifications.dateFirstAvailable, handleChange: handleSpecificationChange, },
        { type: "text", name: "ASIN", placeholder: "ASIN", value: formData.specifications.ASIN, handleChange: handleSpecificationChange, },
    ]
    const menPantInput = [
        { type: "text", name: "size", placeholder: "Size", value: formData.specifications.size, handleChange: handleSpecificationChange, },
        { type: "text", name: "material", placeholder: "Material", value: formData.specifications.material, handleChange: handleSpecificationChange, },
        { type: "text", name: "fitType", placeholder: "Fit Type", value: formData.specifications.fitType, handleChange: handleSpecificationChange, },
        { type: "text", name: "style", placeholder: "Style", value: formData.specifications.style, handleChange: handleSpecificationChange, },
        { type: "text", name: "closureType", placeholder: "Closure Type", value: formData.specifications.closureType, handleChange: handleSpecificationChange, },
        { type: "text", name: "occasionType", placeholder: "Occasion Type", value: formData.specifications.occasionType, handleChange: handleSpecificationChange, },
        { type: "text", name: "careInstruction", placeholder: "Care instructions", value: formData.specifications.careInstruction, handleChange: handleSpecificationChange, },
        { type: "text", name: "length", placeholder: "Length", value: formData.specifications.length, handleChange: handleSpecificationChange, },
        { type: "text", name: "packer", placeholder: "Packer", value: formData.specifications.packer, handleChange: handleSpecificationChange, },
        { type: "text", name: "importer", placeholder: "Importer", value: formData.specifications.importer, handleChange: handleSpecificationChange, },
        { type: "text", name: "itemDimensions", placeholder: "Item Dimensions", value: formData.specifications.itemDimensions, handleChange: handleSpecificationChange, },
        { type: "text", name: "dateFirstAvailable", placeholder: "Date First Available", value: formData.specifications.dateFirstAvailable, handleChange: handleSpecificationChange, },
        { type: "text", name: "ASIN", placeholder: "ASIN", value: formData.specifications.ASIN, handleChange: handleSpecificationChange, },
    ]
    const electronicHeadsetInput = [
        { type: "text", name: "formFactor", placeholder: "Form Factor", value: formData.specifications.formFactor, handleChange: handleSpecificationChange, },
        { type: "text", name: "connectivity", placeholder: "Connectivity", value: formData.specifications.connectivity, handleChange: handleSpecificationChange, },
        { type: "text", name: "itemDimensions", placeholder: "Item Dimensions", value: formData.specifications.itemDimensions, handleChange: handleSpecificationChange, },
        { type: "text", name: "battery", placeholder: "Battery", value: formData.specifications.battery, handleChange: handleSpecificationChange, },
        { type: "text", name: "hardwarePlatform", placeholder: "Hardware Platform", value: formData.specifications.hardwarePlatform, handleChange: handleSpecificationChange, },
        { type: "text", name: "specialFeature", placeholder: "Special Feature", value: formData.specifications.specialFeature, handleChange: handleSpecificationChange, },
        { type: "text", name: "mountingHardware", placeholder: "Mounting Hardware", value: formData.specifications.mountingHardware, handleChange: handleSpecificationChange, },
        { type: "text", name: "batteryIncluded", placeholder: "Battery Included", value: formData.specifications.batteryIncluded, handleChange: handleSpecificationChange, },
        { type: "text", name: "batteryRequired", placeholder: "Battery Required", value: formData.specifications.batteryRequired, handleChange: handleSpecificationChange, },
        { type: "text", name: "batteryCell", placeholder: "Battery Cell", value: formData.specifications.batteryCell, handleChange: handleSpecificationChange, },
        { type: "text", name: "material", placeholder: "Material", value: formData.specifications.material, handleChange: handleSpecificationChange, },
        { type: "text", name: "rechargeableBattery", placeholder: "Rechargeable Battery", value: formData.specifications.rechargeableBattery, handleChange: handleSpecificationChange, },
        { type: "text", name: "operatingDistance", placeholder: "Operating Distance", value: formData.specifications.operatingDistance, handleChange: handleSpecificationChange, },
        { type: "text", name: "cabelFeature", placeholder: "Cabel Feature", value: formData.specifications.cabelFeature, handleChange: handleSpecificationChange, },
        { type: "text", name: "chargingTime", placeholder: "Charging Time", value: formData.specifications.chargingTime, handleChange: handleSpecificationChange, },
    ]

    return (
        <div className='add'>
            <p className='add__title'>{mainCategory}</p>
            <form className="form" >
                <div className='form__fields'>
                    <p>Category </p>:
                    <div className='category-container'>
                        <div className={`category ${formData.categoryName !== "" && "category-active"}`} onClick={() => { setCategoryOpen(!categoryOpen) }}>
                            {
                                formData.categoryName === "" ? "Select Category" : formData.categoryName
                            }
                            <FontAwesomeIcon icon={faAngleDown} />
                        </div>
                    </div>
                    {
                        categoryOpen &&
                        <div className='category-options'>
                            {
                                subCategoryList.map((name) => (
                                    <p className='options' onClick={() => { setFormData(prevState => ({ ...prevState, categoryName: name })); setCategoryOpen(!categoryOpen) }}>{name}</p>
                                ))
                            }
                        </div>
                    }
                </div>


                <div className='form__fields'>
                    <p>Images </p>:
                    <div className='image-field-wrapper'>
                        {formData.images.map((image, index) => (
                            <div className='image-field' key={index}>
                                <input
                                    type="text"
                                    placeholder="Image URL"
                                    value={image}
                                    onChange={(e) => handleImageChange(index, e)}
                                />
                            </div>
                        ))}
                        <button className='add-icon' onClick={handleAddImage}>Add Image<FontAwesomeIcon icon={faPlusCircle} /></button>
                    </div>
                </div>

                <div className='form__fields'>
                    <p>Description </p>:
                    <textarea type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} ></textarea>
                </div>

                {
                    commonInput.map((input, index) => (
                        <InputAddProduct key={index} type={input.type} name={input.name} placeholder={input.placeholder} value={input.value} handleChange={input.handleChange} />
                    ))
                }


                {
                    mainCategory === "Mobile" && (
                        <>
                            <div className='form__fields'>
                                <p>What's in box </p>:
                                <textarea type="text" name="whatsInBox" placeholder="What 's In Box" value={formData.whatsInBox} onChange={handleChange} ></textarea>
                            </div>
                            {mobileInput.map((input, index) => (
                                <InputAddProduct key={index} type={input.type} name={input.name} placeholder={input.placeholder} value={input.value} handleChange={input.handleChange} />
                            )
                            )}
                        </>
                    )
                }

                {
                    (mainCategory === "Electronics" && formData.categoryName === "Headphone") && (
                        <>
                            {electronicHeadsetInput.map((input, index) => (
                                <InputAddProduct key={index} type={input.type} name={input.name} placeholder={input.placeholder} value={input.value} handleChange={input.handleChange} />
                            ))}
                            <div className='form__fields'>
                                <p>What's in box </p>:
                                <textarea type="text" name="whatsInBox" placeholder="What 's In Box" value={formData.whatsInBox} onChange={handleChange} ></textarea>
                            </div>
                        </>
                    )
                }
                {
                    ((mainCategory === "Men" || mainCategory === "Women") && (formData.categoryName === "Kurthi" || formData.categoryName === "Men-Shirt" || formData.categoryName === "Women-Shirt")) && (
                        <>
                            {menShirtInput.map((input, index) => (
                                <InputAddProduct key={index} type={input.type} name={input.name} placeholder={input.placeholder} value={input.value} handleChange={input.handleChange} />
                            ))}
                        </>
                    )
                }

                {
                    ((mainCategory === "Men" || mainCategory === "Women") && (formData.categoryName === "Men-Pant" || formData.categoryName === "Women-Pant")) && (
                        <>
                            {menPantInput.map((input, index) => (
                                <InputAddProduct key={index} type={input.type} name={input.name} placeholder={input.placeholder} value={input.value} handleChange={input.handleChange} />
                            ))}
                        </>
                    )
                }

                <div className="submit-btn">
                    <button type="submit" className="submit-icon" onClick={handleSubmit}>Submit</button>
                </div>
            </form >
        </div >
    )
}












