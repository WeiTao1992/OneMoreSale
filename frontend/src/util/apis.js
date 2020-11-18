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
export async function sell( { values, trans, deliv, curTime, userName, imageUrl} ) {
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
      postImage : imageUrl
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