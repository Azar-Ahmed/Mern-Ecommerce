import React from 'react'
import {Card} from 'antd'
import {EyeOutlined, ShoppingCartOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import defaultImage from '../../images/default.jpg'
const {Meta} = Card;

function ProductCard({product}) {

    // destructure
    const {images, title, description, slug} = product

    return (
        <Card 
          cover={<img src={images && images.length ? images[0].url : defaultImage} style={{height: "150px", objectFit: "cover"}}></img>}
          actions={[<> <Link to={`/product/${slug}`}><EyeOutlined classID='text-warning' title='View Product'/> <br/> <b>View Product</b></Link> </>, <><ShoppingCartOutlined className='text-danger'/><br/> <b>Add To Cart</b></>]}
        >
          <Meta title={title} description={`${description && description.substring(0, 30)}...`} />
        </Card>
    )
}

export default ProductCard