import { useQuery } from 'react-query';
import { Link } from "react-router-dom";
import defaultQueryFn from '../util/defaultQueryFn';

export function AccountController() {
    const { isLoading, isError, data } = useQuery(['username', 'userinfo/getUserInfo/'], defaultQueryFn);

    if (isLoading) {
        <Link>
          My Account
        </Link>
    }

    if (isError || data === undefined) {
        return ( 
        <Link to="/login">
          My Account
        </Link>
        )
    }

    return (
    <Link to="/account">
      My Account
    </Link>
    )
}