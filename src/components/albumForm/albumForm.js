// import css styles 
import styles from "./albumform.module.css"
// Importing necessary hooks  
import { useState } from 'react'

// Albums component
const AlbumForm = ({addAlbum}) => {
    // State variables for managing album form data
    const [albumName, setAlbumName] = useState("")


     // Function to add a new album
    const createAlbum = (e) =>{
        e.preventDefault()
        addAlbum(albumName)
        setAlbumName("") 
    }

    // function to cleat input box text
    const clear = () => {
        setAlbumName("") 
    }

    // JSX rendering
    return (<>
        <div className="row">
            <div className="col-10 col-md-8 offset-md-2 offset-1">
                <div className={styles.albumForm}>
                    <span>Create an album</span>
                    <form className='row mt-2' onSubmit={createAlbum}>
                        <input type='text' className="col-12 col-md-6" placeholder='Album Name' value={albumName} onChange={(e)=>setAlbumName(e.target.value)} required/>
                        <button type="button" className="col-12 col-md-2" onClick={clear}>Clear</button>
                        <button type="submit" className="col-12 col-md-2">Create</button>
                    </form>
                </div>
            </div>
        </div>
    </>)
}

 // Exporting the Album Form component
export default AlbumForm