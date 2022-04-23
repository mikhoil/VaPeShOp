import React, {useState} from 'react';
import {CartItemType} from "./cart_item_type";
import {DeleteOutlined} from '@ant-design/icons';

export default function CartItem({name, price, photo, description, color}: CartItemType): JSX.Element {
    const [count, setCount] = useState(1);
    const increase_amount = (amount: number): void => setCount(++amount);
    const decrease_amount = (amount: number): void => setCount(amount - +(amount > 1));
    const [cost, setCost] = useState(price);
    const increaseCost = (value: number, amount: number): void => setCost(value * amount);
    return (
        <>
            <div style={{
                backgroundColor: color,
                padding: 15,
                width: '30%',
                border: '5px solid lime',
                borderRadius: 50
            }}>
                <h1 style={{
                    fontSize: 25,
                    textAlign: "center",
                    color: 'brown'
                }}>{name}</h1>
                <div className="content-container" style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <div className="img__price__count" style={{
                        display: "flex",
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: "50%",
                        margin: 5
                    }}>
                        <img src={photo} alt="" width={'85%'} style={{
                            display: "block",
                            marginBottom: 20
                        }}/>
                        <div className="price__count">
                            <div className="price" style={{
                                textAlign: "center",
                                marginBottom: 10,
                                color: "#f54c8b",
                                fontWeight: "bold",
                                fontSize: 26
                            }}>
                                {cost} &#8381;
                            </div>
                            <div className="choose_count" style={{
                                textAlign: "center"
                            }}>
                                <button onClick={() => {
                                    decrease_amount(count);
                                    increaseCost(price, count - +(count > 1));
                                }}>-
                                </button>
                                {` ${count} `}
                                <button onClick={() => {
                                    increase_amount(count);
                                    increaseCost(price, count + 1);
                                }}>+
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="right-side" style={{
                        width: '50%'
                    }}>
                        <span style={{
                            color: 'darkblue'
                        }}>
                            {description}
                        </span>
                        <DeleteOutlined className="delete-btn" style={{
                            display: "block",
                            border: '4px solid red',
                            color: "red",
                            fontSize: 50,
                            width: 50,
                            margin: "25px auto auto"
                        }} onClick={() => {

                        }}/>
                    </div>
                </div>
            </div>
        </>
    );
}