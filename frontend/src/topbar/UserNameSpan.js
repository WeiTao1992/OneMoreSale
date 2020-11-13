import { useQuery } from 'react-query';
import defaultQueryFn from '../util/defaultQueryFn';

export function UserNameSpan() {
    const { isLoading, isError, data } = useQuery(['username', 'userinfo/getUserInfo/'], defaultQueryFn);

    if (isLoading) {
        return <span>Hello!</span>
    }

    if (isError) {
        return <span>Hello! Ready to sign in?</span>
    }

    return <span>Hello, { data.userName }! </span> 
}