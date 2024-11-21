import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const MessageForm = () => {
  const [messageData,setMessageData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    phone:"",
    message:""
  })
const resetForm=()=>{
  setMessageData({
    firstName:"",
    lastName:"",
    email:"",
    phone:"",
    message:""
  })
}
  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:4000/api/v1/message/send",
          { ...messageData },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          resetForm();
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="container form-component message-form">
        <h2>Send Us A Message</h2>
        <form onSubmit={handleMessage}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={messageData?.firstName}
              onChange={(e)=>{
                setMessageData({
                  ...messageData,
                  firstName:e?.target?.value
                })
              }}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={messageData?.lastName}
              onChange={(e)=>{
                setMessageData({
                  ...messageData,
                  lastName:e?.target?.value
                })
              }}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={messageData?.email}
              onChange={(e)=>{
                setMessageData({
                  ...messageData,
                  email:e?.target?.value
                })
              }}
            />
            <input
              type="number"
              placeholder="Mobile Number"
              value={messageData?.phone}
              onChange={(e)=>{
                setMessageData({
                  ...messageData,
                  phone:e?.target?.value
                })
              }}
            />
          </div>
          <textarea
            rows={7}
            placeholder="Message"
            value={messageData?.message}
            onChange={(e)=>{
              setMessageData({
                ...messageData,
                message:e?.target?.value
              })
            }}
          />
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Send</button>
          </div>
        </form>
        <img src="/Vector.png" alt="vector" />
      </div>
    </>
  );
};

export default MessageForm;
