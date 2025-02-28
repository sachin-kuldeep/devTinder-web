import axios from "axios";
import React, { useState } from "react";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [about, setAbout] = useState(user.about || "");
  const [gender, setGender] = useState(user.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          photoUrl,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="flex justify-center my-16 p-5">
        <div className="flex justify-center mr-5">
          <div className="card bg-base-200 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center my-2">Edit Profile</h2>
              <div>
                <div className="relative w-full max-w-xs my-4">
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    className="block px-2.5 pb-2.5 pt-4 w-full bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder=" "
                  />
                  <label
                    htmlFor="firstName"
                    className="absolute  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
                  >
                    First Name
                  </label>
                </div>

                <div className="relative w-full max-w-xs my-4">
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    className="block px-2.5 pb-2.5 pt-4 w-full bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder=" "
                  />
                  <label
                    htmlFor="lastName"
                    className="absolute  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
                  >
                    Last Name
                  </label>
                </div>

                <div className="relative w-full max-w-xs my-4">
                  <input
                    type="text"
                    id="age"
                    value={age}
                    className="block px-2.5 pb-2.5 pt-4 w-full  bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    onChange={(e) => setAge(e.target.value)}
                    placeholder=" "
                  />
                  <label
                    htmlFor="age"
                    className="absolute  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
                  >
                    Age
                  </label>
                </div>

                <div className="relative w-full max-w-xs my-4">
                  <textarea
                    id="about"
                    value={about}
                    rows="2"
                    className="block px-2.5 pb-2.5 pt-4 w-full  bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder=" "
                  ></textarea> 
                  <label
                    htmlFor="about"
                    className="absolute  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
                  >
                    About
                  </label>
                </div>

                <div className="relative w-full max-w-xs my-4">
                  <select
                    id="gender"
                    name="gender"
                    value={gender}
                    className="block px-2.5 pb-2.5 pt-4 w-full  bg-base-200 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                  <label
                    htmlFor="gender"
                    className="absolute  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
                  >
                    Gender
                  </label>
                </div>

                <div className="relative w-full max-w-xs my-4">
                  <input
                    type="text"
                    id="photoUrl"
                    value={photoUrl}
                    className="block px-2.5 pb-2.5 pt-4 w-full  bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    placeholder=" "
                  />
                  <label
                    htmlFor="photoUrl"
                    className="absolute  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
                  >
                    Photo URL
                  </label>
                </div>
              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center m-1">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
        <UserCard
          user={{ firstName, lastName, age, gender, about, photoUrl }}
        />
        </div>
      </div>
      <div>
        {showToast && (
          <div className="toast toast-top toast-right mt-16">
            <div className="alert alert-success">
              <span>Profile saved successfully.</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EditProfile;
