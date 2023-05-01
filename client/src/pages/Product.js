import React, {useState, useEffect} from 'react'
import {getProductBySlug} from '../functions/product'
import SingleProduct from '../components/cards/SingleProduct'

function Product({match}) {

    const [product, setProduct] = useState({})

    const {slug} = match.params

    useEffect(() => {
        loadSingleProduct()
    }, [slug])

    const loadSingleProduct = () => {
            getProductBySlug(slug).then((res) => setProduct(res.data))
    }
  return (
    <div className='container-fluid'>
        <div className='row pt-4'>
            <SingleProduct product={product} />
        </div>

        <div className='row'>
            <div className='col text-center py-5'>
                <hr/>
                <h2>Related Products</h2>
                <hr/>

            </div>
        </div>
    </div>
  )
}

export default Product