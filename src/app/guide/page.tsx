"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GuidePage() {
  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>Hướng dẫn sử dụng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-2">
                1. Dashboard - Bảng điều khiển
              </h2>
              <p className="text-muted-foreground">
                Đây là trang tổng quan, nơi bạn có thể xem nhanh các thông tin
                quan trọng về tình hình chấm công của mình trong tháng. Các
                thông tin bao gồm:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Thống kê tổng số ngày làm việc, số ngày nghỉ.</li>
                <li>Biểu đồ trực quan thể hiện tỷ lệ chuyên cần.</li>
                <li>Thông báo về các ca làm việc sắp tới.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">
                2. Lịch sử điểm danh
              </h2>
              <p className="text-muted-foreground">
                Trang này cho phép bạn xem lại chi tiết lịch sử các lần chấm
                công của mình. Bạn có thể:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  Xem chi tiết từng lần chấm công: thời gian check-in, check-out
                  và địa điểm.
                </li>
                <li>
                  Sử dụng bộ lọc theo khoảng thời gian để dễ dàng tra cứu lại
                  các ngày cụ thể.
                </li>
                <li>
                  Theo dõi trạng thái của mỗi lần chấm công (hợp lệ, không hợp
                  lệ).
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">
                3. Địa chỉ làm việc
              </h2>
              <p className="text-muted-foreground">
                Tại đây, bạn có thể xem danh sách các địa chỉ làm việc đã được
                đăng ký trong hệ thống. Đây là các địa điểm hợp lệ để thực hiện
                chấm công.
              </p>
              <p className="mt-2">
                <span className="font-semibold">Lưu ý:</span> Bạn chỉ có thể xem
                thông tin tại trang này. Nếu có nhu cầu cập nhật, thêm mới hoặc
                xóa địa chỉ làm việc, vui lòng liên hệ bộ phận Nhân sự để được
                hỗ trợ.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">4. Hỗ trợ</h2>
              <p className="text-muted-foreground">
                Nếu bạn gặp bất kỳ sự cố kỹ thuật nào hoặc có thắc mắc trong quá
                trình sử dụng, vui lòng liên hệ bộ phận IT để nhận được sự trợ
                giúp kịp thời.
              </p>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
