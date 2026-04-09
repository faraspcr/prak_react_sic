import { createRoot } from "react-dom/client";
import Tailwindcss from "./TailwindCSS";
import "./tailwind.css";
import TailwinddCSS from "./TailwindCSS";
import FrameworkList from "./FrameworkListSearchFilter";
import FrameworkListSearchFilter from "./FrameworkListSearchFilter";

createRoot(document.getElementById("root"))
    .render(
        <div>
            {/* Tes */}
            {/* <FrameworkList/> */}
            <FrameworkListSearchFilter/>
        </div>
    )
