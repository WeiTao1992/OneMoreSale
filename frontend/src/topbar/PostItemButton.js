import { useQuery } from 'react-query';
import Link from '@material-ui/core/Link';
import defaultQueryFn from '../util/defaultQueryFn';

export function PostItemButton() {
    const { isLoading, isError, data } = useQuery(['username', 'userinfo/getUserInfo/'], defaultQueryFn);

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <Link to="/login"/>
    }

    return <Link to="/sell" />
}