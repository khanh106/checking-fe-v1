import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EText } from "@/elements/EText/EText";
import { IWorkLocation } from "@/types/work-location";

interface ILocationCardProps {
  data: IWorkLocation;
}

const LocationCard = ({ data }: ILocationCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <EText>{data.address}</EText>
      </CardContent>
    </Card>
  );
};

export default LocationCard;
