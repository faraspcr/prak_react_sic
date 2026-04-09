import { createRoot } from "react-dom/client";
import Tailwindcss from "./TailwindCSS";
import "./tailwind.css";
import FrameworkList from "./FrameworkListSearchFilter";
// import FrameworkListSearchFilter from "./FrameworkListSearchFilter";
// import FrameworkListSearchFilter from "./FrameworkListSearchFilter";
import ResponsiveText from "./ResponsiveDesign";

createRoot(document.getElementById("root"))
    .render(
        <div>
            {/* Tes */}
            {/* <FrameworkList/> */}
            {/* <FrameworkListSearchFilter/> */}
            {<ResponsiveText/>}
        </div>
    )

