import { AttendanceTable } from "@/modules/attendance/components/attendance-table";
import { DateFilter } from "@/modules/attendance/components/date-filter";

const AttendanceHistoryPage = () => {
  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold">Attendance History</h1>
      <DateFilter />
      <AttendanceTable />
    </div>
  );
};

export default AttendanceHistoryPage;
