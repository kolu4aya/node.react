import { useSelector } from 'react-redux'

const ViewName = () => {

    const storeName = useSelector((state) => state.nameReducer.name)
  
    return <h1>{storeName}</h1>
  }

  export default ViewName;