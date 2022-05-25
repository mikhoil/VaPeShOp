import {useState} from "react";
import {useForm} from "react-hook-form";
import {Button, Modal, Input} from "antd";

export default function AddType(): JSX.Element {
    const {register, handleSubmit, control} = useForm()
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
    return <>
        <Button className={"primary"} onClick={showModal}>Добавить бренд</Button>
        <Modal title={"AddType"} visible={visible} onOk={handleOk} onCancel={handleCancel}>
            <form>
                <Input placeholder={"Введите название нового бренда товара"} {...register("brandName")}/>
                <Button type={"primary"}>Добавить</Button>
            </form>
        </Modal>
    </>
}