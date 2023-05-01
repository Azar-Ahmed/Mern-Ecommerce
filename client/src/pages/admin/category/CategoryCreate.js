import React, {useState, useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {createCategory, getAllCategories, getCategory, removeCategory, updateCategory} from '../../../functions/category'
import {Link} from 'react-router-dom'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import CategoryForm from '../../../components/forms/CategoryForm'
import LocalSearch from '../../../components/forms/LocalSearch'


const CategoryCreate = () => {  
  
 const{user} = useSelector(state => ({...state}))
 
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState("")

    useEffect(() =>{
        loadCategories()
    }, [])

    const loadCategories = () => getAllCategories().then((cat) => setCategories(cat.data))
 
    const handleSubmit = async (e) =>{
        e.preventDefault()
        setLoading(true)
        createCategory({name}, user.token)
        .then((res) =>{
            setLoading(false)
            setName('')
            toast.success(`${res.data.name} is created`)
            loadCategories()
        })
        .catch((err) =>{
            setLoading(false)
           if(err.response.status === 400) toast.error(err.response.data)

        })
    }

    const handleRemove = async (slug) =>{
        if(window.confirm("Are you sure to delete ?")){
            setLoading(true)
            
            removeCategory(slug, user.token)
            .then((res) => {
                setLoading(false)
                toast.success(res.data.msg)
                loadCategories()
            })
            .catch((err) => {
                if(err.response.status == 400){
                    setLoading(false)
                    toast.error(err.response.data)
                }
            })
        }

    
    }

  

    const searched = (search) => (cat) => cat.name.toLowerCase().includes(search)

  
    return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
          <div className='col'>
            {loading ? (<h4 className='my-3 mb-2 text-danger'>Loading...</h4>) : (<h4 className='my-3 mb-2'>Create Category</h4>)}
            
            <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}/>

            <LocalSearch search={search} setSearch={setSearch}/>
            
            {categories.filter(searched(search)).map((cat) => (<div className='alert alert-secondary' key={cat._id}>{cat.name}{" "}  <span className='btn btn-sm float-right' onClick={()=>handleRemove(cat.slug)}><DeleteOutlined className='text-danger'/></span> <Link className='btn btn-sm float-right text-warning' to={`category/${cat.slug}`}><EditOutlined/></Link></div>))}
          </div>
      </div>
  </div>
  )
}

export default CategoryCreate
