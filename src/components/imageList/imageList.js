// importing necessary hooks from react
import { useEffect, useState } from 'react';

// import firebase methods here
import { collection, addDoc,query, where, getDocs,onSnapshot,doc,deleteDoc,setDoc,getDoc,updateDoc, startAt, orderBy} from "firebase/firestore"; 
import {db} from "../../firebaseInit"

// importing ImageForm Componnet
import ImageForm from '../imageForm/imageForm';

import styles from "./imagelist.module.css"

// Importing toast components and styles
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



// ImageList Component
const Imagelist = ({switchToAlbums,albumId})=>{
    // State variables for managing component data
    const [ imageForm, setImageForm ] = useState(false)  // State for toggling image form visibility
    const [ updateForm, setUpdateForm ] = useState(false)  // State for toggling update mode in image form
    const [ image, setImage ] = useState(null)  // State for storing image data
    const [isOpen, setIsOpen] = useState(false);  // State for lightbox visibility
    const [currentImageIndex, setCurrentImageIndex] = useState(0);  // State for current image index in lightbox
    const [ isSearch, setSearch ] = useState(false)  /// State for toggling search mode
    const [ searchText, setSearchText ] = useState("")  // State for search input text
    const [ album, setAlbum ] = useState({  // State for album data
        name : "",
        images : []
    })

    // Function to fetch album data from Firestore
    async function getData() {
        const docRef = doc(db, "albums", albumId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            let album = docSnap.data()
            setAlbum(album)
        } else {
            console.log("No such document!");
        }
    }

    // Effect hook to fetch album data on component mount
    useEffect(()=>{
        getData()
    },[])

    // Function to toggle image form visibility and update mode
    const openAddForm = () => {
        setImageForm(true)
        setUpdateForm(false)
    }

    // Function to reset image form state
    const changeFormState = ()=>{
        setImageForm(false)
        setUpdateForm(false)
        setImage(null)
    }

    // Function to open image form in update mode
    const openEditForm = (image) => {
        setImageForm(true)
        setUpdateForm(true)
        setImage(image)
    }

    // Function to delete an image
    const deleteImage = async(id) => {
        await deleteDoc(doc(db, "images", id));
        let oldImages = album.images;
        const albumsRef = collection(db, "albums");
        let newImages = oldImages.filter((img)=>(img.id!=id))                
       
        setAlbum(prevState => ({
            ...prevState,
            images: [...newImages]
        }));

        await updateDoc(doc(albumsRef, albumId), {
            images: newImages
        })

        toast.success("Image Successfully Deleted from your Album!");
    }

    // Function to add or update an image
    const addImage = async(title, imagePath, image) => {
        if(image){
            await updateDoc(doc(db, "images", image.id), {
                title: title,
                imagePath: imagePath
            });
            const albumsRef = collection(db, "albums");
            let oldImages = album.images
            let newImages = oldImages.map((img)=>{
                if (img.id==image.id){
                    img.title = title
                    img.imagePath = imagePath
                }
                return img
            })                
           
            setAlbum(prevState => ({
                ...prevState,
                images: [...newImages]
            }));

            await updateDoc(doc(albumsRef, albumId), {
                images: newImages
            })
            setUpdateForm(false)
            setImageForm(false)
            setImage(null)
        }else{
            const docRef = await addDoc(collection(db, "images"), {
                albumId: albumId,
                title: title,
                imagePath: imagePath
            });
            let oldImages = album.images
            let newImages  = [{id:docRef.id,title:title,imagePath:imagePath},...oldImages]
            const albumsRef = collection(db, "albums");
            await updateDoc(doc(albumsRef, albumId), {
                images: newImages
            })
            setAlbum((prevState)=>({...prevState, images:newImages}));
            toast.success("Image added successfully.");
        }
    }

    // Function to open the lightbox
    const openLightbox = (index) => {
        setCurrentImageIndex(index);
        setIsOpen(true);
      };

     // close lightbox
    const closeLightbox = () => {
        setIsOpen(false);
    };

    // Function to handle next image in the lightbox
    const handleNextImage = () => {
        let index = currentImageIndex
        index = index + 1
        if (index >= album.images.length){
            index = 0
        }
        setCurrentImageIndex(index)
    }

    // Function to handle previous image in the lightbox
    const handlePrevImage = () => {
        let index = currentImageIndex 
        index = index - 1
        if (index < 0){
            index = album.images.length - 1
        }
        setCurrentImageIndex(index)
    }

    // Function to toggle search mode
    const changeSearchState = ()=>{
        setSearch((prevState)=>!prevState)
    }

     // Function to handle image download
    const handleImageDownload = (imagePath) => {
        const fileExtension = imagePath.split('.').pop();
        // Generate a unique filename
        const filename = `image_${Date.now()}.${fileExtension}`;
        const a = document.createElement('a');
        a.href = imagePath;
        a.download = filename;
        a.click();
    };
 


    // JSX rendering
    return (<>
     <ToastContainer />
    {imageForm && <ImageForm updateForm={updateForm} image={image} addImage={addImage}/>}
        <div className="row">
            <div className="col-8 offset-2">
                <div className="row  mt-5 mb-5">
                    <div className="col-8 ">
                        
                        <div className={styles.imageListTop}>
                            <div className="row">
                                <div className="col-md-1 col-6" onClick={switchToAlbums}>
                                    <span>
                                        <img src="/assets/back.png"/>
                                    </span>
                                </div>
                                <div className={`col-md-10 col-6 offset-md-1 ${styles.heading}`}>
                                    <h3>
                                        {album.images.length==0?'No images found in the album': `images in ${album.name}`}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4"  style={{display:'flex',gap:'10px'}}>
                        <div className={styles.imageList_search}>
                             {isSearch ? <><input placeholder="Search..." value={searchText} onChange={(e)=>setSearchText(e.target.value)}></input>
                            <img src="/assets/cross.png" className={styles.crossBtn} alt="clear" onClick={changeSearchState}/></>:
                            <img className={styles.searchBtn} src="/assets/search.webp" onClick={changeSearchState}/>}
                        </div>
                        <div>
                            {!imageForm?<button className={styles.albums} onClick={openAddForm}>Add Image</button>:<button className={styles.cancel} onClick={changeFormState}>cancel</button>} 
                        </div>
                    </div>
                </div>
                <div className="row">
                {album.images.
          filter((image) => {
            return searchText.toLocaleLowerCase() === ""
              ? image
              : image.title.toLocaleLowerCase().includes(searchText)
          }).map((image,index)=>{
                        return (
                        <div className={`col-12 col-sm-6 col-md-3 ${styles.imageList_image}`} key={index}>
                            <div className={`${styles.imageList_update} false`}>
                                <img src="/assets/edit.png" onClick={()=>openEditForm(image)} alt="update"/>
                            </div>

                            <div className={`${styles.imageList_delete} false`}>
                                <img src="/assets/trash-bin.png" alt="delete" onClick={()=>deleteImage(image.id)}/>
                            </div>
                        
                            <img src={image.imagePath} alt={image.title} onClick={() => openLightbox(index)}/>
                        
                            <span>{image.title}</span>
                        </div>)
                        
                    })}
                </div>
            </div>
        </div>
        
        {isOpen && (
        <>
        <div className={styles.carouselElement}>
            <button onClick={handlePrevImage}> 
                <i class="fa-solid fa-backward"></i>
            </button>
            <div className="lightbox-overlay" onClick={closeLightbox}>
                <div className={styles.lightboxContainer}>
                    <button className={styles.closeButton} onClick={closeLightbox}>
                        <i class="fa-solid fa-xmark"></i>
                    </button>   
                    <button className={styles.downloadButton} onClick={()=>handleImageDownload(album.images[currentImageIndex].imagePath)}>
                        <i class="fas fa-download"></i>
                    </button>
                    <img
                    className={styles.lightbox-image}
                    src={album.images[currentImageIndex].imagePath}
                    alt={`Image ${currentImageIndex}`}
                    />
                </div>
            </div>
            <button onClick={handleNextImage}> 
                <i class="fa-solid fa-forward"></i>
            </button>
        </div>
        </>
      )}
    </>)
}
export default Imagelist;