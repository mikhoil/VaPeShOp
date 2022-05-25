import * as React from 'react';
import "../css/productEdit.css"
import {useParams} from "react-router-dom";
import {fetchBrands, fetchOneProduct, fetchTypes} from "../http/productApi";
import {useContext, useEffect, useState} from "react";
import {Context} from "../index";
import {Input, Select, Upload, message} from "antd";
import {observer} from "mobx-react-lite";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";

const { Option } = Select;

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

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

export const ProductEdit = observer(() => {
    const {id} = useParams();
    const {product} = useContext(Context)
    const [currentProduct, setCurrentProduct] = useState({})
    const [selectedBrand, setSelectedBrand] = useState({});
    const [selectedType, setSelectedType] = useState({});
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [img, setImg] = useState("");
    const [imgFile, setImgFile] = useState(null);

    useEffect(() => {
        fetchOneProduct(id).then(data => {
            setCurrentProduct(data);
            setSelectedBrand(data.brand);
            setSelectedType(data.type);
            setName(data.name);
            setPrice(data.price);
        });
        fetchTypes().then(data => product.setTypes(data));
        fetchBrands().then(data => product.setBrands(data));
    }, [id]);

    useEffect(() => {
        console.log(product.types)
    }, [product])

    const onSelectTypeChange = (value) => {
        setSelectedType(value)
    }

    const onSelectBrandChange = (value) => {
        setSelectedBrand(value)
    }

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }

        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

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
                                    <Option value={type.name} key={type.id}>{type.name}</Option>
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
                                    <Option value={brand.name} key={brand.id}>{brand.name}</Option>
                                )}
                            </Select>
                        </div>
                    </div>
                    <div className="product-edit__block product-edit__name">
                        <div className="product-edit__item-title">Название</div>
                        <div className="product-edit__item-block">
                            <Input
                                size="large"
                                value={currentProduct.name}
                            />
                        </div>
                    </div>
                    <div className="product-edit__block product-edit__price">
                        <div className="product-edit__item-title">Цена</div>
                        <div className="product-edit__item-block">
                            <Input
                                size="large"
                                value={currentProduct.price}
                            />
                        </div>
                    </div>
                </div>
                <div className="product-edit__img">
                    <div className="product-edit__item-title">Изображение</div>
                    <div className="product-edit__item-block product-edit__item-block--img">
                        <div className="product-edit__img-block product-edit__img-current">
                            <div className="product-edit__img-block__title">Текущее изображение</div>
                            <div className="product-edit__img-block__content">
                                <img src={currentProduct.img} alt={currentProduct.name}/>
                            </div>
                        </div>
                        <div className="product-edit__img-block product-edit__img-new">
                            <div className="product-edit__img-block__title">Новое изображение</div>
                            <div className="product-edit__img-block__content">
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://run.mocky.io/v3/7ea6dd0e-a7b6-4f2b-95c6-4c63fd9927f3"
                                    beforeUpload={beforeUpload}
                                    onChange={handleChange}
                                >
                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt="avatar"
                                            style={{
                                                width: '100%',
                                            }}
                                        />
                                    ) : (
                                        uploadButton
                                    )}
                                </Upload>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product-edit__btns">

                </div>
            </div>
        </>
    );
})