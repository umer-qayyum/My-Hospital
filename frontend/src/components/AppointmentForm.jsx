import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const AppointmentForm = () => {
  const [appointmentData, setAppointmentData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nic: "",
    dob: "",
    gender: "",
    appointment_date: "",
    department: "Pediatrics",
    doctor_firstName: "",
    doctor_lastName: "",
    address: "",
    hasVisited: false,
  });


  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];
const resetForm=()=>{
  setAppointmentData({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nic: "",
    dob: "",
    gender: "",
    appointment_date: "",
    department: "Pediatrics",
    doctor_firstName: "",
    doctor_lastName: "",
    address: "",
    hasVisited: false,
  })
}
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/doctors",
        { withCredentials: true }
      );
      setDoctors(data.doctors);
      console.log("doctors--->", data.doctors);
    };
    fetchDoctors();
  }, []);
  const handleAppointment = async (e) => {
    e.preventDefault();
    console.log("appointmentData",appointmentData)
    // ret urn
    try {
      const hasVisitedBool = Boolean(appointmentData?.hasVisited);
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/appointment/post",
        {
           ... appointmentData,
         hasVisited:hasVisitedBool       
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      resetForm();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="container form-component appointment-form">
        <h2>Appointment</h2>
        <form onSubmit={handleAppointment}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={appointmentData?.firstName}
              onChange={(e) => {
                setAppointmentData({
                  ...appointmentData,
                  firstName: e?.target?.value,
                });
              }}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={appointmentData?.lastName}
              onChange={(e) => {
                setAppointmentData({
                  ...appointmentData,
                  lastName: e?.target?.value,
                });
              }}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={appointmentData?.email}
              onChange={(e) => {
                setAppointmentData({
                  ...appointmentData,
                  email: e?.target?.value,
                });
              }}
            />
            <input
              type="number"
              placeholder="Mobile Number"
              value={appointmentData?.phone}
              onChange={(e) => {
                setAppointmentData({
                  ...appointmentData,
                  phone: e?.target?.value,
                });
              }}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="NIC"
              value={appointmentData?.nic}
              onChange={(e) => {
                setAppointmentData({
                  ...appointmentData,
                  nic: e?.target?.value,
                });
              }}
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={appointmentData?.dob}
              onChange={(e) => {
                setAppointmentData({
                  ...appointmentData,
                  dob: e?.target?.value,
                });
              }}
            />
          </div>
          <div>
            <select value={appointmentData?.gender}  onChange={(e)=>{
                setAppointmentData({
                  ...appointmentData,
                  gender:e?.target?.value
                })
              }}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="date"
              placeholder="Appointment Date"
              value={appointmentData?.appointment_date}
              onChange={(e)=>{
                setAppointmentData({
                  ...appointmentData,
                  appointment_date:e?.target?.value
                })
              }}
            />
          </div>
          <div>
            <select
              value={appointmentData?.department}
              onChange={(e)=>{
                setAppointmentData({
                  ...appointmentData,
                  department:e?.target?.value
                })
              }}
            >
              {departmentsArray.map((depart, index) => {
                return (
                  <option value={depart} key={index}>
                    {depart}
                  </option>
                );
              })}
            </select>
            <select
              value={`${appointmentData?.doctor_firstName} ${appointmentData?.doctor_lastName}`}
              
                
                onChange={(e)=>{
                  const [firstName, lastName] = e.target.value.split(" ");
                  setAppointmentData({
                    ...appointmentData,
                    doctor_firstName:firstName,
                    doctor_lastName:lastName
                  })
                }}
              
              disabled={!appointmentData?.department}
            >
              <option value="">Select Doctor</option>
              {doctors
                .filter((doctor) => doctor.doctorDepartment === appointmentData?.department)
                .map((doctor, index) => (
                  <option
                    value={`${doctor.firstName} ${doctor.lastName}`}
                    key={index}
                  >
                    {doctor.firstName} {doctor.lastName}
                  </option>
                ))}
            </select>
          </div>
          <textarea
            rows="10"
            value={appointmentData?.address}
            onChange={(e)=>{
              setAppointmentData({
                ...appointmentData,
                address:e?.target?.value
              })
            }}
            placeholder="Address"
          />
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Have you visited before?</p>
            <input
              type="checkbox"
              checked={appointmentData?.hasVisited}
               onChange={(e)=>{
                setAppointmentData({
                  ...appointmentData,
                  hasVisited:e?.target?.checked
                })
              }}
              style={{ flex: "none", width: "25px" }}
            />
          </div>
          <button style={{ margin: "0 auto" }}>GET APPOINTMENT</button>
        </form>
      </div>
    </>
  );
};

export default AppointmentForm;
