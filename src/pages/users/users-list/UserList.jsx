import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {  getUsers, removeUser } from "../../../redux/features/user/userSlice";
import styles from './users.module.css'
import userImage from '../../../assets/images/userImage.png'
import { Cross } from "../../../components/svg-component";
import AddUser from "../adduser/AddUser";
import DeletePopup from "../../../components/svg-component/delete-popup/DeletePopup";

const UserList = () => {

  //Get data from store
  const userList = useSelector((state) => state.user);
  const [isOpen,setIsOpen] = useState(false);   // open add user popup
  const [isDeleteOpen,setIsDelete] = useState(false);   // open add user popup
  const [delId,setDelId] = useState(null);   // open add user popup
  const dispatch = useDispatch();

  //On component render api will call 
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  //Remove user 
  const handelDeleteUser = (userId) => {
    dispatch(removeUser(userId))
    setDelId(null)
    setIsDelete(false)
  }

  const handleNavigate = () => {
    setIsOpen(true)
  }

  return (
    <div className={styles.userListWrapper}>
     {isOpen && <AddUser isOpen={isOpen} setIsOpen={setIsOpen}/>} 
     {isDeleteOpen && <DeletePopup isOpen={isDeleteOpen} setIsOpen={setIsDelete} handleDelete={()=>handelDeleteUser(delId)}/>} 
      <div className={styles.buttonContainer}>
        <button onClick={() => { handleNavigate() }} className={styles.addButton}>Add New User</button>
      </div>
      <div className={styles.userCardContainer}>
        {userList?.userList?.map((user) => {
          return (
            <div className={styles.profilCard} key={user?.id}>
              <img src={userImage} alt="profile" />
                <span className={styles.userName}>{user?.name}</span>
                <span className={styles.userEmail}>{user?.email}</span>
                <span className={styles.userCity}>{user?.address?.city}</span>
              {userList?.userList?.length > 3 && (
                <span  onClick={()=>{setIsDelete(true);setDelId(user.id)}} className={styles.crossIcon}><Cross/></span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserList;
