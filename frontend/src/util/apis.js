import axios from "axios";

export async function login( {email, password} ) {
    // console.log("email: " + email);
    // console.log("password: " + password);
    axios.post('oms/login', {
        email: email,
        password: password
      })
} 

export async function sell( { values, transactionArray, deliveryArray, curtime } ) {
    axios.post('oms/post/createpost', {
      postOwner : " ",
      postDate : curtime,
      postStatus : values.status,
      postTitle : values.title,
      postCategory : values.category,
      postCondition : values.condition,
      postDescription : values.description,
      postPrice : values.price,
      postEmail : values.email,
      postPhone : values.phone,
      postZipcode : values.zipcode,
      postAddress : values.address,
      deliveryType : transactionArray,
      transactionMethod : deliveryArray
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





