import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [registerData,setRegisterData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    phone:"",
    nic:"",
    dob:"",
    gender:"",
    password:"",
  })
  const navigateTo = useNavigate();
const resetForm=()=>{
  setRegisterData({
    firstName:"",
    lastName:"",
    email:"",
    phone:"",
    nic:"",
    dob:"",
    gender:"",
    password:"",
  })
}
  const handleRegistration = async (e) => {
    e.preventDefault();
    // console.log("hello")
    try {
      const res = await axios
        .post(
          "http://localhost:4000/api/v1/user/patient/register",
          { ...registerData },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          resetForm();
        });

        // console.log("response-->" , response)
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="container form-component register-form">
        <h2>Sign Up</h2>
        <p>Please Sign Up To Continue</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat culpa
          voluptas expedita itaque ex, totam ad quod error?
        </p>
        <form onSubmit={handleRegistration}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={registerData?.firstName}
              onChange={(e)=>{
                setRegisterData({
                  ...registerData,
                  firstName:e?.target?.value
                })
              }}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={registerData?.lastName}
              onChange={(e)=>{
                setRegisterData({
                  ...registerData,
                  lastName:e?.target?.value
                })
              }}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={registerData?.email}
              onChange={(e)=>{
                setRegisterData({
                  ...registerData,
                  email:e?.target?.value
                })
              }}
            />
            <input
              type="number"
              placeholder="Mobile Number"
              value={registerData?.phone}
              onChange={(e)=>{
                setRegisterData({
                  ...registerData,
                  phone:e?.target?.value
                })
              }}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="NIC"
              value={registerData?.nic}
              onChange={(e)=>{
                setRegisterData({
                  ...registerData,
                  nic:e?.target?.value
                })
              }}
            />
            <input
              type={"date"}
              placeholder="Date of Birth"
              value={registerData?.dob}
              onChange={(e)=>{
                setRegisterData({
                  ...registerData,
                  dob:e?.target?.value
                })
              }}
            />
          </div>
          <div>
            <select value={registerData?.gender}  onChange={(e)=>{
                setRegisterData({
                  ...registerData,
                  gender:e?.target?.value
                })
              }}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="password"
              placeholder="Password"
              value={registerData?.password}
              onChange={(e)=>{
                setRegisterData({
                  ...registerData,
                  password:e?.target?.value
                })
              }}
            />
          </div>
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Already Registered?</p>
            <Link
              to={"/signin"}
              style={{ textDecoration: "none", color: "#271776ca" }}
            >
              Login Now
            </Link>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
