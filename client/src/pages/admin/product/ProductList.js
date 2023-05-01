import React, { useEffect, useState } from 'react'

import AdminNav from '../../../components/nav/AdminNav'
import {getProductsByCount, removeProduct} from '../../../functions/product'
import AdminProductCard from '../../../components/cards/AdminProductCard'
import {useSelector} from 'react-redux'
import {toast} from 'react-toastify'

function ProductList() {
    
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  // redux 
  const {user} = useSelector((state) => ({...state}))
  useEffect(() =>{
    loadAllProducts()
  }, [])

  const loadAllProducts = ()=>{
    setLoading(true)

    getProductsByCount(10)
    .then((res) => {
      setProducts(res.data)
      setLoading(false)
    })
    .catch((err) => {
      setLoading(false)
      console.log(err)
    })
  }

  const handleRemove = (slug) =>{
    if(window.confirm("Delete ?")){
      removeProduct(slug, user.token) 
          .then((res)=>{
            console.log(res)
            loadAllProducts()
            toast.success(`${res.data.title} is deleted`)
          })
          .catch((err)=>{
            console.log(err)
            if(err.response.status === 400) toast.error(err.response.data)
          })

    }
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
          <div className='col-md-10 my-5'>
            {loading ? (<h4 className='text-danger'>Loading...</h4>) : (<h4>All Products</h4>)}
            <br/>
            <div className='row'>
              {products.map((product) => (
                <div className='col-md-3 pb-3' key={product._id}>
                  <AdminProductCard product={product} handleRemove={handleRemove}/>
                </div>
              ))}
            </div>
          </div>
      </div>
  </div>
  )
}

export default ProductList