// @flow 
import * as React from 'react';
import {PropsWithChildren} from "react";

type Props = {
    
};

interface ContainerProps {
    children: any;
}

export const Container: React.FC<PropsWithChildren<ContainerProps>> = ({children}) => {
    return (
        <div className="app app__content container container__pd-top">
            {children}
        </div>
    );
};