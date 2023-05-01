import React, {useState, useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {getCategory, updateCategory} from '../../../functions/category'
import {useParams} from 'react-router-dom'
import CategoryForm from '../../../components/forms/CategoryForm'

const CategoryUpdate = ({history}) => {  
  
 const{user} = useSelector(state => ({...state}))
 
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
    let {slug} = useParams()
  
    useEffect(() =>{
        loadCategory()
    }, [])

    const loadCategory = () => getCategory(slug, user.token).then((cat) => setName(cat.data.name))
 
    const handleSubmit = async (e) =>{
        e.preventDefault()
        setLoading(true)
        updateCategory(slug ,{name}, user.token)
        .then((res) =>{
            setLoading(false)
            setName('')
            toast.success(`${res.data.name} is updated`)
            history.push("/admin/category")
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
            {loading ? (<h4 className='my-3 mb-2 text-danger'>Loading...</h4>) : (<h4 className='my-3 mb-2'>Update Category</h4>)}
            
            <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}/>

 </div>
      </div>
  </div>
  )
}

export default CategoryUpdate
