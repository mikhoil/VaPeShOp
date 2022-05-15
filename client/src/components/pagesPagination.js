import * as React from 'react';
import "../css/pagesPagination.css"
import {useContext, useEffect} from "react";
import {Context} from "../index";
import {Pagination} from "antd";
import {observer} from "mobx-react-lite";

export const PagesPagination = observer(({className}) => {
    const {product} = useContext(Context)

    return (
        <div className={className}>
            <Pagination defaultCurrent={1}
                        current={product.page}
                        total={product.totalCount}
                        pageSize={product.limit}
                        hideOnSinglePage
                        showLessItems
                        showSizeChanger={false}
                        onChange={(page, pageSize) => {
                            product.setPage(page)
                        }}
            />
        </div>
    );
})