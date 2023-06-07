"use clinet";
import { BounceLoader } from "react-spinners";

import Box from "@/components/Box";

const Loading = () => {
  return (
    <Box className="flex items-center justify-center h-full">
      <BounceLoader size={40} color="#22c55e" />
    </Box>
  )
}

export default Loading