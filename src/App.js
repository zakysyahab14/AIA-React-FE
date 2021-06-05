import React, { useState, useEffect } from 'react';
import TableProduct from "./components/table";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css'
import './App.css';

function App() {
  const[catalog, setCatalog] = useState([]);
  const[nameValue, setNameValue] = useState('');
  const[noValue, setNoValue] = useState('');
  const[pagination, setPagination] = useState('');
  const[sortOrderVal, setOrderVal] = useState('');

  const getCatalog = ( pagination, sortOrderVal, nameValue, noValue) => {
    var pagination_ = ''
    var sortOrderVal_ = ''
    var nameValue_ = ''
    var noValue_ = ''

    if (pagination != null) {
      pagination_ = pagination
    }
    if (sortOrderVal != null) {
      sortOrderVal_ = sortOrderVal
    }
    if (nameValue != null) {
      nameValue_ = nameValue
    }
    if (noValue != null) {
      noValue_ = noValue
    }

      fetch('https://apidev.shushu.co/interview/catalog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items_per_page: 10,
          page: pagination_ === '' ? 1 : pagination,
          outlet_id : 1,
          product_name : nameValue_ !== '' ? nameValue_ : '',
          product_no: noValue_ !== '' ? noValue_ : '',
          order_by_direction : sortOrderVal_ !== '' ? sortOrderVal : 'ASC'
        }),
      })
        .then((res) => res.json())
        .then((result) => setCatalog(result.data))
        .catch((err) => console.log('error'))
  }
  useEffect(() => {
      getCatalog(pagination, sortOrderVal, nameValue, noValue)
  }, [pagination, sortOrderVal, nameValue, noValue])
  
  return (
    <div className="App">
      <TableProduct 
      catalog={catalog} 
      sortOrderVal={sortOrderVal} 
      setOrderVal={setOrderVal} 
      pagination={pagination} 
      setPagination={setPagination}
      nameValue={nameValue}
      setNameValue={setNameValue}
      noValue={noValue}
      setNoValue={setNoValue}/>
      <p>
        © June 2021 - Abdullah Zaky - FrontEnd Test AIA
      </p>
    </div>
  );
}

export default App;
