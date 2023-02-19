import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, removeUser } from "../../redux/features/user/userSlice";

const UserList = () => {

//Get data from store
  const userList = useSelector((state) => state.user);
  const dispatch = useDispatch();

  //On component render api will call 
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  //Remove user 
  const handelDeleteUser=(userId)=>{
    dispatch(removeUser(userId))
  }

  return (
    <div>
      {userList?.userList?.map((user) => {
        return (
          <>
            <div key={user.id}>
              {user.name} &nbsp; &nbsp; &nbsp; &nbsp;{user.email} &nbsp; &nbsp;
              &nbsp; &nbsp;{user.address.city}
            </div>
           
            {userList?.userList?.length > 3 && (
              <span onClick={() =>handelDeleteUser(user.id) }>X</span>
            )}
          </>
        );
      })}
    </div>
  );
};

export default UserList;
