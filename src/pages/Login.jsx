import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { loginUser } from "../services/authService";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { user, token } = await loginUser({ email, password });
      login(user, token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white text-gray-800">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#F7D567] rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#B3CDE0] rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-[#F4C430] opacity-20 rounded-full blur-3xl"></div>
      </div>

      <main className="relative flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="glassmorphic rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Chào mừng trở lại</h2>
              <p className="mt-2 text-gray-600">Đăng nhập để tiếp tục hành trình chăm sóc sức khỏe.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Địa chỉ Email"
                className="form-input block w-full rounded-lg border-transparent bg-white/70 py-3 px-4 text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-[#F4C430] transition"
              />
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Mật khẩu"
                className="form-input block w-full rounded-lg border-transparent bg-white/70 py-3 px-4 text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-[#F4C430] transition"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="flex justify-between text-sm">
                <a href="#" className="font-semibold text-gray-700 hover:text-[#F4C430]">
                  Quên mật khẩu?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-lg bg-[#F4C430] px-3 py-3 text-sm font-semibold leading-6 text-white shadow-lg hover:bg-[#F7D567] hover:text-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4C430] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-600">
              Chưa có tài khoản?{" "}
              <a href="/register" className="font-semibold text-gray-700 hover:text-[#F4C430]">
                Đăng ký ngay
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
