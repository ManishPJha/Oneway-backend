require("dotenv").config({
    path: "src/config/config.env"
});

import localConfig from "./config.local"
import prodConfig from "./config.prod"

export {
    localConfig,
    prodConfig
}