import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../CreateSlice/AuthSlice.jsx";
export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

  const onSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      loginUser({
        email,
        password,
      }),
    );

    if (loginUser.fulfilled.match(result)) {
      toast.success(result.payload.message);

      navigate("/");
    } else {
      toast.error(result.payload?.message || "Login Failed");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #141E30, #243B55)",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7 col-sm-10">
            <div
              className="card border-0 shadow-lg rounded-4"
              style={{ background: "#ffffff" }}
            >
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold">Login Account</h2>
                </div>

                <form onSubmit={onSubmit}>
                  {/* Email */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Email</label>

                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  {/* Password */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Password</label>

                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary btn-lg w-100"
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>
                        Creating...
                      </>
                    ) : (
                      "Login "
                    )}
                  </button>
                </form>

                <hr className="my-4" />

                <p className="text-center mb-0">
                  you dont have an account?{" "}
                  <Link
                    to="/register"
                    className="text-decoration-none fw-semibold"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
