// import { cn } from "@/lib/utils"

// function Skeleton({
//   className,
//   ...props
// }) {
//   return (<div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />);
// }

// export { Skeleton }

import { cn } from "@/lib/utils";
import img from "../../assets/logo.png"


function Skeleton({
  className,
  ...props
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-screen h-screen bg-muted",
        className
      )}
      {...props}
    >
      {/* Animated Image */}
      <img
        src={img} // Replace this with the actual path of your loading image
        alt="Loading"
        className="animate-grow"
      />
    </div>
  );
}

export { Skeleton };

