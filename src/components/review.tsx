import React from "react";
import {Comment} from "./comment";

export default function Review({author, text, mark}: Comment): JSX.Element {
    return (
        <>
            <div
                style={{
                    border: '3px solid orange',
                    borderRadius: 50,
                    marginBottom: 15
                }}
            >
                <h4>{author}</h4>
                <p>{text}</p>
                <p style={{
                    color: 'darkblue',
                    fontWeight: 'bolder'
                }}>{mark} / 5</p>
            </div>
        </>
    )
}
