/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import "./landing.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Landing = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  
  const handleChange =(e)=>{
    setUsername(e.target.value);
  }

  const handleSubmit = (e) => {
    if(username)
    navigate(`/details/${username}`)
  else
    toast.warn("Enter Username");
    e.preventDefault();
  };

  return (
    <div className="container">
      <div className="landing">
        <form className="form__group field">
          <span>
            <input
              type="input"
              className="form__field"
              placeholder="Username"
              required=""
              onChange={handleChange}
            />
            <label htmlFor="name" className="form__label">
              Username
            </label>
          </span>
          <button className="button" onClick={handleSubmit}></button>
        </form>
      </div>
    </div>
  );
};

export default Landing;
