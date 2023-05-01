import React, {useState, useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {getAllCategories} from '../../../functions/category'
import {createSubCategory, getAllSubCategories, removeSubCategory} from '../../../functions/subCategory'
import {Link} from 'react-router-dom'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import CategoryForm from '../../../components/forms/CategoryForm'
import LocalSearch from '../../../components/forms/LocalSearch'


const SubCategoryCreate = () => {  
  
 const{user} = useSelector(state => ({...state}))
 
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState("")

  const [subCategories, setSubCategories] = useState([])

  const [search, setSearch] = useState("")

    useEffect(() =>{
        loadCategories()
        loadSubCategories()
    }, [])

    const loadCategories = () => getAllCategories().then((cat) => setCategories(cat.data))
    const loadSubCategories = () => getAllSubCategories().then((subCat) => setSubCategories(subCat.data))
 
    const handleSubmit = async (e) =>{
        e.preventDefault()
        setLoading(true)
        createSubCategory({name, parent: category}, user.token)
        .then((res) =>{
            setLoading(false)
            setName('')
            toast.success(`${res.data.name} is created`)
            loadSubCategories()
        })
        .catch((err) =>{
            setLoading(false)
           if(err.response.status === 400) toast.error(err.response.data)

        })
    }

    const handleRemove = async (slug) =>{
        if(window.confirm("Are you sure to delete ?")){
            setLoading(true)
            
            removeSubCategory(slug, user.token)
            .then((res) => {
                setLoading(false)
                toast.success(res.data.msg)
                loadSubCategories()
            })
            .catch((err) => {
                if(err.response.status == 400){
                    setLoading(false)
                    toast.error(err.response.data)
                }
            })
        }

    
    }

  

    const searched = (search) => (subCat) => subCat.name.toLowerCase().includes(search)

  
    return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
          <div className='col'>
            {loading ? (<h4 className='my-3 mb-2 text-danger'>Loading...</h4>) : (<h4 className='my-3 mb-2'>Create Sub Category</h4>)}
            

        <div className='row'>
            <div className='col-md-6'>
                <div className='form-group'>
                    <label>Categories</label>
                    <select name='category' className='form-control' onChange={(e) => setCategory(e.target.value)}>
                        <option value="" disabled selected>Select category</option>
                        {
                            categories.length > 0 && categories.map((c) => ( <option value={c._id} key={c._id}>{c.name}</option>)) 
                        }
                    </select>
                </div>
            </div>
            <div className='col-md-12 mt-3'>
                    <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}/>
            </div>

        </div>


          

            <LocalSearch search={search} setSearch={setSearch}/>
            
            {subCategories.filter(searched(search)).map((sub) => 
            (<div className='alert alert-secondary' key={sub._id}>{sub.name}
              <span className='btn btn-sm float-right' onClick={()=>handleRemove(sub.slug)}><DeleteOutlined className='text-danger'/></span> 
              <Link className='btn btn-sm float-right text-warning' to={`sub-category/${sub.slug}`}><EditOutlined/></Link>
            </div>))}
          </div>
      </div>
  </div>
  )
}

export default SubCategoryCreate
