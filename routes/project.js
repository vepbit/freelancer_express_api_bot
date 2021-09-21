const {Router} = require('express')
const Project = require('../models/project')
const router = Router()


// Получение списка задач
router.get('/project/list', async (req, res) => {
    try {
      const project = await Project.findAll()
      res.status(200).json(project)
    } catch (e) {
      console.log(e)
      res.status(500).json({
        message: 'Server error'
      })
    }
  })


module.exports = router