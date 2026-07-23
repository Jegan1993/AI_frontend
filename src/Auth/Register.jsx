import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../CreateSlice/AuthSlice.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  // Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name cannot exceed 50 characters")
      .required("name is required")
      .matches(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces"),
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase, one lowercase, and one number",
      )
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const result = await dispatch(
        registerUser({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      );

      if (registerUser.fulfilled.match(result)) {
        toast.success(result.payload.message);
        navigate("/login");
      } else {
        toast.error(result.payload?.message || "Registration failed");
      }
    },
  });

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Circles */}
      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.05)",
          top: "-100px",
          right: "-100px",
          animation: "float 6s ease-in-out infinite",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.05)",
          bottom: "-50px",
          left: "-50px",
          animation: "float 8s ease-in-out infinite reverse",
        }}
      ></div>

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
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Decorative Top Bar */}
              <div
                style={{
                  height: "5px",
                  background:
                    "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                }}
              ></div>

              <div className="card-body p-4 p-md-5">
                {/* Logo Section */}
                <div className="text-center mb-4">
                  <div
                    className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: "70px",
                      height: "70px",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      borderRadius: "20px",
                      boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)",
                      transition: "transform 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform =
                        "scale(1.05) rotate(-5deg)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1) rotate(0deg)";
                    }}
                  >
                    <i
                      className="bi bi-person-plus-fill text-white"
                      style={{ fontSize: "2rem" }}
                    ></i>
                  </div>

                  <h2 className="fw-bold mb-1" style={{ color: "#2d3748" }}>
                    Create Account
                  </h2>
                  <p className="text-muted small">
                    Join us and start your journey
                  </p>
                </div>

                <form onSubmit={formik.handleSubmit}>
                  {/* Name Field */}
                  <div className="mb-3">
                    <label
                      className="form-label fw-semibold small"
                      style={{ color: "#4a5568" }}
                    >
                      <i className="bi bi-person me-1"></i> Full Name
                    </label>
                    <input
                      type="text"
                      className={`form-control form-control-lg ${
                        formik.touched.name && formik.errors.name
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Enter your full name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="name"
                      style={{
                        borderRadius: "14px",
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
                      onBlurCapture={(e) => {
                        if (!formik.errors.name) {
                          e.target.style.borderColor = "#e2e8f0";
                          e.target.style.boxShadow = "none";
                        }
                      }}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div
                        className="invalid-feedback d-block"
                        style={{ fontSize: "0.85rem", marginTop: "5px" }}
                      >
                        {formik.errors.name}
                      </div>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="mb-3">
                    <label
                      className="form-label fw-semibold small"
                      style={{ color: "#4a5568" }}
                    >
                      <i className="bi bi-envelope me-1"></i> Email Address
                    </label>
                    <input
                      type="email"
                      className={`form-control form-control-lg ${
                        formik.touched.email && formik.errors.email
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Enter your email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="email"
                      style={{
                        borderRadius: "14px",
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
                      onBlurCapture={(e) => {
                        if (!formik.errors.email) {
                          e.target.style.borderColor = "#e2e8f0";
                          e.target.style.boxShadow = "none";
                        }
                      }}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div
                        className="invalid-feedback d-block"
                        style={{ fontSize: "0.85rem", marginTop: "5px" }}
                      >
                        {formik.errors.email}
                      </div>
                    )}
                  </div>

                  {/* Password Field with Show/Hide */}
                  <div className="mb-4">
                    <label
                      className="form-label fw-semibold small"
                      style={{ color: "#4a5568" }}
                    >
                      <i className="bi bi-lock me-1"></i> Password
                    </label>
                    <div className="position-relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`form-control form-control-lg ${
                          formik.touched.password && formik.errors.password
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder="Create a strong password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="password"
                        style={{
                          borderRadius: "14px",
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
                        onBlurCapture={(e) => {
                          if (!formik.errors.password) {
                            e.target.style.borderColor = "#e2e8f0";
                            e.target.style.boxShadow = "none";
                          }
                        }}
                      />

                      {/* Show/Hide Password Button - Using Bootstrap Icons */}
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="btn position-absolute top-50 translate-middle-y"
                        style={{
                          right: "8px",
                          background: "transparent",
                          border: "none",
                          color: "#a0aec0",
                          padding: "5px",
                          transition: "color 0.3s ease",
                          cursor: "pointer",
                          zIndex: 10,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#667eea";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "#a0aec0";
                        }}
                      >
                        {showPassword ? (
                          <i
                            className="bi bi-eye-slash"
                            style={{ fontSize: "1.3rem" }}
                          ></i>
                        ) : (
                          <i
                            className="bi bi-eye"
                            style={{ fontSize: "1.3rem" }}
                          ></i>
                        )}
                      </button>
                    </div>

                    {formik.touched.password && formik.errors.password && (
                      <div
                        className="invalid-feedback d-block"
                        style={{ fontSize: "0.85rem", marginTop: "5px" }}
                      >
                        {formik.errors.password}
                      </div>
                    )}

                    {!formik.errors.password &&
                      formik.touched.password &&
                      formik.values.password && (
                        <div
                          className="valid-feedback d-block"
                          style={{
                            fontSize: "0.85rem",
                            color: "#28a745",
                            marginTop: "5px",
                          }}
                        >
                          <i className="bi bi-check-circle me-1"></i>
                          Strong password!
                        </div>
                      )}

                    {/* Password Strength Indicator */}
                    {formik.values.password && (
                      <div
                        style={{
                          height: "4px",
                          borderRadius: "2px",
                          marginTop: "8px",
                          background:
                            formik.values.password.length >= 8
                              ? "linear-gradient(90deg, #28a745, #28a745)"
                              : formik.values.password.length >= 5
                                ? "linear-gradient(90deg, #ffc107, #ffc107)"
                                : "linear-gradient(90deg, #dc3545, #dc3545)",
                          width:
                            formik.values.password.length >= 8
                              ? "100%"
                              : formik.values.password.length >= 5
                                ? "60%"
                                : "30%",
                          transition: "all 0.3s ease",
                        }}
                      ></div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn w-100 py-3 fw-semibold"
                    style={{
                      borderRadius: "14px",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      border: "none",
                      color: "white",
                      fontSize: "1rem",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 25px rgba(102, 126, 234, 0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 15px rgba(102, 126, 234, 0.4)";
                    }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-person-plus me-2"></i>
                        Create Account
                      </>
                    )}
                  </button>
                </form>

                <div className="d-flex align-items-center my-4">
                  <hr
                    className="flex-grow-1"
                    style={{ borderColor: "#e2e8f0" }}
                  />
                  <span
                    className="px-3 text-muted small"
                    style={{ fontSize: "0.8rem" }}
                  >
                    or continue with
                  </span>
                  <hr
                    className="flex-grow-1"
                    style={{ borderColor: "#e2e8f0" }}
                  />
                </div>

                {/* Social Login Buttons */}
                <div className="d-flex justify-content-center gap-3 mb-3">
                  <button
                    className="btn btn-outline-secondary rounded-circle p-0 d-flex align-items-center justify-content-center"
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50% !important",
                      border: "2px solid #e2e8f0",
                      transition: "all 0.3s ease",
                      color: "#4a5568",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#667eea";
                      e.currentTarget.style.color = "#667eea";
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 12px rgba(102, 126, 234, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#e2e8f0";
                      e.currentTarget.style.color = "#4a5568";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <i
                      className="bi bi-google"
                      style={{ fontSize: "1.1rem" }}
                    ></i>
                  </button>
                  <button
                    className="btn btn-outline-secondary rounded-circle p-0 d-flex align-items-center justify-content-center"
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50% !important",
                      border: "2px solid #e2e8f0",
                      transition: "all 0.3s ease",
                      color: "#4a5568",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#333";
                      e.currentTarget.style.color = "#333";
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 12px rgba(0,0,0,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#e2e8f0";
                      e.currentTarget.style.color = "#4a5568";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <i
                      className="bi bi-github"
                      style={{ fontSize: "1.1rem" }}
                    ></i>
                  </button>
                  <button
                    className="btn btn-outline-secondary rounded-circle p-0 d-flex align-items-center justify-content-center"
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50% !important",
                      border: "2px solid #e2e8f0",
                      transition: "all 0.3s ease",
                      color: "#4a5568",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#1877f2";
                      e.currentTarget.style.color = "#1877f2";
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 12px rgba(24, 119, 242, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#e2e8f0";
                      e.currentTarget.style.color = "#4a5568";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <i
                      className="bi bi-facebook"
                      style={{ fontSize: "1.1rem" }}
                    ></i>
                  </button>
                </div>

                {/* Login Link */}
                <p
                  className="text-center mb-0 small"
                  style={{ color: "#4a5568" }}
                >
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="fw-semibold text-decoration-none"
                    style={{
                      color: "#667eea",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#764ba2";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#667eea";
                    }}
                  >
                    <i className="bi bi-box-arrow-in-right me-1"></i>
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
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

        @keyframes float {
          0% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-20px, -20px) scale(1.1);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }

        .form-control:focus {
          border-color: #667eea !important;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1) !important;
        }

        .form-control.is-invalid {
          border-color: #dc3545 !important;
        }

        .form-control.is-invalid:focus {
          box-shadow: 0 0 0 4px rgba(220, 53, 69, 0.1) !important;
        }

        .invalid-feedback {
          color: #dc3545;
        }

        .valid-feedback {
          color: #28a745;
        }

        /* Ensure the eye icon is visible */
        .bi-eye, .bi-eye-slash {
          font-size: 1.3rem !important;
        }
      `}</style>
    </div>
  );
}
