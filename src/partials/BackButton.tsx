import { Button } from "@radix-ui/themes";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate(-1)} size={"3"} variant="ghost">
      <ArrowLeftIcon width={18} height={18} />
      Back
    </Button>
  );
}
