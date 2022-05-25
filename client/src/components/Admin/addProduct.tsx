import {useState} from "react";
import {useForm} from "react-hook-form";
import {Button, Modal, Input, Upload, message, UploadProps, Select} from "antd";
import {RcFile, UploadChangeParam} from "antd/es/upload";
import {UploadFile} from "antd/es/upload/interface";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";

const {Option} = Select;

export default function AddType(): JSX.Element {
    const {register, handleSubmit, control} = useForm();
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState<string>();
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showModal = () => setVisible(true);
    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => setVisible(false);
    const getBase64 = (img: RcFile, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    };
    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) message.error('You can only upload JPG/PNG file!');
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) message.error('Image must smaller than 5MB!');
        return isJpgOrPng && isLt5M;
    };
    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj as RcFile, url => {
                setLoading(false);
                setUrl(url);
            });
        }
    };
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined/> : <PlusOutlined/>}
            <div style={{marginTop: 8}}>Загрузить</div>
        </div>
    )
    return <>
        <Button className={"primary"} onClick={showModal}>Добавить продукт</Button>
        <Modal title={"AddType"} visible={visible} onOk={handleOk} onCancel={handleCancel}>
            <form>
                <Select placeholder={"Выберите тип нового продукта"}>
                    <Option value={'Vape'}>Вепы</Option>
                    <Option value={'one-offs'}>Одноразки</Option>
                </Select>
                <Select placeholder={"Выберите бренд нового товара"}>
                    <Option value={'IJust'}>IJust</Option>
                    <Option value={'Smoath'}>Smoath</Option>
                </Select>
                <Input placeholder={"Введите название нового товара"} {...register("productName")}/>
                <Upload
                    name={"productPhoto"}
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                    listType={"picture-card"}>
                    {url ? <img src={url} alt="productPhoto"/> : uploadButton}
                </Upload>
                <Input type={"number"} placeholder={"Введите цену нового товара"}/>
                <Button type={"primary"}>Добавить</Button>
            </form>
        </Modal>
    </>
}