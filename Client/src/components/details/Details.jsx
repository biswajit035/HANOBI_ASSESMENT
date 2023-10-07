/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./details.css";
import { toast } from "react-toastify";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import loader from "../../assets/lotties/loading.json";
import Lottie from "react-lottie";

const Details = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loader,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const [loading, setLoading] = useState(true);
  const [editablle, setEditablle] = useState(true);
  const [respData, setRespData] = useState({});
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    contact: "",
    dob: "",
  });

  const handleSubmit = async () => {
    // edit user
    if (
      respData.fName &&
      respData.lName &&
      respData.email &&
      respData.contact &&
      respData.dob
    ) {
      const updateResponse = await fetch(
        `${import.meta.env.VITE_BACKEN_URL}user`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: username,
            firstName: formData.fName,
            lastName: formData.lName,
            email: formData.email,
            mobile: formData.contact,
            dob: formData.dob,
          }),
        }
      );

      if (updateResponse.status == 200) {
        const updatedData = await updateResponse.json();
        if (updatedData.status == 201) toast.success(updatedData.msg);
        navigate("/success");
      }
    }

    // create user
    else if (
      formData.fName &&
      formData.lName &&
      formData.email &&
      formData.contact &&
      formData.dob
    ) {
      const response = await fetch(`${import.meta.env.VITE_BACKEN_URL}user`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: username,
          firstName: formData.fName,
          lastName: formData.lName,
          email: formData.email,
          mobile: formData.contact,
          dob: formData.dob,
        }),
      });

      if (response.status == 201) {
        const data = await response.json();
        if (data.status == 201) toast.success(data.msg);
        navigate("/success");
      }
    } else {
      toast.warn("Fill all the field first");
    }
  };

  function areObjectsEqual(obj1, obj2) {
    for (const key in obj1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
    return true;
  }

  function handlleEditable(name, value) {
    const data = respData[name];

    const isEqual = areObjectsEqual(formData, respData);
  }

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    handlleEditable(name, value);
    setFormData({ ...formData, [name]: value });
  };

  async function fetchData() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEN_URL}user/${username}`
      );

      if (response.status == 404) {
        toast.warn("User Not found");
        
        throw new Error("Network response was not ok");
      }
      if (response.status == 200) {
        const data = await response.json();
        const { firstName, lastName, email, mobile, dob } = data;
        setFormData({
          fName: firstName,
          lName: lastName,
          email: email,
          contact: mobile,
          dob: data.dob,
        });
        setRespData({
          fName: firstName,
          lName: lastName,
          email: email,
          contact: mobile,
          dob: data.dob,
        });
        setEditablle(false);
      }
    } catch (error) {
      console.log("error in fetching");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (areObjectsEqual(formData, respData)) setEditablle(false);
    else setEditablle(true);
  }, [formData, respData]);

  return (
    <div className="details">
      {loading ? (
        <Lottie options={defaultOptions} height={400} width={400} />
      ) : (
        <form className="form" method="post">
          <p className="title">Details </p>
          <div className="flex">
            <label>
              <input
                required
                placeholder=""
                type="text"
                className="input"
                name="fName"
                onChange={handleChange}
                value={formData.fName}
              />
              <span>Firstname</span>
            </label>

            <label>
              <input
                required=""
                placeholder=""
                type="text"
                className="input"
                name="lName"
                onChange={handleChange}
                value={formData.lName}
              />
              <span>Lastname</span>
            </label>
          </div>

          <label>
            <input
              required=""
              placeholder=""
              type="email"
              className="input"
              name="email"
              onChange={handleChange}
              value={formData.email}
            />
            <span>Email</span>
          </label>

          <label>
            <input
              required="fil it"
              placeholder=""
              type="number"
              className="input"
              name="contact"
              onChange={handleChange}
              value={formData.contact}
            />
            <span>Contact Number</span>
          </label>
          <label>
            <input
              required=""
              placeholder=""
              type="date"
              className="input"
              name="dob"
              onChange={handleChange}
              value={formData.dob}
            />
            <span>Date of Birth</span>
          </label>
          {editablle && (
            <div
              className="submit"
              onClick={() => {
                handleSubmit();
              }}
            >
              {respData.email ? "Edit" : "Submit"}
            </div>
          )}
          <button
            className="submit"
            onClick={() => {
              navigate("/");
            }}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default Details;
