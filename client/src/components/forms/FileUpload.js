import React from 'react'
import Resizer from "react-image-file-resizer";
import axios from 'axios'
import {useSelector} from 'react-redux'
import {Avatar, Badge} from 'antd'
function FileUpload({values, setValues, setLoading}) {

    const {user} = useSelector((state) => ({...state}))

    const fileUploadAndResize = (e) => {
        
        // resize
        let files = e.target.files;
        let allUploadedFiles = values.images;
        if(files){
            setLoading(true)
            for(let i = 0; i < files.length; i++){
                Resizer.imageFileResizer(files[i], 720, 720, 'JPEG', 100, 0, (uri) =>{
                    axios.post(`${process.env.REACT_APP_API}/upload-images`, {image: uri}, {
                        headers: {
                            authtoken: user ? user.token : '',
                        },
                    }).then((res) =>{
                        console.log(`image upload : ${res}`)
                        setLoading(false)
                        allUploadedFiles.push(res.data)
                        setValues({...values, images: allUploadedFiles})
                    }).catch(err => {
                        console.log(`CLOUDINARY image upload err: ${err}`)
                        setLoading(false)
                    })
                }, 'base64')
            }
        }
    }

    const handleImageRemove = (public_id) => {
        setLoading(true)
        axios.post(`${process.env.REACT_APP_API}/remove-images`, {public_id}, {
            headers: {
                authtoken: user ? user.token : ''
            },
        }).then((res) => {
            setLoading(false)
            const {images} = values
            let filteredImages = images.filter((item) => {
                return item.public_id !== public_id
            })
            setValues({ ...values, images: filteredImages })
        }).catch((err) => {
            setLoading(false)
            console.log(`CLOUDINARY Remove image err: ${err}`)
        })

    }

  return (
   <>
   <div className='row'>
    {values.images && values.images.map((image)=>(
       <Badge count="x"  key={image.public_id} onClick={() => handleImageRemove(image.public_id)} style={{cursor: 'pointer'}}>
           <Avatar src={image.url} shape='square' size={100} className='ml-3'/> 
       </Badge>
    ))}
   </div>
   <div className='row'>
       <div className='form-group my-2'>
         <label className='btn btn-outline-primary btn-raised '>Choose File
            <input type='file' hidden className='form-control' multiple  accept='images/*' onChange={fileUploadAndResize}/>
        </label> 
       </div>
    </div>
   </>
  )
}

export default FileUpload