import React from 'react'

export default function LocalSearch({search, setSearch}) {

    const handleSearchChange = async (e)=>{
        e.preventDefault()
        setSearch(e.target.value.toLowerCase())
    }
  return (
    <>
            <input type='search' value={search} onChange={handleSearchChange} className='form-control mb-4' placeholder='Filter'/>
      
    </>
  )
}
