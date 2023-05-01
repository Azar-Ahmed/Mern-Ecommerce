import React from 'react'
import {Card} from 'antd'
import defaultImage from '../../images/default.jpg'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'

const {Meta} = Card;


function AdminProductCard({product, handleRemove}) {

    // Destructure
    const {title, description, images, slug} = product

  return (
  <Card 
    cover={<img src={images && images.length ? images[0].url : defaultImage} style={{height: "150px", objectFit: "cover"}}></img>}
    actions={[<Link to={`/admin/product/${slug}`}><EditOutlined classID='text-warning'/></Link> , <DeleteOutlined className='text-danger' onClick={()=> handleRemove(slug)}/>]}
  >
    <Meta title={title} description={`${description && description.substring(0, 30)}...`} />
  </Card>)
}

export default AdminProductCard