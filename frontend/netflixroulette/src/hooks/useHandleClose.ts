import { useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();
  return () => navigate(-1);
};
