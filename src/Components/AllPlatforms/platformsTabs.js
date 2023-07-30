import BrowserPlatform from "../BrowserPlatform/BrowserPlatform";
import PCPlatform from "../PCPlatform/PCPlatform";

const PlatformsTabs = [
    {
        title: "PC",
        id: "pc",
        content: PCPlatform
    },
    {
        title: "Browser",
        id: "browser",
        content: BrowserPlatform,
      }
    ]

    export default PlatformsTabs