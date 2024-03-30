import { TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function Search() {
  return (
    <TextField.Root>
      <TextField.Slot>
        <MagnifyingGlassIcon height="18" width="18" />
      </TextField.Slot>
      <TextField.Input placeholder="Search for an item" />
    </TextField.Root>
  );
}
