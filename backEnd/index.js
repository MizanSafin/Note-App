import app from "./app.js"
import { PORT } from "./app/config/config.js";


app.listen(PORT, function () {
  console.log(`App is running at the port ${PORT}`)
})
