
import styles from '../styles/Home.module.scss'
import Paperbase from '../components/Paperbase'
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/authContext';
import { useRouter } from 'next/router';

export default function Dashboard() {

    const router = useRouter();
    const { isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/login');
        }
    }, [isLoggedIn])
    return (
        <div className={styles.container}>
            Home Page Dashboard
        </div>
    )
}
Dashboard.getLayout = function getLayout(page) {
    return (
        <Paperbase>{page}</Paperbase>
    )
}