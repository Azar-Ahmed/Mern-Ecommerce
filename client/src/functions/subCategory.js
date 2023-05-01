import axios from 'axios'

export const createSubCategory = async (subCategory, authtoken) =>{
    return await axios.post(`${process.env.REACT_APP_API}/sub-category`, subCategory,{
        headers:{
            authtoken,
        }
    });
}

export const getAllSubCategories = async () =>{
    return await axios.get(`${process.env.REACT_APP_API}/sub-categories`);
}

export const getSubCategory = async (slug, authtoken) =>{
    return await axios.get(`${process.env.REACT_APP_API}/sub-category/${slug}`, {
        headers:{
            authtoken,
        }
    });
}


export const removeSubCategory = async (slug, authtoken) =>{
    return await axios.delete(`${process.env.REACT_APP_API}/sub-category/${slug}`, {
        headers:{
            authtoken,
        }
    });
}

export const updateSubCategory = async (slug, subCategory, authtoken) =>{
    return await axios.put(`${process.env.REACT_APP_API}/sub-category/${slug}`, subCategory, {
        headers:{
            authtoken,
        }
    });
}

