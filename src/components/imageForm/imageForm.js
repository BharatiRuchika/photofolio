// importing necessary hooks from react
import { useEffect, useState } from "react"

// import css styles 
import styles from "./imageform.module.css"
// ImageForm Component
const ImageForm = ({image, addImage, updateForm}) => {
  
  // State variables for managing form inputs
  const [ imagePath, setImagePath ] = useState("") // State for image path
  const [ title, setTitle ] = useState("")   // State for image title
  const [curr_title, setCurrTitle] = useState("")   // State for current image title

  // Effect hook to update state when 'image' prop changes
  useEffect(()=>{
    
    // Update state with image data if 'image' prop is provided
    if(image!=null){
      setImagePath(image.imagePath)  // Set image path
      setTitle(image.title)   // Set image title
      setCurrTitle(image.title)  // Set current image title
    }
  },[image])
  
  //function to add images in specific album
  const AddImage = (e) =>{
    e.preventDefault()
    addImage(title, imagePath, image)
    setImagePath("")
    setTitle("")
  }

  // Function to handle input change
  const handleChange = (e) => {
    if(e.target.name=="title"){
      setTitle(e.target.value)   // Update title state
    }else if(e.target.name=="imagePath"){
      setImagePath(e.target.value)  // Update image path state
    }
  }

  // JSX rendering
  return (<>
    <div className="row">
        <div className="col-6 offset-3 mt-5 mb-5" id={styles.imageForm_container}>
            <span>{updateForm ? 'update':'add'} image  {curr_title}</span>
            <form onSubmit={AddImage}>
                <input type="text" required placeholder="Title" name="title" value={title} onChange={handleChange}/>
                <input type="text" required placeholder="Image URL" name="imagePath" value={imagePath} onChange={handleChange}/>
                <div id={styles.imageForm_actions}>
                    <button type="button">Clear</button>
                    <button>{updateForm?'Update':'Add'}</button>
                </div>
            </form>
        </div>
    </div>
  </>)
}

export default ImageForm    // Exporting the ImageForm component