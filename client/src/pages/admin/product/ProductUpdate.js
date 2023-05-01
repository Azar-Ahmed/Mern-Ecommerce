import React, {useState, useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {createProduct, getProductBySlug, updateProduct} from '../../../functions/product'
import {getAllCategories, getCategorySubs} from '../../../functions/category'
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm'
import FileUpload from '../../../components/forms/FileUpload'
import {LoadingOutlined} from '@ant-design/icons'
import {useParams} from 'react-router-dom'

const initialState = {
    title: '',
    description: '',
    price: '',
    // categories: [],
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


function ProductUpdate({history}) {

  // state
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState(initialState)
  const [categories, setCategories] = useState([])
  const [subOptions, setSubOptions] = useState([])
  const [showSubs, setShowSubs] = useState(false)
  const [arrayOfSubs, setArrayOfSubIds] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  // redux
  const {user} = useSelector((state) =>({...state}))

  // router 
  let {slug} = useParams()

  useEffect(() =>{
    loadProduct()
    loadCategories()
  }, [])
 
  
  
  
  const loadProduct = () =>{
      getProductBySlug(slug).then((p) => {
        // 1). load single product
          setValues({...values, ...p.data})

        // 2). load single product category subs
        getCategorySubs(p.data.category._id)
          .then((res) => {
            setSubOptions(res.data)
          })
          // 3). prepare array of sub ids to show as default sub values in select
          let arr = []
          p.data.subs.map((s) => {
            arr.push(s._id);
          })
          setArrayOfSubIds((prev) => arr) // required for ant design select to work

        })

       
      }
    
 const loadCategories = () => getAllCategories().then((cat) => {
    setCategories(cat.data)
    // setValues({...values,categories : cat.data })
})
 
 const handleSubmit = async (e) =>{
    e.preventDefault()
    setLoading(true)

    values.subs = arrayOfSubs
    values.category = selectedCategory ? selectedCategory : values.category

   await updateProduct(slug, values, user.token)
        .then((res) => {
          setLoading(false)
          toast.success(`${res.data.title} is updated`)
          history.push("/admin/products")
        })
        .catch((err) =>{
          setLoading(false)
          toast.error(err.response.data.err)
        })
  }

  
  const handleChange = (e) =>{
    setValues({...values, [e.target.name]: e.target.value})
  }

  const handleCategoryChange = (e) =>{
    e.preventDefault()
    console.log(`click category: ${e.target.value}`)
    setValues({...values, subs: []})

    setSelectedCategory(e.target.value)

    getCategorySubs(e.target.value)
      .then(res =>{
        console.log(res)
        setSubOptions(res.data)
      })

      // if user clicks back to the original category
      // show its sub category in default
      if(values.category._id === e.target.value){
        loadProduct()
      }
      // clear all sub cat
      setArrayOfSubIds([])
    }
  
  return ( 
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-md-2'>
                 <AdminNav />
            </div>
            <div className='col-md-10'>
               {loading ? (<LoadingOutlined className='text-danger h1'/>) : (<h4 className='my-3 mb-2'>Update Product</h4>)}
              <hr/>
            <div className='p-3'>
              <FileUpload  setValues={setValues} values={values} setLoading={setLoading}/>
            </div>
           
              <ProductUpdateForm
                handleChange={handleChange} 
                handleSubmit={handleSubmit} 
                setValues={setValues} 
                values={values} 
                handleCategoryChange={handleCategoryChange} 
                categories={categories}
                subOptions={subOptions} 
                arrayOfSubs={arrayOfSubs}
                setArrayOfSubIds={setArrayOfSubIds}
                selectedCategory={selectedCategory}
             /> 
              
            </div>
        </div>
    </div>
  )
}

export default ProductUpdate