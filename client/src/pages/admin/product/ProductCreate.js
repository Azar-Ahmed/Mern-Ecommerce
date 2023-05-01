import React, {useState, useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {createProduct} from '../../../functions/product'
import {getAllCategories, getCategorySubs} from '../../../functions/category'
import ProductCreateForm from '../../../components/forms/ProductCreateForm'
import FileUpload from '../../../components/forms/FileUpload'
import {LoadingOutlined} from '@ant-design/icons'

const initialState = {
  title: '',
  description: '',
  price: '',
  categories: [],
  category: '',
  subs: [],
  shipping: '',
  quantity: '',
  images: [],
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
  brands: ['Apple', 'HP', 'Samsung', 'Lenovo', 'ASUS', 'Dell'],
  color: '',
  brand: '',
}

function ProductCreate({history}) {

  const [loading, setLoading] = useState(false)

  const [values, setValues] = useState(initialState)
  const [subOptions, setSubOptions] = useState([])
  const [showSubs, setShowSubs] = useState(false)



  // redux
  const {user} = useSelector((state) =>({...state}))

  useEffect(() =>{
    loadCategories()
}, [])

const loadCategories = () => getAllCategories().then((cat) => setValues({...values,categories : cat.data }))


  
const handleSubmit = async (e) =>{
  e.preventDefault()
  console.log('handleSubmit click')
  createProduct(values, user.token)
    .then((res)=> {
      console.log(res)
      toast.success(`${res.data.title} created`)
      history.push('/admin/products')
    })
    .catch((err) =>{
      console.log(err)
      if(err.data.status === 400) toast.error(err.data.data.error)
    })
}


const handleChange = async (e) =>{
  setValues({...values, [e.target.name]: e.target.value})
}

const handleCategoryChange = (e) =>{
  e.preventDefault()
  console.log(`click category: ${e.target.value}`)
  setValues({...values, subs: [], category: e.target.value})
  getCategorySubs(e.target.value)
    .then(res =>{
      console.log(res)
      setSubOptions(res.data)
    })
    setShowSubs(true)
  }


  return ( 
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-md-2'>
                 <AdminNav />
            </div>
            <div className='col-md-10'>
               {loading ? (<LoadingOutlined className='text-danger h1'/>) : (<h4 className='my-3 mb-2'>Create Product</h4>)}
              <hr/>
            <div className='p-3'>
              <FileUpload  setValues={setValues} values={values} setLoading={setLoading}/>
            </div>
           
              <ProductCreateForm handleChange={handleChange} handleSubmit={handleSubmit} setValues={setValues} values={values} handleCategoryChange={handleCategoryChange} subOptions={subOptions} showSubs={showSubs}/>
              
            </div>
        </div>
    </div>
  )
}

export default ProductCreate