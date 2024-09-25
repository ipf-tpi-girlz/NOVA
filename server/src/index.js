import { app } from "./app/app.js";
import { conectionDB } from './config/database/db.js'
import { tablesAndRelation } from "./config/database/sync.js";
import config from './config/config.js'
app
console.log(config.DB_NAME)
conectionDB()
tablesAndRelation()