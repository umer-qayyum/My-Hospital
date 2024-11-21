import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate, Navigate } from "react-router-dom";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [loginData,setLoginData]=useState({
    email:"",
    password:"",
    confirmPassword:"",
  })
  const navigateTo = useNavigate();
const resetForm=()=>{
  setLoginData({
    email:"",
    password:"",
    confirmPassword:"",
  })
}
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:4000/api/v1/user/login",
          { ...loginData, role: "Patient" },
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
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="container form-component login-form">
        <h2>Sign In</h2>
        <p>Please Login To Continue</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat culpa
          voluptas expedita itaque ex, totam ad quod error?
        </p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={loginData?.email}
            onChange={(e)=>{
              setLoginData({
                ...loginData,
                email:e?.target?.value
              })
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={loginData?.password}
            onChange={(e)=>{
              setLoginData({
                ...loginData,
                password:e?.target?.value
              })
            }}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={loginData?.confirmPassword}
            onChange={(e)=>{
              setLoginData({
                ...loginData,
                confirmPassword:e?.target?.value
              })
            }}
          />
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Not Registered?</p>
            <Link
              to={"/register"}
              style={{ textDecoration: "none", color: "#271776ca" }}
            >
              Register Now
            </Link>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
