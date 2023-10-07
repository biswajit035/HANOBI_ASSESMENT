import "./success.css";
import Lottie from "react-lottie";
import success from "../../assets/lotties/success.json";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: success,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="container">
      <div className="success">
        You have successfuly created
        <Lottie options={defaultOptions} height={400} width={400} />
        <button
          className="submit"
          onClick={() => {
            navigate("/");
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Success;
