import axios from "axios";

export async function register( {username, setAddress, setPhone, account} ){
  return await axios.post('oms/register', {
    userName : username,
    address : setAddress,
    phone : setPhone,
    account : account,
  })
}


export async function login( {email, password} ) {
    return await axios.post('oms/login', {
        email: email,
        password: password
      })
} 

export async function logout () {
    return await axios.post('oms/logout', {})
}

// sell page
export async function sell( { values, trans, deliv, curTime, userName, postImage} ) {
    return await axios.post('oms/post/createpost', {
      deliveryType : deliv,
      transactionMethod : trans,
      postDate : curTime,
      postTitle : values.title,
      postCategory : values.category,
      postCondition : values.condition,
      postDescription : values.description,
      postOwner : userName,
      postStatus : values.status,
      postPrice : parseFloat(values.price),
      postEmail : values.email,
      postPhone : values.phone,
      postZipcode : values.zipcode,
      postAddress : values.address,
      postImage : postImage
    })
} 

export async function image(picture) {
  const formData = new FormData();
  formData.append("file", picture);
  return await axios.post('oms/s3/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
} 

//acount page
export async function accountUpdatePassword( {username, password} ) {
  axios.post('oms/userinfo/UpdatePassword', {
      username : username,
      password : password
    })

    // 'oms/userinfo/UpdatePassword?username={username}?
}

export async function accountUpdateAddress( {phone, address} ) {
  axios.post('oms/userinfo/UpdateAddress', {
      phone : phone,
      address : address
    })
}

export async function accountItemDelete(postId) {
  // console.log("lalalal:" + `oms/post/deletepost?id=${postId}`)
  axios.delete(`oms/post/deletepost?id=${postId}`,)
}
