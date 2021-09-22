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

  router.get('/user/tag/list/:userid', async (req,res)=>{
      try{
        const user = await User.findOne({ where: { chatId: req.params.userid } })
        const tags_active = await user.tags
        // console.log(tags_active)
        res.status(200).json({status: "Succsess",result: {"tags": tags_active}})
      }catch(e){
        console.log(e)
        res.status(500).json({
          message: 'Server error'
        })
      }
  })


  router.put('/user/tag/add/:userid', async (req,res)=>{
    try{
      const user = await User.findOne({ where: { chatId: req.params.userid } })
      console.log( await req.body)
      let tags_active_new = await req.body.data.tags;
      user.tags = await tags_active_new;
      await user.save();
      res.status(200).json(user.tags)
    }catch(e){
      console.log(e)
      res.status(500).json({
        message: 'Server error'
      })
    }
})
  

  router.post('/user/create', async (req, res) => {
    try {
        const user = await User.findOne({ where: { chatId: req.body.data.id } })
        let candidate = '';
        let data = await req.body.data;
        if(!user){
            candidate = await User.create({
                chatId: data.id,
                user_data: JSON.stringify(data),
            })
            res.status(200).json(data)
        }else{
            res.status(209).json({
                status: 'error',
                message:'Chat id exist'
            })
        }
    } catch (e) {
      console.log(e)
      res.status(500).json({
        message: 'Server error'
      })
    }
  })


module.exports = router