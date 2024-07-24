import {useState, useEffect} from 'react'

function Reg() {
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const changeHandler = (event) => {
     setSelectedFile(event.target.files[0]);
     event.target.files[0] && setIsFilePicked(true);
    };

   function add() {
        console.log(selectedFile)
            const formData = new FormData();
            formData.append("File", selectedFile);
            formData.append("email","ivan41@email.ru");
            formData.append("password","12345678");
        fetch('http://localhost:5000/api/registration', {
            method: 'POST',
            body:formData
        })
        .then((res) => res.text())
        .then((res) => {
            console.log(res)
            let newJson = res.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
                newJson = newJson.replace(/'/g, '"');
            console.log(JSON.parse(newJson))
        }
         )

        }
        return (
            <div className="items">



                <input name="avatar" onChange={changeHandler} type="file" />
                <button onClick={add}>
                    Добавить
                </button>
            </div>
        )
}

export default Reg