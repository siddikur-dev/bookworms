import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const instance = axios.create({
  baseURL: "http://localhost:5000",
});
const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const requestInterCeptors = instance.interceptors.request.use((config) => {
      if (user || user?.accessToken) {
        config.headers.authorization = `Bearer ${user?.accessToken}`;
      }
      return config;
    });
    const responseInterCeptors = instance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        console.log(err);
        const status = err.status;
        if (status === 401 || status === 403) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "আকাম করস ক্যান? ",
            showConfirmButton: false,
            timer: 1500,
          });
          signOutUser()
            .then(() => {
              navigate("/login");
            })
            .catch((err) => console.log(err));
        }
      }
    );
    return () => {
      instance.interceptors.request.eject(requestInterCeptors);
      instance.interceptors.response.eject(responseInterCeptors);
    };
  }, [user, navigate, signOutUser]);
  return instance;
};
export default useAxiosSecure;
