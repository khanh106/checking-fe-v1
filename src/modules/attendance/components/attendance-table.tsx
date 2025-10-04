"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Dữ liệu mẫu cho Lịch sử điểm danh
const attendanceData = [
  {
    date: "2023-10-26",
    checkIn: "08:30:00",
    checkOut: "17:30:00",
    workLocation: "Văn phòng chính",
  },
  {
    date: "2023-10-25",
    checkIn: "08:25:00",
    checkOut: "17:35:00",
    workLocation: "Văn phòng chính",
  },
  {
    date: "2023-10-24",
    checkIn: "08:32:00",
    checkOut: "17:28:00",
    workLocation: "Làm việc từ xa",
  },
];

export function AttendanceTable() {
  return (
    <Table>
      <TableCaption>Lịch sử điểm danh gần đây của bạn.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Ngày</TableHead>
          <TableHead>Giờ vào</TableHead>
          <TableHead>Giờ ra</TableHead>
          <TableHead>Địa điểm</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {attendanceData.map((record) => (
          <TableRow key={record.date}>
            <TableCell className="font-medium">{record.date}</TableCell>
            <TableCell>{record.checkIn}</TableCell>
            <TableCell>{record.checkOut}</TableCell>
            <TableCell>{record.workLocation}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
