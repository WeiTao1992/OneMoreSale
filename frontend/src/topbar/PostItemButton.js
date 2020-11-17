import { useQuery } from 'react-query';
import { Link } from "react-router-dom";
import defaultQueryFn from '../util/defaultQueryFn';

export function PostItemButton(props) {
    const { isError, data } = useQuery(['username', 'userinfo/getUserInfo/'], defaultQueryFn);

    if (isError || data === undefined) {
        return ( 
        <Link to="/login">
          {props.children}
        </Link>
        )
    }

    return (
    <Link to="/sell">
      {props.children}
    </Link>
    )
}