import * as React from 'react';
import "../css/productEdit.css"
import {useParams} from "react-router-dom";
import {fetchBrands, fetchOneProduct, fetchTypes, updateProducts} from "../http/productApi";
import {useContext, useEffect, useState} from "react";
import {Context} from "../index";
import {Input, Select, Upload, message, Modal, Image, Button, InputNumber} from "antd";
import {observer} from "mobx-react-lite";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";

const { Option } = Select;

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);

        reader.onerror = (error) => reject(error);
    });

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';

    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }

    return isJpgOrPng && isLt2M;
};

const emptyRequest = ({ file, onSuccess }) => {
    console.log(file)
    setTimeout(() => {
        onSuccess("ok");
    }, 0);
};

export const ProductEdit = observer(() => {
    const {id} = useParams();
    const {product} = useContext(Context)
    const [currentProduct, setCurrentProduct] = useState({})
    const [selectedBrand, setSelectedBrand] = useState({});
    const [selectedType, setSelectedType] = useState({});
    const [selectedBrandId, setSelectedBrandId] = useState(null);
    const [selectedTypeId, setSelectedTypeId] = useState(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [img, setImg] = useState("");
    const [imgFile, setImgFile] = useState(null);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    const [isDisableUpdateBtn, setIsDisableUpdateBtn] = useState(false);

    useEffect(() => {
        fetchOneProduct(id).then(data => {
            setCurrentProduct(data);
            setSelectedBrand(data.brand);
            setSelectedBrandId(data.brand.id)
            setSelectedType(data.type);
            setSelectedTypeId(data.type.id)
            setName(data.name);
            setPrice(data.price);
        });
        fetchTypes().then(data => product.setTypes(data));
        fetchBrands().then(data => product.setBrands(data));
    }, [id]);

    useEffect(() => {
        if (currentProduct && currentProduct.brand && currentProduct.type) {
            if (currentProduct.brand.name !== selectedBrand.name ||
                currentProduct.type.name !== selectedType.name ||
                currentProduct.name !== name ||
                currentProduct.price !== price ||
                previewImage
            ) {
                setIsDisableUpdateBtn(false);
            } else {
                setIsDisableUpdateBtn(true);
            }
        }
    }, [name, selectedBrand, selectedType, price, previewImage]);

    const onSelectTypeChange = (value) => {
        const valueObj = JSON.parse(value)
        setSelectedType(valueObj)
        setSelectedTypeId(valueObj.id)
    }

    const onSelectBrandChange = (value) => {
        const valueObj = JSON.parse(value)
        setSelectedBrand(valueObj)
        setSelectedBrandId(valueObj.id)
    }

    const onUpdateProductBtnClick = () => {
        const formData = new FormData();

        formData.append('name', name);
        formData.append('price', `${price}`);
        formData.append('img', imgFile);
        formData.append('brandId', `${selectedBrandId}`);
        formData.append('typeId', `${selectedTypeId}`);

        updateProducts(id, formData).then(data => {
            console.log(data)
        })
    }

    const [loading, setLoading] = useState(false);

    const handleChange = async ({fileList: newFileList, file}) => {
        if (newFileList.length === 0)
            setFileList(newFileList)
        else {
            setFileList([file])
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj);
            }

            setPreviewImage(file.url || file.preview);
            setImgFile(file.originFileObj)
            console.log(file)
        }
    }

    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    return (
        <>
            <div className="product-edit">
                <div className="product-edit__main">
                    <div className="product-edit__block product-edit__block--row  product-edit__id">
                        <div className="product-edit__item-title">ID товара:</div>
                        <div className="product-edit__item-block">
                            <div className="product-edit__item-text">{currentProduct.id}</div>
                        </div>
                    </div>
                    <div className="product-edit__block product-edit__type">
                        <div className="product-edit__item-title">Тип</div>
                        <div className="product-edit__item-block">
                            <Select
                                size="large"
                                showSearch
                                value={selectedType.name}
                                defaultValue={selectedType.name}
                                onChange={onSelectTypeChange}
                            >
                                {product.types.map((type) =>
                                    <Option value={JSON.stringify(type)} key={type.id}>{type.name}</Option>
                                )}
                            </Select>
                        </div>
                    </div>
                    <div className="product-edit__block product-edit__brand">
                        <div className="product-edit__item-title">Бренд</div>
                        <div className="product-edit__item-block">
                            <Select
                                size="large"
                                showSearch
                                value={selectedBrand.name}
                                defaultValue={selectedBrand.name}
                                onChange={onSelectBrandChange}
                            >
                                {product.brands.map((brand) =>
                                    <Option value={JSON.stringify(brand)} key={brand.id}>{brand.name}</Option>
                                )}
                            </Select>
                        </div>
                    </div>
                    <div className="product-edit__block product-edit__name">
                        <div className="product-edit__item-title">Название</div>
                        <div className="product-edit__item-block">
                            <Input
                                size="large"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="product-edit__block product-edit__price">
                        <div className="product-edit__item-title">Цена</div>
                        <div className="product-edit__item-block">
                            <Input
                                size="large"
                                value={price}
                                onChange={(e) => {
                                    if (!isNaN(e.target.value))
                                        setPrice(e.target.value)
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="product-edit__img">
                    <div className="product-edit__item-title">Изменить изображение</div>
                    <div className="product-edit__item-block product-edit__item-block--img">
                        <div className="product-edit__item-block--img-change">
                            <Upload
                                maxCount="1"
                                showUploadList={false}
                                fileList={fileList}
                                customRequest={emptyRequest}
                                onChange={handleChange}
                                onPreview={handlePreview}
                            >
                                <button className="btn btn-default product-edit__img-block-btn">
                                    {loading
                                        ? <LoadingOutlined className="icon--mg-right"/>
                                        : <PlusOutlined className="icon--mg-right"/>}
                                    {previewImage ? "Изменить" : "Загрузить"}
                                </button>
                            </Upload>
                        </div>
                        <div className="product-edit__images">
                            <div className="product-edit__img-block">
                                <div className="product-edit__img-block__title">Текущее изображение</div>
                                <div className="product-edit__img-block__content">
                                    <Image
                                        src={currentProduct.img}
                                        alt={currentProduct.name}
                                    />
                                </div>
                            </div>
                            {fileList.length > 0 &&
                            <div className="product-edit__img-block">
                                <div className="product-edit__img-block__title">Новое изображение</div>
                                <div className="product-edit__img-block__content">


                                    <Image
                                        src={previewImage}
                                        alt={previewTitle}
                                    />

                                </div>
                            </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="product-edit__btns">
                    <button type="button"
                            className="btn btn-default product-edit__btn--submit"
                            disabled={isDisableUpdateBtn}
                            onClick={onUpdateProductBtnClick}
                    >Применить изменения
                    </button>
                    <button type="button"
                            className="btn btn-default product-edit__btn--delete"
                    >Удалить товар
                    </button>
                </div>
            </div>
        </>
    );
})