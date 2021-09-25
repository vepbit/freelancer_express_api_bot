const {Router} = require('express')
const User = require('../models/user')

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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


  router.get('/users/listautoupdate', async (req, res) => {
    try {
      const users = await User.findAll({
        where: {
          autoupdate: {
            [Op.like]: '%on%'
          }
        },
        order: [
            ['id', 'DESC'],
        ],

      })
      res.status(200).json({status: "Succsess",result: {"data": users}})
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
  
  router.get('/user/tagcustom/list/:userid', async (req,res)=>{
    try{
      const user = await User.findOne({ where: { chatId: req.params.userid } })
      const tags_custom_active = await user.tags_custom
      // console.log(tags_active)
      res.status(200).json({status: "Succsess",result: {"tags_custom": tags_custom_active}})
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
    //   console.log(req)
      res.status(200).json(user.tags)
    }catch(e){
      console.log(e)
      res.status(500).json({
        message: 'Server error'
      })
    }
})
router.put('/user/tagcustom/add/:userid', async (req,res)=>{
    try{
      const user = await User.findOne({ where: { chatId: req.params.userid } })
      console.log( await req.body)
      let tags_active_new = await req.body.data.tags_custom;
      user.tags_custom = await tags_active_new;
      await user.save();
      console.log(req)
      res.status(200).json(user.tags_custom)
    }catch(e){
      console.log(e)
      res.status(500).json({
        message: 'Server error'
      })
    }
})

router.put('/user/project_type/update/:userid', async (req,res)=>{
    try{
      const user = await User.findOne({ where: { chatId: req.params.userid } })
      console.log( await req.body)
      let project_type_new = await req.body.data.type;
      console.log( 'project_type_new', project_type_new)
      user.project_type = await project_type_new;
      await user.save();
      res.status(200).json({status: "Succsess",result: {"project_type":  user.project_type}})
    }catch(e){
      console.log(e)
      res.status(500).json({
        message: 'Server error'
      })
    }
})

router.put('/user/autoupdate/update/:userid', async (req,res)=>{
    try{
      const user = await User.findOne({ where: { chatId: req.params.userid } })
      console.log( await req.body)
      let autoupdate_new = await req.body.data.autoupdate;
      console.log( 'autoupdate', autoupdate_new)
      user.autoupdate = await autoupdate_new;
      await user.save();
      res.status(200).json({status: "Succsess",result: {"autoupdate":  user.autoupdate}})
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