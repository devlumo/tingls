import { FaCloudRain, FaFire } from "react-icons/fa";
import { MdWaves } from "react-icons/md";
import { BsSoundwave } from "react-icons/bs";

const style = "mb-4 text-green-600 text-2xl";
const icons = [
  {
    name: "default",
    component: <BsSoundwave className={style} />,
  },
  {
    name: "waves",
    component: <MdWaves className={style} />,
  },
  {
    name: "rain",
    component: <FaCloudRain className={style} />,
  },
  {
    name: "fire",
    component: <FaFire className={style} />,
  },
];
export default icons;
