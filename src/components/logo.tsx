import React from "react";
import './logo.css'
import {Link} from "react-router-dom";

export function Logo(): JSX.Element {
    return (
        <h1>
            <Link to="/">
                <span>V</span>
                <span>ape</span>
                <span>sho</span>
                <span>P</span>
                <span>ro</span>
            </Link>
        </h1>
    );
}