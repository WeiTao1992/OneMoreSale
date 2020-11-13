import { useQuery } from 'react-query';
import { Link } from "react-router-dom";
import defaultQueryFn from '../util/defaultQueryFn';

export function PostItemButton(props) {
    const { isLoading, isError, data } = useQuery(['username', 'userinfo/getUserInfo/'], defaultQueryFn);

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        console.log("error")
        return ( 
        <Link to="/login">
          {props.children}
        </Link>
        )
    }

    console.log("go to sell page")
    return (
    <Link to="/sell">
      {props.children}
    </Link>
    )
}