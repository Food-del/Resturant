// import { useContext, useState, useEffect } from "react";
// import { StoreContext } from '../../Context/StoreContext';
// import './MyProfile.css';
// import axios from 'axios';
// import { User } from "lucide-react";

// const MyProfile = () => {
//     const { user, token, url } = useContext(StoreContext);
//     const [showPasswordForm, setShowPasswordForm] = useState(false);
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState("");
    
//     const [data, setData] = useState({
//         id: user._id,
//         oldPassword: "",
//         newPassword: "",
//         confirmPassword: ""
//     });

//     useEffect(() => {
//       if (user?._id) {
//           setData((prev) => ({ ...prev, id: user._id }));
//       }
//   }, [user]);
  
//     // id: user?._id
//     const onChangeHandler = (event) => {
//         const { name, value } = event.target;
//         setData((prevData) => ({ ...prevData, [name]: value }));
//     };

//     const handlePasswordChange = async () => {
//         if (data.newPassword !== data.confirmPassword) {
//             setError("New passwords do not match.");
//             return;
//         }
//         console.log(data);
        
//         try {
//             const response = await axios.post(url + "/api/user/change-password", data, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });

//             if (response.data.success) {
//                 setSuccess("Password changed successfully!");
//                 setError("");
//                 setShowPasswordForm(false);
//             } else {
//                 setError(response.data.message || "Failed to change password.");
//             }
//         } catch (error) {
//             setError(error.response?.data?.message || "An error occurred. Please try again.");
//         }
//     };
//       // console.log(user?._id);
      
//     return (
//         <div className="profile-container-h">
//             <div className="profile-header">
//                 <div className="profile-icon">✔️</div>
//                 <h2 className="profile-name">{user?.name || "NA"}</h2>
//             </div>

//             <div className="profile-details">
//                 <div className="profile-item">
//                     <i className="fas fa-envelope"></i>
//                     <div>
//                         <p className="profile-label">Email</p>
//                         <p>{user?.email || "NA"}</p>
//                     </div>
//                 </div>

//                 <div className="profile-item">
//                     <i className="fas fa-phone"></i>
//                     <div>
//                         <p className="profile-label">Phone</p>
//                         <p>+91 {user?.phoneNo || " ----- -----"}</p>
//                     </div>
//                 </div>

//                 <div className="profile-item">
//                     <i className="fas fa-map-marker-alt"></i>
//                     <div>
//                         <p className="profile-label">City</p>
//                         <p>{user?.city || "Ahmedabad"}</p>
//                     </div>
//                 </div>

//                 <div className="profile-item">
//                     <i className="fas fa-home"></i>
//                     <div>
//                         <p className="profile-label">Address</p>
//                         <p>{user?.address || " NA"}</p>
//                     </div>
//                 </div>
//             </div>

//             {/* Change Password Section */}
//             <div className="password-container">
//                 <div className="password-label">
//                     <i className="fas fa-key"></i>
//                     <p>Change Password</p>
//                 </div>
//                 <button
//                     className="update-password-btn"
//                     onClick={() => setShowPasswordForm(!showPasswordForm)}
//                 >
//                     Update Password
//                 </button>
//             </div>

//             {/* Password Change Form */}
//             {showPasswordForm && (
//                 <div className="password-form">
//                     <h3>Change Password</h3>

//                     {error && <p className="error-message">{error}</p>}
//                     {success && <p className="success-message">{success}</p>}

//                     <label>Current Password</label>
//                     <input
//                         name="oldPassword"
//                         type="password"
//                         placeholder="Enter current password"
//                         onChange={onChangeHandler}
//                         value={data.oldPassword}
//                     />

//                     <label>New Password</label>
//                     <input
//                         name="newPassword"
//                         type="password"
//                         placeholder="Enter new password"
//                         value={data.newPassword}
//                         onChange={onChangeHandler}
//                     />

//                     <label>Confirm New Password</label>
//                     <input
//                         name="confirmPassword"
//                         type="password"
//                         placeholder="Confirm new password"
//                         value={data.confirmPassword}
//                         onChange={onChangeHandler}
//                     />

//                     <div className="password-actions">
//                         <button className="save-btn" onClick={handlePasswordChange}>
//                             Save Changes
//                         </button>
//                         <button
//                             className="cancel-btn"
//                             onClick={() => setShowPasswordForm(false)}
//                         >
//                             Cancel
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MyProfile;

import { useContext, useState, useEffect } from "react";
import { StoreContext } from '../../Context/StoreContext';
import './MyProfile.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyProfile = () => {
    const { user, token, url } = useContext(StoreContext);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    
    const [data, setData] = useState({
        id: user._id,
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    useEffect(() => {
        if (user?._id) {
            setData((prev) => ({ ...prev, id: user._id }));
        }
    }, [user]);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handlePasswordChange = async () => {
        if (data.newPassword !== data.confirmPassword) {
            setError("New passwords do not match.");
            toast.error("New passwords do not match.");
            return;
        }

        try {
            const response = await axios.post(url + "/api/user/change-password", data, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                setSuccess("Password changed successfully!");
                setError("");
                setShowPasswordForm(false);
                toast.success("Password changed successfully!");
            } else {
                setError(response.data.message || "Failed to change password.");
                toast.error(response.data.message || "Failed to change password.");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
            setError(errorMessage);
            toast.error(errorMessage);
        }
    };

    return (
        <div className="profile-container-h">
            <ToastContainer position="top-right" autoClose={3000} />
            
            <div className="profile-header">
                <div className="profile-icon">✔️</div>
                <h2 className="profile-name">{user?.name || "NA"}</h2>
            </div>

            <div className="profile-details">
                <div className="profile-item">
                    <i className="fas fa-envelope"></i>
                    <div>
                        <p className="profile-label">Email</p>
                        <p>{user?.email || "NA"}</p>
                    </div>
                </div>

                <div className="profile-item">
                    <i className="fas fa-phone"></i>
                    <div>
                        <p className="profile-label">Phone</p>
                        <p>+91 {user?.phoneNo || " ----- -----"}</p>
                    </div>
                </div>

                <div className="profile-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <div>
                        <p className="profile-label">City</p>
                        <p>{user?.city || "Ahmedabad"}</p>
                    </div>
                </div>

                <div className="profile-item">
                    <i className="fas fa-home"></i>
                    <div>
                        <p className="profile-label">Address</p>
                        <p>{user?.address || "NA"}</p>
                    </div>
                </div>
                <div className="profile-item">
                    <i className="fas fa-home"></i>
                    <div>
                        <p className="profile-label">Area</p>
                        <p>{user?.areaId?.area  || "NA"}</p>
                    </div>
                </div>
                <div className="profile-item">
                    <i className="fas fa-home"></i>
                    <div>
                        <p className="profile-label">Pincode</p>
                        <p>{user?.areaId?.pincode || "NA"}</p>
                    </div>
                </div>
                {/* <div className="profile-item"> */}
                    {/* <i className="fas fa-home"></i> */}
                    <div className="update-info-btn-div">
                        <button className="update-info-btn">Update Information</button>
                    </div>
                {/* </div> */}
            </div>

            <div className="password-container">
                <div className="password-label">
                    <i className="fas fa-key"></i>
                    <p>Change Password</p>
                </div>
                <button
                    className="update-password-btn"
                    onClick={() => setShowPasswordForm(!showPasswordForm)}
                >
                    Update Password
                </button>
            </div>

            {showPasswordForm && (
                <div className="password-form">
                    <h3>Change Password</h3>

                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}

                    <label>Current Password</label>
                    <input
                        name="oldPassword"
                        type="password"
                        placeholder="Enter current password"
                        onChange={onChangeHandler}
                        value={data.oldPassword}
                    />

                    <label>New Password</label>
                    <input
                        name="newPassword"
                        type="password"
                        placeholder="Enter new password"
                        value={data.newPassword}
                        onChange={onChangeHandler}
                    />

                    <label>Confirm New Password</label>
                    <input
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm new password"
                        value={data.confirmPassword}
                        onChange={onChangeHandler}
                    />

                    <div className="password-actions">
                        <button className="save-btn" onClick={handlePasswordChange}>
                            Save Changes
                        </button>
                        <button
                            className="cancel-btn"
                            onClick={() => setShowPasswordForm(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyProfile;
