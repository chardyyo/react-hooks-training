import {
  createSearchParams,
  URLSearchParamsInit,
  useNavigate,
} from "react-router-dom";

export default () => {
  const navigate = useNavigate();

  return (searchParams: URLSearchParamsInit) => {
    navigate(`?${createSearchParams(searchParams)}`);
  };
};
