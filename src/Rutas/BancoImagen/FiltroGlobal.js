import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table'
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
export const FiltroGlobal = ({ filter, setFilter }) => {

  const [value, setValue] = useState(filter)
  const onChange = useAsyncDebounce(value => {
    setFilter(value || undefined)
  }, 1000)

  return (
    <span>
      <Input 
        className='Campo-Buscar'
        value={value || ''}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder=" Buscar"
        suffix={
          <SearchOutlined />
        }
      />
    </span>
  )
}
