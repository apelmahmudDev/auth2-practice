import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';

const SetUserPhoto = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [userPhoto, setUserPhoto] = useState(null);

    console.log(userPhoto);
    
    const handleChange = (e) => {
        const fileUrl = URL.createObjectURL(e.target.files[0]);
        const newUserInfo = {...loggedInUser};
        newUserInfo.photo = fileUrl;
        setLoggedInUser(newUserInfo);
        setUserPhoto(fileUrl)
    }

    return (
        <div style={{marginLeft:'5%'}}>
            <h1>Displaying user Photo</h1>
            <img style={{height:'150px'}} src={userPhoto} alt=""/>
            <input type="file" onChange={handleChange} />
        </div>
    );
};

export default SetUserPhoto;