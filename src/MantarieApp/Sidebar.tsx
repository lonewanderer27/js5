import { Button } from "@chakra-ui/react";
import { GlobalState } from "./MantarieApp";
import { Modes } from "./enums";
import { useContext } from "react";

export default function Sidebar() {
  const { 
    mode, setMode
  } = useContext(GlobalState);

  return (
    <div className="sm:py-5 sm:px-10 lg:p-10 bg-c_secondary border-r border-gray-500 border-solid lg:h-screen">
      <div className="flex justify-center align-middle">
        <img src="/MantarieApp/mantarie_icon.png" className="h-7 m-2" />
        <span className="text-4xl font-primary font-bold">mantarie</span>
      </div>

      <div className="flex flex-col justify-center h-full">
        <Button
          size="lg"
          w="100%"
          colorScheme="blue"
          variant={mode == Modes.PREDEFINED ? "solid" : "outline"}
          onClick={() => setMode(Modes.PREDEFINED)}
          className="font-secondary my-1"
        >
          Pre-Defined
        </Button>
        <Button
          size="lg"
          w="100%"
          colorScheme="blue"
          variant={mode == Modes.USERDEFINED ? "solid" : "outline"}
          onClick={() => setMode(Modes.USERDEFINED)}
          className="font-secondary my-1"
        >
          User-Defined
        </Button>
        <Button
          size="lg"
          w="100%"
          colorScheme="blue"
          variant={mode == null ? "solid" : "outline"}
          onClick={() => setMode(null)}
          className="mt-10 font-secondary"
        >
          About
        </Button>
      </div>
    </div>
  );
}
