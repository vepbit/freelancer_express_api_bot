require('dotenv').config()
const PORT = process.env.PORT || 3333;
const DOMAIN = process.env.DOMAIN || 'http://localhost';



// database for bot
const sequelize_user = require('./utils/database_user')

// routs
const userRouter = require('./routes/user')
const projectRouter = require('./routes/project')

const express = require('express');
const app = express();

app.use(express.json())

app.use('/api/v1', userRouter)
app.use('/api/v1', projectRouter)


async function startServer() {
    try {
      await sequelize_user.sync()
      app.listen(PORT)
      console.log(`Server are started at ${DOMAIN}:${PORT}`)
    } catch (e) {
      console.log(e)
    }
}
  
startServer();


module.exports = app