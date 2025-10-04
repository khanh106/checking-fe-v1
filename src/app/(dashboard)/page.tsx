"use client";
import {
  Line,
  LineChart,
  Pie,
  PieChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

const chartData = [
  { date: "01/10", checkin: 8.42, checkout: 17.67 },
  { date: "02/10", checkin: 8.75, checkout: 17.5 },
  { date: "03/10", checkin: 8.5, checkout: 17.5 },
  { date: "04/10", checkin: 8.33, checkout: 17.55 },
  { date: "05/10", checkin: 8.6, checkout: 17.4 },
];

const chartConfig = {
  checkin: {
    label: "Giờ vào",
    color: "#2563eb",
  },
  checkout: {
    label: "Giờ ra",
    color: "#60a5fa",
  },
};

//biểu đồ tròn
const pieData = [
  { name: "Đúng giờ", value: 18 },
  { name: "Đi trễ", value: 4 },
];

const pieConfig = {
  "Đúng giờ": {
    label: "Đúng giờ",
    color: "#22c55e",
  },
  "Đi trễ": {
    label: "Đi trễ",
    color: "#ef4444",
  },
};
export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Tổng quan về hệ thống điểm danh</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">
              Tổng số ngày làm việc
            </h3>
          </div>
          <div>
            <div className="text-2xl font-bold">22</div>
            <p className="text-xs text-muted-foreground">
              +2 so với tháng trước
            </p>
          </div>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">
              Điểm danh hôm nay
            </h3>
          </div>
          <div>
            <div className="text-2xl font-bold">Đã điểm danh</div>
            <p className="text-xs text-muted-foreground">08:30 - 17:30</p>
          </div>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">
              Báo cáo đi làm
            </h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Đúng giờ</p>
              <p className="text-lg font-bold">18</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-red-500">Đi trễ</p>
              <p className="text-lg font-bold text-red-500">4</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">
              Địa chỉ làm việc
            </h3>
          </div>
          <div>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Địa chỉ đã đăng ký</p>
          </div>
        </div>
      </div>

      {/* Thay thế code bảng bằng code này */}
      {/* Bắt đầu thay thế từ đây */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Cột 1: Biểu đồ đường hiện tại */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-medium">Thống kê giờ làm việc</h3>
            <p className="text-sm text-muted-foreground">
              Biểu đồ thống kê giờ vào/ra trong 5 ngày gần nhất.
            </p>
          </div>
          <div className="p-6 pt-0">
            <ChartContainer
              config={chartConfig}
              debounce={300}
              className="h-[350px] w-full"
            >
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickFormatter={(value) => `${value}h`}
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend />
                <Line
                  dataKey="checkin"
                  type="monotone"
                  stroke={chartConfig.checkin.color}
                  strokeWidth={2}
                />
                <Line
                  dataKey="checkout"
                  type="monotone"
                  stroke={chartConfig.checkout.color}
                  strokeWidth={2}
                />
              </LineChart>
            </ChartContainer>
          </div>
        </div>

        {/* Cột 2: Biểu đồ tròn mới */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-medium">Báo cáo đi làm</h3>
            <p className="text-sm text-muted-foreground">
              Tỷ lệ đi làm đúng giờ và đi trễ trong tháng.
            </p>
          </div>
          <div className="p-6 pt-0">
            <ChartContainer
              config={pieConfig}
              debounce={300}
              className="mx-auto aspect-square h-[350px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                >
                  {pieData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={
                        pieConfig[entry.name as keyof typeof pieConfig].color
                      }
                    />
                  ))}
                </Pie>
                <ChartLegend content={<ChartLegendContent nameKey="name" />} />
              </PieChart>
            </ChartContainer>
          </div>
        </div>
      </div>
      {/* Kết thúc thay thế ở đây */}
    </div>
  );
}
