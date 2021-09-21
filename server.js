require('dotenv').config()
const PORT = process.env.PORT || 3333;

const sequelize_bot = require('./utils/database_bot')

const userRouter = require('./routes/user')

const express = require('express');

const app = express();

app.use(express.json())


app.use('/api/v1', userRouter)





app.get('/',(req,res)=>{
        res.json('hello world!!')
})


async function start() {
    try {
      await sequelize_bot.sync()
      app.listen(PORT)
      console.log(`Example app listening at http://localhost:${PORT}`)
    } catch (e) {
      console.log(e)
    }
}
  
  start()