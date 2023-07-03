import React,  { useEffect, useState } from 'react';
//import { useRef } from 'react';
//import firebase from 'firebase';
import firebase from 'firebase/compat/app';
import "./Feed.css";
import CreateIcon from '@mui/icons-material/Create';
import Inputoption from './Inputoption';
import Imageicon from '@mui/icons-material/Image';
import Subscriptionsicon from '@mui/icons-material/Subscriptions';
import Eventnoteicon from '@mui/icons-material/EventNote';
import Calendaricon from '@mui/icons-material/CalendarViewDay';
import Post from './Post';
//import { storageRef } from './firebasefile';
import { db } from './firebasefile';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import FlipMove from 'react-flip-move';
//import { ref } from 'firebase/storage';
  
function Feed() {
    const user = useSelector(selectUser);
    const [input, setInput]= useState('');
    const [posts, setPosts] = useState([]);
    //const [selectedFile, setSelectedFile] = useState(null);
    // Create a storage reference
    //const storageRef = storage.ref();
    //const storageRef = firebase.storage().ref();
    // Get the file from an input file field or any other source
   // const storageRef = storage().ref();
    
    



    
    useEffect(() => {
        db.collection("posts").orderBy("timestamp","desc").onSnapshot((snapshot)=>
            setPosts(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                    
                }))
            )
        );
    },[]);
    
    
    
    const sendPost = (e) =>{
        e.preventDefault();
        db.collection("posts").add({
                name: user.displayName,
                description: user.email,
                message: input,
                photo: user.photoURL || "",
                //imagefile: uploadedImage,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setInput("");
        
    };

    




  return (
    <div className='feed'>
        <div className='feed_inputcontainer'>
            <div className='feed_input'>

                <CreateIcon/>
                <form>
                
                
                
                    <input value={input} onChange={e=> setInput(e.target.value)} type='text'/>
                    <button onClick={sendPost} type='submit'>Send</button>
                </form>
            </div>
            <div className='feed_inputoption'>
            

                <Inputoption Icon={Imageicon} title="Photo" color="#70B5F9"/>
                
                <Inputoption Icon={Subscriptionsicon} title="Video" color="#E7A33E"/>
                <Inputoption Icon={Eventnoteicon} title="Event" color="#C0CBCD"/>
                <Inputoption Icon={Calendaricon} title="Write Article" color="#7FC15E"/>
            </div>
        </div>

        <FlipMove>
        
        {posts.map(({ id, data: {  name, description, message, photo,ref}   }) =>(
          
            <Post
            key={id}
            id={id} // Pass the id as a prop
            name={name}
            description={description}
            message={message}
            photo={photo}
            ref={ref}
            />
        ))}
        </FlipMove>
        
        </div>
  )
}

export default Feed;