import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MARKET } from "../config/market.vn";

export default function ConsentDocument() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isChecked, setIsChecked] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);

  useEffect(() => {
    if (location.state?.registrationData) {
      setRegistrationData(location.state.registrationData);
    } else {
      navigate("/register");
    }
  }, [location, navigate]);

  const handleContinue = () => {
    if (isChecked && registrationData) {
      navigate("/register", {
        state: { registrationData, consentAccepted: true },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <div className="max-w-4xl w-full bg-white p-10 rounded-2xl shadow-xl border border-gray-200">
        <h1 className="text-4xl font-bold text-center mb-2 tracking-tight text-gray-900">
          Điều khoản & Quyền riêng tư
        </h1>
        <p className="text-center text-gray-600 mb-8">{MARKET.tagline}</p>

        <div className="space-y-6 text-gray-800 leading-relaxed max-h-[65vh] overflow-y-auto pr-4">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Giới thiệu</h2>
            <p>
              {MARKET.appName} là ứng dụng <strong>hỗ trợ theo dõi sức khỏe</strong> dành cho{" "}
              <strong>sinh viên và người trẻ tại Việt Nam</strong>. Ứng dụng giúp bạn ghi nhật ký
              hằng ngày, theo dõi triệu chứng, nhắc uống thuốc, gợi ý thực đơn Việt Nam và trò
              chuyện với trợ lý AI — <strong>không thay thế bác sĩ hay cơ sở y tế</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. AI & dữ liệu</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Kết quả AI (triệu chứng, thực đơn, chat) chỉ mang tính tham khảo.</li>
              <li>Ưu tiên gợi ý phù hợp lối sống sinh viên: học đêm, căng thẳng, ăn uống không đều.</li>
              <li>Ảnh/triệu chứng bạn tải lên được dùng để phân tích trong phạm vi dịch vụ.</li>
              <li>Chúng tôi không bán dữ liệu cá nhân cho bên thứ ba.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. Dữ liệu thu thập</h2>
            <p className="mb-2"><strong>Có thể thu thập:</strong> hồ sơ cơ bản, nhật ký sức khỏe, triệu chứng, ảnh bạn chọn tải, lịch thuốc, lịch sử chat.</p>
            <p><strong>Không thu thập:</strong> CCCD/chứng minh, tài khoản ngân hàng, danh bạ, vị trí GPS liên tục.</p>
          </section>

          <section className="border-l-4 border-red-500 bg-red-50 p-5 rounded-lg">
            <h2 className="text-xl font-bold text-red-700 mb-2">4. Cảnh báo y tế quan trọng</h2>
            <p className="text-red-800 font-medium mb-2">
              Khi có dấu hiệu nguy hiểm, hãy gọi 115 hoặc đến cơ sở y tế ngay — không chỉ dựa vào app.
            </p>
            <ul className="list-disc pl-6 text-red-800 space-y-1">
              <li>Đau ngực, khó thở, choáng váng nặng</li>
              <li>Sốt cao kéo dài, co giật</li>
              <li>Chảy máu bất thường, ý thức lơ mơ</li>
              <li>Dấu hiệu đột quỵ (méo miệng, yếu liệt một bên…)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. Trách nhiệm người dùng</h2>
            <p>
              Bạn đồng ý sử dụng app một cách có trách nhiệm; quyết định điều trị thuộc về bạn và
              bác sĩ. Thông tin trường đại học (nếu có) chỉ nhằm cá nhân hóa gợi ý, không phải hồ sơ
              chính thức của nhà trường.
            </p>
          </section>
        </div>

        <div className="mt-8 border-t pt-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="h-5 w-5 rounded border-gray-400 mt-0.5"
            />
            <span className="text-sm text-gray-700 leading-relaxed">
              Tôi đã đọc và đồng ý với điều khoản trên. Tôi hiểu app không thay thế tư vấn y tế
              chuyên môn.
            </span>
          </label>
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={handleContinue}
            disabled={!isChecked}
            className={
              isChecked
                ? "flex w-full justify-center rounded-lg bg-[var(--saffron)] px-3 py-3 text-lg font-semibold text-white shadow-lg hover:bg-[var(--saffron-light)] hover:text-gray-900 transition"
                : "flex w-full justify-center rounded-lg bg-gray-300 px-3 py-3 text-lg font-semibold text-gray-500 cursor-not-allowed"
            }
          >
            Đồng ý & Tiếp tục đăng ký
          </button>
        </div>
      </div>
    </div>
  );
}
