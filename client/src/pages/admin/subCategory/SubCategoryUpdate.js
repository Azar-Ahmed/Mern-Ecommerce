import React, {useState, useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {getAllCategories} from '../../../functions/category'
import {getSubCategory, updateSubCategory} from '../../../functions/subCategory'
import CategoryForm from '../../../components/forms/CategoryForm'
import {useParams} from 'react-router-dom'


const SubCategoryUpdate = ({history}) => {  
  
 const{user} = useSelector(state => ({...state}))
 
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [parent, setParent] = useState('')

  let {slug} = useParams()

  
  useEffect(() =>{
        loadCategories()
        loadSubCategory()
    }, [])

    const loadCategories = () => getAllCategories().then((cat) => setCategories(cat.data))
    const loadSubCategory = () => getSubCategory(slug, user.token).then((subCat) => {
        console.log(subCat)
        setName(subCat.data.name)
        setParent(subCat.data.parent)

    })
 
    const handleSubmit = async (e) =>{
        e.preventDefault()
        setLoading(true)
        updateSubCategory(slug, {name, parent}, user.token)
        .then((res) =>{
            setLoading(false)
            setName('')
            toast.success(`${res.data.name} is updated`)
            history.push('/admin/sub-category')
        })
        .catch((err) =>{
            setLoading(false)
           if(err.response.status === 400) toast.error(err.response.data)

        })
    }

  
    return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
          <div className='col'>
            {loading ? (<h4 className='my-3 mb-2 text-danger'>Loading...</h4>) : (<h4 className='my-3 mb-2'>Update Sub Category</h4>)}
            

        <div className='row'>
            <div className='col-md-6'>
                <div className='form-group'>
                    <label>Categories</label>
                    <select name='category' className='form-control' onChange={(e) => setParent(e.target.value)}>
                        <option value="" disabled selected>Select category</option>
                        {
                            categories.length > 0 && categories.map((c) => (
                                 <option value={c._id} key={c._id} selected={c._id === parent}>{c.name}</option>
                            )) 
                        }
                    </select>
                </div>
            </div>
            <div className='col-md-12 mt-3'>
                    <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}/>
            </div>

        </div>


          

          </div>
      </div>
  </div>
  )
}

export default SubCategoryUpdate
