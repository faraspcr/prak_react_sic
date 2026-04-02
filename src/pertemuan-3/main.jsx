import { createRoot } from "react-dom/client";
import Tailwindcss from "./TailwindCSS";
import "./tailwind.css";
import TailwinddCSS from "./TailwindCSS";
import UserForm from "./UserForm";
import HitungGajiForm from "./HitungGajiForm";

createRoot(document.getElementById("root"))
    .render(
        <div>
            {/* <TailwinddCSS/> */}
            {/* <UserForm/> */}
            <HitungGajiForm/>
                
        </div>
    )