
import styles from '../styles/Home.module.scss'
import Paperbase from '../components/Paperbase'
export default function Dashboard() {
  return (
    <div className={styles.container}>
      HOme
    </div>
  )
}
Dashboard.getLayout = function getLayout(page) {
  return (
    <Paperbase>{page}</Paperbase>
  )
}