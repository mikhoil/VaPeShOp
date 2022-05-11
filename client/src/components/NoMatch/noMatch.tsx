// @flow
import * as React from 'react';
import "./noMatch.css"

type Props = {

};
export const NoMatch = (props: Props) => {
    return (
        <section className="no-match">
            <div>Извините, по данному адресу ничего не найдено</div>
        </section>
    );
};