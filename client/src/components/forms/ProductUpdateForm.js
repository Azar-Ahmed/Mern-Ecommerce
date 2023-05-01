import React from 'react'
import {Select} from 'antd'
const {Option} = Select;

function ProductUpdateForm({handleChange, handleSubmit, setValues,  values,handleCategoryChange, categories, subOptions, arrayOfSubs, setArrayOfSubIds, selectedCategory}) {

// destructure
  const {title, description, price, category, subs, shipping, quantity, images, colors, brands, color, brand} = values


  return (
    <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label>Title</label>
                  <input type='text' name='title' className='form-control' value={title} onChange={handleChange}/>
                </div>

                <div className='form-group my-4'>
                  <label>categories</label>
                  <select name='category' className='form-control' onChange={handleCategoryChange} value={selectedCategory ? selectedCategory :  category._id}>
                        {/* <option value="" disabled selected>{category ? category.name : 'Please select'}</option> */}
                        {
                            categories.length > 0 && categories.map((c) => ( <option value={c._id} key={c._id}>{c.name}</option>)) 
                        }
                    </select>
                </div>

                <div className='form-group my-4'>
                    <label>Sub Category</label>
                    <Select mode="multiple" style={{width: '100%'}} placeholder="Please select" value={arrayOfSubs} onChange={value => setArrayOfSubIds(value)}>
                        {subOptions.length && subOptions.map((s) => <Option key={s._id} value={s._id}>{s.name}</Option> )}
                        
                    </Select>
                </div>
                 
                 
                  <div className='form-group my-4'>
                    <label>Description</label>
                    <input type='text' name='description' className='form-control' value={description} onChange={handleChange}/>
                  </div>
                  <div className='form-group'>
                    <label>Price</label>
                    <input type='text' name='price' className='form-control' value={price} onChange={handleChange}/>
                  </div>
                  <div className='form-group'>
                    <label>Shipping</label>
                    <select name='shipping' className='form-control' onChange={handleChange} value={shipping === 'Yes' ? 'Yes' : 'No'}>
                        <option value='No'>No</option>
                        <option value='Yes'>Yes</option>
                    </select>
                  </div>
                  <div className='form-group'>
                    <label>Quantity</label>
                    <input type='text' name='quantity' className='form-control' value={quantity} onChange={handleChange}/>
                  </div>
                  <div className='form-group'>
                    <label>Colors</label>
                    <select name='color' className='form-control' onChange={handleChange} value={color}>
                        {colors.map((c) => (<option key={c} value={c}>{c}</option>))}
                    </select>
                  </div>
                  <div className='form-group'>
                    <label>Brands</label>
                    <select name='brand' className='form-control' onChange={handleChange} value={brand}>
                        {brands.map((b) => (<option key={b} value={b}>{b}</option>))}
                    </select>
                  </div>
                  <button type='submit' className='btn btn-outline-info'>Save</button>
              </form>
  )
}

export default ProductUpdateForm