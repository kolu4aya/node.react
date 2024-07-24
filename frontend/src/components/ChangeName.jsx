import { useDispatch } from 'react-redux'
import { setName, backName } from '../store/actions/index.js';

const ChangeName = () => {

    const dispatch = useDispatch();
  
    const changeName = () => {
     dispatch(
      setName({
        name: "Петр"
      })
     )
    }

    const returnName = () => {
      dispatch(
       backName({
         name: "Иван"
       })
      )
     }
   
  
    return (
      <>
        <button onClick={changeName}>Изменить</button>
        <button onClick={returnName}>Изменить обратно</button>
      </>
    )
  }

  export default ChangeName