import React, { useState } from 'react';
import { Pagination, Input, Space, Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const { Search } = Input;


const TableProduct = (props) => {
    const [page, setPage] = useState('')
    const [isSort, setIsSort] = useState('ASC');
    const [nameFilter, setNameFilter] = useState('')
    const [noFilter, setNoFilter] = useState('')
    const product = props.catalog ? props.catalog.items : props.catalog
    
    const handlePage = (value) => {
        setPage(value)
    }
    const sortData = () => {
        setIsSort('DESC')
        setPage(1)
    }
    const sortDataAsc = () => {
        setIsSort('ASC')
        setPage(1)
    }
    const onSearch = (value) => {
        setNameFilter(value);
        setPage(1)
    }

    props.setNoValue(noFilter)
    props.setNameValue(nameFilter)
    props.setOrderVal(isSort)
    props.setPagination(page)
    return (
        <div>
            <div>
                <h3>
                    AIA TEST
                </h3>
            </div>
            <div>
                <table className="tableProduct">
                    <tr>
                        <th>Product Image</th>
                        <th className="headerButton">
                            <Space>
                                <Search placeholder="SKU Name" allowClear enterButton onSearch={onSearch} style={{ width: 200 }} />
                            </Space>
                            {isSort === 'ASC' ?
                            <Tooltip title="Descending Order">
                            <div onClick={sortData} style={{display: 'flex'}}>
                                <FontAwesomeIcon icon={faAngleDown} height="20px"/><p style={{fontSize: '10px'}}>Sort Asc</p>
                            </div> 
                            </Tooltip>
                            :
                            <Tooltip title="Ascending Order">
                            <div onClick={sortDataAsc} style={{display: 'flex'}}>
                            <FontAwesomeIcon icon={faAngleUp}/><p style={{fontSize: '10px'}}>Sort Desc</p>
                            </div> 
                            </Tooltip>
                            } 
                        </th>
                        <th>Product Number</th>
                        <th>Category</th>
                        <th>Bundle</th>
                        <th>Variant</th>
                        <th>Tags</th>
                        <th>Modifiers</th>
                    </tr>
                    {product && product.map((item,) => (
                        <tr>
                            <td>
                                <LazyLoadImage className="imageList" src={item.photo_1_url} effect="blur" alt={item.product_name} width="120px" height="120px"/>
                            </td>
                            <td><strong>{item.product_name}</strong> <br />
                                {item.description_1}
                            </td>
                            <td>
                                <strong>{item.product_no}</strong>
                            </td>
                            <td>
                                {item.category_name} <br />
                                {item.category_description_1}
                            </td>
                            <td>
                                {item.is_bundle === false ? 'NO' : 'YES'}
                            </td>
                            <td>
                                {item.product_variants.map((varia) => (
                                    <div>
                                        {varia.variant_name === 'Large' ? <strong>L:</strong> : <strong>R:</strong>}<br />
                                            {new Intl.NumberFormat(['ban', 'id'], { style: 'currency', currency: 'IDR' }).format(varia.price)}
                                    </div>
                                ))}
                            </td>
                            <td>
                                {item.tags.map((tag) => (
                                <div>
                                    {tag.tag_name}
                                </div>
                                ))}
                            </td>
                            <td>
                                {item.modifiers.map((modif) => (
                                <div>
                                    {modif.modifier_name}
                                </div>
                                ))}
                            </td>

                        </tr>
                    ))}
                </table>
            </div>
            <div className="pt-5 mb-5">
                {product && 
                <Pagination current={page} defaultCurrent={1} total={props.catalog.total_items} onChange={handlePage} />
                }
            </div>
        </div>
    )
};

export default TableProduct