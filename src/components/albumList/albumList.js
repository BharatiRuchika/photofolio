// Importing necessary hooks and components from React
import {useEffect, useState} from "react"
import AlbumForm from "../../components/albumForm/albumForm"  // Importing the AlbumForm component

// Importing Firebase related dependencies
import {db} from "../../firebaseInit"

// Importing toast components and styles
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import firebase methods here
import { collection, addDoc,query, where, getDocs,onSnapshot,doc,deleteDoc,setDoc  } from "firebase/firestore"; 

// import css styles 
import styles from "./albumlist.module.css"

// Albums component
const AlbumList = ({switchToImages})=>{
    // State variables for managing albums data
    const [album, setAlbum] = useState(false)  // State for toggling album form visibility
    const [albums, setAlbums] = useState([])   // State for storing albums data
    
    // Function to fetch albums data from Firestore
    async function getData(){
        const unsub = onSnapshot(collection(db, "albums"), (snapShot) => {
        // Mapping snapshot documents to album objects
        const albums = snapShot.docs.map((doc)=>{
            return {
                id: doc.id,
                 ...doc.data()
                }
            })
        console.log("albums",albums)
        // Updating state with fetched albums data
        setAlbums(albums)
        });
    }
        
    // Effect hook to fetch albums data on component mount
    useEffect(()=>{
        getData()
    },[])

    // Function to toggle album form visibility
    const changeAlbumState = () => {
        setAlbum((prevState)=>!prevState)
    }

    // Function to add a new album
    const addAlbum = async(albumName) => {
        // Add a new document with a generated id.
        console.log("albumName",albumName)
        const docRef = await addDoc(collection(db, "albums"), {
            name: albumName,
            images: []
        });
        console.log('docRef',docRef)
        
        // Updating state with the new album
        let oldAlbums = albums
        let newAlbums = [{id:docRef.id,name:albumName},...oldAlbums]
        console.log('newAlbums',newAlbums)
        setAlbums(newAlbums)
        
        // Displaying success toast message
        toast.success("Album added successfully.");
    }

    // JSX rendering
    return (<>
     <ToastContainer />
    {album&&<AlbumForm addAlbum={addAlbum}/>}
        <div className="row">
            <div className="col-8 offset-2">
                <div className={styles.albumList}>
                
                    <div className={styles.albumsHeader}>
                        <div className="">
                            <h3>Your albums</h3>
                        </div>
                        <div className="">
                            {!album?<button className={styles.albums} onClick={changeAlbumState}>Add Album</button>:<button className={styles.cancel} onClick={changeAlbumState}>cancel</button>} 
                        </div>   
                    </div>

                    <div className="row">
                        {albums.map((album,index)=>{
                        return (<div className="mb-5 col-md-3 col-12 col-sm-6" key={index}>
                            <div className={styles.album} onClick={()=>switchToImages(album.id)}>
                                <img src="/assets/photos.png" alt="images"/>
                                <span>{album.name}</span>
                            </div>
                         </div>)
                    })}
                            
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default AlbumList    // Exporting the Albums component