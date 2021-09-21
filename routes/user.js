const {Router} = require('express')
const User = require('../models/user')
const router = Router()


// Получение списка задач
router.get('/users/list', async (req, res) => {
    try {
      const users = await User.findAll()
      res.status(200).json(users)
    } catch (e) {
      console.log(e)
      res.status(500).json({
        message: 'Server error'
      })
    }
  })

  router.get('/user/:id', async (req, res) => {
    try {
      const user = await User.findOne({ where: { chatId: req.params.id } })
      res.status(200).json({user})
    } catch (e) {
      console.log(e)
      res.status(500).json({
        message: 'Server error'
      })
    }
  })


module.exports = router