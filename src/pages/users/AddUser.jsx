import React from "react";
import { useForm } from "react-hook-form";
import { addUserValidation } from "../../formValidators/AddUserValidation";
import { useDispatch, useSelector } from "react-redux";
import { AddNewUser } from "../../redux/features/user/userSlice";
import "../../App.css";


const AddUser = () => {
  const dispatch = useDispatch();
  //Fetch data from store 
  const userList = useSelector((state) => state.user);

  //use-form hook is used for handel form  and errors
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const onSubmit = (data) => {
    //Dispatched action to reducer 
    //id: userList?.userList?.length + 1 is added for identify the user by id 
    dispatch(AddNewUser({ ...data, id: userList?.userList?.length + 1 ,address:{city:data.address}}));
    
    //After form submission form will clear
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          
          <label>Name:</label>
          <input
            type="text"
            {...register("name", addUserValidation.name)}
            onKeyUp={() => {
              trigger("name");
            }}
          />
          {errors.name && (
            <small className="error">{errors.name.message}</small>
          )}
        </div>
        <div>
          <label className="">Email:</label>
          <input
            type="text"
            {...register("email", addUserValidation.email)}
            onKeyUp={() => {
              trigger("email");
            }}
          />
          {errors.email && (
            <small className="error">{errors.email.message}</small>
          )}
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            {...register("address", addUserValidation.address)}
            onKeyUp={() => {
              trigger("address");
            }}
          />
          {errors.address && (
            <small className="error">{errors.address.message}</small>
          )}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUser;
