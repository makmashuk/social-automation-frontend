
import Paperbase from '../../components/Paperbase'

function Index() {
  return (
    <div>index</div>
  )
}

export default Index

Index.getLayout = function getLayout(page) {
    return (
        <Paperbase>{page}</Paperbase>
    )
}