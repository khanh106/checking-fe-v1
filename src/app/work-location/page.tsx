"use client";

// import { useQuery } from '@tanstack/react-query'; // Sẽ dùng lại sau
import { EText } from "@/elements/EText/EText";
import LocationCard from "@/modules/work-location/components/location-card";
// import { getWorkLocations } from '@/services/apis/work-location'; // Sẽ dùng lại sau
import { Skeleton } from "@/components/ui/skeleton";
import { IWorkLocation } from "@/types/work-location";

// --- BẮT ĐẦU DỮ LIỆU GIẢ ---
const MOCK_WORK_LOCATIONS: IWorkLocation[] = [
  {
    id: "1",
    name: "Văn phòng GASY",
    address: "Tòa nhà C-Office, P. An Phú, TP. Thủ Đức, TP. Hồ Chí Minh",
    latitude: 10.8015,
    longitude: 106.7451,
    radius: 100,
    company_id: "gasy",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Chi nhánh Hà Nội",
    address: "Tòa nhà Ladeco, 266 Đội Cấn, Ba Đình, Hà Nội",
    latitude: 21.0368,
    longitude: 105.8193,
    radius: 150,
    company_id: "gasy",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Một địa điểm khác",
    address: "123 Đường ABC, Quận XYZ, Thành phố HCM",
    latitude: 0,
    longitude: 0,
    radius: 50,
    company_id: "gasy",
    is_active: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];
// --- KẾT THÚC DỮ LIỆU GIẢ ---

const WorkLocationPage = () => {
  // Tạm thời tắt gọi API thật và dùng dữ liệu giả
  // const { data: workLocationsResponse, isLoading } = useQuery({
  //   queryKey: ['work-locations'],
  //   queryFn: () => getWorkLocations(),
  // });
  // const workLocations = workLocationsResponse?.data;

  const isLoading = false;
  const workLocations = MOCK_WORK_LOCATIONS;

  return (
    <div className="h-full w-full p-4 md:p-6">
      <EText as="h1" className="mb-4 text-2xl font-semibold">
        Địa chỉ làm việc
      </EText>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="h-32 w-full" />
            ))
          : workLocations?.map((location) => (
              <LocationCard key={location.id} data={location} />
            ))}
      </div>
    </div>
  );
};

export default WorkLocationPage;
