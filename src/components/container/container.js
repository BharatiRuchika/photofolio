import Imagelist from "../imageList/imageList"  // Importing the ImageList component
import AlbumList from "../albumList/albumList"    // Importing the Albumcomponent

// importing necessary hooks from react
import { useState } from "react"

// Container Component
const Container = () => {
    
    // State variables for managing container data
    const [ imageList, setImageList ] = useState(false)
    const [ albumList, setAlbumList ] = useState(true)
    const [ albumId, setAlbumId]   = useState("")


    // Function to toggle image list visibility
    const switchToImages = (albumId) => {
        setAlbumList(false)
        setImageList(true)
        setAlbumId(albumId)
    }

    // Function to toggle album list visibility
    const switchToAlbums = () => {
        setImageList(false)
        setAlbumList(true)
    }

    // JSX rendering
    return (<>
        {imageList?<Imagelist albumId={albumId} switchToAlbums={switchToAlbums}/>:albumList?<AlbumList switchToImages={switchToImages}/>:<></>}
    </>)
}


// Exporting the Container component
export default Container