import { useQuery } from 'react-query';
import defaultQueryFn from '../util/defaultQueryFn';

export function UserNameSpan() {
    const { isLoading, isError, data } = useQuery(['username', 'userinfo/getUserInfo/'], defaultQueryFn);

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error!!!</span>
    }

    return <span>Hello, { data.userName } </span> 
}