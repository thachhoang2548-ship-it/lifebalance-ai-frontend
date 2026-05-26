import { useState, useContext, useEffect, useRef } from "react";
import AuthContext from "../contexts/AuthContext";
import { registerUser } from "../services/authService";
import { useNavigate, useLocation } from "react-router-dom";
import { MARKET, DIET_TYPES, USER_TYPES, COMMON_STUDENT_CONDITIONS } from "../config/market.vn";

export default function Register() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const registrationAttempted = useRef(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    diseaseTags: "",
    dietType: "balanced",
    userType: "student",
    university: "",
    major: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state?.consentAccepted && location.state?.registrationData && !registrationAttempted.current) {
      registrationAttempted.current = true;
      completeRegistration(location.state.registrationData);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    registrationAttempted.current = false;

    if (form.password !== form.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    navigate("/consent", { state: { registrationData: form } });
  };

  const completeRegistration = async (registrationData) => {
    setLoading(true);
    setError("");

    try {
      const dataToSend = {
        ...registrationData,
        diseaseTags: registrationData.diseaseTags
          ? registrationData.diseaseTags.split(",").map((d) => d.trim())
          : [],
      };
      const { user, token } = await registerUser(dataToSend);
      login(user, token);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Đăng ký thất bại");
      setLoading(false);
      registrationAttempted.current = false;
    }
  };

  const isStudent = form.userType === "student";

  return (
    <div className="bg-white text-gray-800 min-h-screen relative overflow-hidden">
      {loading && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[var(--saffron)] mx-auto mb-4"></div>
            <p className="text-lg font-semibold">Đang hoàn tất đăng ký...</p>
          </div>
        </div>
      )}

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[var(--saffron-light)] rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-100 rounded-full opacity-50 blur-3xl"></div>
      </div>

      <main className="relative flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-lg space-y-6">
          <div className="glassmorphic rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Đăng ký</h2>
              <p className="mt-2 text-gray-600">{MARKET.tagline}</p>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded">
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Họ và tên *"
                value={form.name}
                onChange={handleChange}
                required
                className="form-input block w-full rounded-lg border-transparent bg-white/70 py-3 px-4 focus:ring-2 focus:ring-[var(--saffron)]"
              />
              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={form.email}
                onChange={handleChange}
                required
                className="form-input block w-full rounded-lg border-transparent bg-white/70 py-3 px-4 focus:ring-2 focus:ring-[var(--saffron)]"
              />
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder={MARKET.phonePlaceholder}
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="form-input block w-full rounded-lg border-transparent bg-white/70 py-3 px-4 focus:ring-2 focus:ring-[var(--saffron)]"
                />
                <p className="text-xs text-gray-500 mt-1">{MARKET.phoneHint}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="password"
                  name="password"
                  placeholder="Mật khẩu *"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="form-input block w-full rounded-lg border-transparent bg-white/70 py-3 px-4 focus:ring-2 focus:ring-[var(--saffron)]"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Nhập lại mật khẩu *"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className="form-input block w-full rounded-lg border-transparent bg-white/70 py-3 px-4 focus:ring-2 focus:ring-[var(--saffron)]"
                />
              </div>

              <select
                name="userType"
                value={form.userType}
                onChange={handleChange}
                className="form-select block w-full rounded-lg border-transparent bg-white/70 py-3 px-4 focus:ring-2 focus:ring-[var(--saffron)]"
              >
                {USER_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>

              {isStudent && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="university"
                    placeholder="Trường (vd: ĐH FPT, ĐH Y Dược...)"
                    value={form.university}
                    onChange={handleChange}
                    className="form-input block w-full rounded-lg border-transparent bg-white/70 py-3 px-4 focus:ring-2 focus:ring-[var(--saffron)]"
                  />
                  <input
                    type="text"
                    name="major"
                    placeholder="Ngành học (tuỳ chọn)"
                    value={form.major}
                    onChange={handleChange}
                    className="form-input block w-full rounded-lg border-transparent bg-white/70 py-3 px-4 focus:ring-2 focus:ring-[var(--saffron)]"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="number"
                  name="age"
                  placeholder="Tuổi *"
                  value={form.age}
                  onChange={handleChange}
                  required
                  min={16}
                  max={35}
                  className="form-input block w-full rounded-lg border-transparent bg-white/70 py-3 px-4 focus:ring-2 focus:ring-[var(--saffron)]"
                />
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  required
                  className="form-select block w-full rounded-lg border-transparent bg-white/70 py-3 px-4 focus:ring-2 focus:ring-[var(--saffron)]"
                >
                  <option value="">Giới tính *</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
                <input
                  type="number"
                  name="height"
                  placeholder="Chiều cao (cm) *"
                  value={form.height}
                  onChange={handleChange}
                  required
                  className="form-input block w-full rounded-lg border-transparent bg-white/70 py-3 px-4 focus:ring-2 focus:ring-[var(--saffron)]"
                />
                <input
                  type="number"
                  name="weight"
                  placeholder="Cân nặng (kg) *"
                  value={form.weight}
                  onChange={handleChange}
                  required
                  className="form-input block w-full rounded-lg border-transparent bg-white/70 py-3 px-4 focus:ring-2 focus:ring-[var(--saffron)]"
                />
              </div>

              <input
                type="text"
                name="diseaseTags"
                placeholder={`Bệnh nền (cách nhau bằng dấu phẩy). Gợi ý: ${COMMON_STUDENT_CONDITIONS.slice(0, 3).join(", ")}...`}
                value={form.diseaseTags}
                onChange={handleChange}
                className="form-input block w-full rounded-lg border-transparent bg-white/70 py-3 px-4 focus:ring-2 focus:ring-[var(--saffron)]"
              />

              <select
                name="dietType"
                value={form.dietType}
                onChange={handleChange}
                required
                className="form-select block w-full rounded-lg border-transparent bg-white/70 py-3 px-4 focus:ring-2 focus:ring-[var(--saffron)]"
              >
                {DIET_TYPES.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="flex w-full justify-center rounded-lg bg-[var(--saffron)] px-3 py-3 text-sm font-semibold text-white shadow-lg hover:bg-[var(--saffron-light)] hover:text-gray-900 transition"
              >
                Tiếp theo — Điều khoản
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Đã có tài khoản?{" "}
              <a href="/login" className="font-semibold text-[var(--saffron)] hover:underline">
                Đăng nhập
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
