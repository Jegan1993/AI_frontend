import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../CreateSlice/AuthSlice.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  // Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  // Formik Hook
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const result = await dispatch(
        loginUser({
          email: values.email,
          password: values.password,
        }),
      );

      if (loginUser.fulfilled.match(result)) {
        toast.success(result.payload.message);
        if (values.remember) {
          localStorage.setItem("rememberMe", "true");
        }
        navigate("/");
      } else {
        toast.error(result.payload?.message || "Login failed");
      }
    },
  });

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "20px",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7 col-sm-10">
            <div
              className="card border-0 shadow-lg"
              style={{
                borderRadius: "40px",
                overflow: "hidden",
                backgroundColor: "rgba(255, 255, 255, 0.98)",
                backdropFilter: "blur(20px)",
                animation: "slideUp 0.6s ease-out",
                boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
              }}
            >
              {/* CRM Logo Header */}
              <div className="text-center pt-4 pb-2">
                <div className="d-flex align-items-center justify-content-center gap-3">
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: "60px",
                      height: "60px",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      borderRadius: "16px",
                      boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
                      transform: "rotate(-3deg)",
                    }}
                  >
                    <i
                      className="bi bi-building text-white"
                      style={{ fontSize: "2rem" }}
                    ></i>
                  </div>
                  <div className="text-start">
                    <h3 className="fw-bold mb-0" style={{ color: "#2d3748" }}>
                      <span style={{ color: "#667eea" }}>CRM</span>
                      <span style={{ color: "#764ba2" }}>Hub</span>
                    </h3>
                    <p
                      className="text-muted small mb-0"
                      style={{ fontSize: "0.75rem" }}
                    >
                      <i className="bi bi-box-arrow-in-right me-1"></i>
                      Welcome Back!
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="mx-4"
                style={{
                  height: "2px",
                  background:
                    "linear-gradient(90deg, transparent, #667eea, #764ba2, transparent)",
                  opacity: "0.3",
                }}
              ></div>

              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <h4 className="fw-bold mb-1" style={{ color: "#2d3748" }}>
                    Welcome Back
                  </h4>
                  <p className="text-muted small">
                    Sign in to manage your customers
                  </p>
                </div>

                <form onSubmit={formik.handleSubmit}>
                  {/* Email Field */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold small text-secondary">
                      <i className="bi bi-envelope me-1"></i> Email Address
                    </label>
                    <input
                      type="email"
                      className={`form-control ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
                      placeholder="your@email.com"
                      {...formik.getFieldProps("email")}
                      style={{
                        borderRadius: "16px",
                        border: "2px solid #e2e8f0",
                        padding: "12px 16px",
                        transition: "all 0.3s ease",
                        fontSize: "0.95rem",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#667eea";
                        e.target.style.boxShadow =
                          "0 0 0 4px rgba(102, 126, 234, 0.1)";
                      }}
                      onBlur={(e) => {
                        if (!formik.errors.email) {
                          e.target.style.borderColor = "#e2e8f0";
                          e.target.style.boxShadow = "none";
                        }
                      }}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div
                        className="invalid-feedback d-block"
                        style={{ fontSize: "0.8rem" }}
                      >
                        <i className="bi bi-exclamation-circle me-1"></i>
                        {formik.errors.email}
                      </div>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <label className="form-label fw-semibold small text-secondary">
                        <i className="bi bi-lock me-1"></i> Password
                      </label>
                      {/* <Link
                        to="/forgot-password"
                        className="text-decoration-none small"
                        style={{ color: "#667eea" }}
                      >
                        Forgot Password?
                      </Link> */}
                    </div>
                    <div className="position-relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`form-control ${formik.touched.password && formik.errors.password ? "is-invalid" : ""}`}
                        placeholder="Enter your password"
                        {...formik.getFieldProps("password")}
                        style={{
                          borderRadius: "16px",
                          border: "2px solid #e2e8f0",
                          padding: "12px 16px",
                          paddingRight: "45px",
                          transition: "all 0.3s ease",
                          fontSize: "0.95rem",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#667eea";
                          e.target.style.boxShadow =
                            "0 0 0 4px rgba(102, 126, 234, 0.1)";
                        }}
                        onBlur={(e) => {
                          if (!formik.errors.password) {
                            e.target.style.borderColor = "#e2e8f0";
                            e.target.style.boxShadow = "none";
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="btn position-absolute top-50 translate-middle-y"
                        style={{
                          right: "8px",
                          background: "transparent",
                          border: "none",
                          color: "#a0aec0",
                        }}
                      >
                        <i
                          className={`bi bi-${showPassword ? "eye-slash" : "eye"}`}
                        ></i>
                      </button>
                      {formik.touched.password && formik.errors.password && (
                        <div
                          className="invalid-feedback d-block"
                          style={{ fontSize: "0.8rem" }}
                        >
                          <i className="bi bi-exclamation-circle me-1"></i>
                          {formik.errors.password}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Remember Me Checkbox */}
                  <div className="mb-4 d-flex align-items-center">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="remember"
                      {...formik.getFieldProps("remember")}
                      style={{
                        width: "18px",
                        height: "18px",
                        cursor: "pointer",
                        border: "2px solid #e2e8f0",
                        borderRadius: "6px",
                      }}
                    />
                    <label
                      className="form-check-label ms-2 small text-secondary"
                      htmlFor="remember"
                      style={{ cursor: "pointer" }}
                    >
                      Remember me
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn w-100 py-3 fw-semibold"
                    style={{
                      borderRadius: "16px",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      border: "none",
                      color: "white",
                      fontSize: "1rem",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow =
                        "0 8px 25px rgba(102, 126, 234, 0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow =
                        "0 4px 15px rgba(102, 126, 234, 0.4)";
                    }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Signing In...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        Sign In
                      </>
                    )}
                  </button>
                </form>

                <div className="d-flex align-items-center my-4">
                  <hr className="flex-grow-1" />
                  <span className="px-3 text-muted small">
                    or continue with
                  </span>
                  <hr className="flex-grow-1" />
                </div>

                <div className="d-flex justify-content-center gap-3 mb-3">
                  <button
                    className="btn btn-outline-secondary rounded-circle p-0 d-flex align-items-center justify-content-center"
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50% !important",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = "#667eea";
                      e.target.style.color = "#667eea";
                      e.target.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = "#dee2e6";
                      e.target.style.color = "#6c757d";
                      e.target.style.transform = "translateY(0)";
                    }}
                  >
                    <i className="bi bi-google"></i>
                  </button>
                  <button
                    className="btn btn-outline-secondary rounded-circle p-0 d-flex align-items-center justify-content-center"
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50% !important",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = "#333";
                      e.target.style.color = "#333";
                      e.target.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = "#dee2e6";
                      e.target.style.color = "#6c757d";
                      e.target.style.transform = "translateY(0)";
                    }}
                  >
                    <i className="bi bi-github"></i>
                  </button>
                  <button
                    className="btn btn-outline-secondary rounded-circle p-0 d-flex align-items-center justify-content-center"
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50% !important",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = "#1877f2";
                      e.target.style.color = "#1877f2";
                      e.target.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = "#dee2e6";
                      e.target.style.color = "#6c757d";
                      e.target.style.transform = "translateY(0)";
                    }}
                  >
                    <i className="bi bi-facebook"></i>
                  </button>
                </div>

                <p className="text-center mb-0 small">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="fw-semibold text-decoration-none"
                    style={{ color: "#667eea" }}
                    onMouseEnter={(e) => (e.target.style.color = "#764ba2")}
                    onMouseLeave={(e) => (e.target.style.color = "#667eea")}
                  >
                    <i className="bi bi-person-plus me-1"></i>
                    Create Account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
