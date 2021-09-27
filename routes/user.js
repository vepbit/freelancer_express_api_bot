const {Router} = require('express');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

const User = require('../models/user');

const router = Router();


// i get list of users
router.get('/users/list', async (req, res) => {
    try {
        const users = await User.findAll()
        res.status(200).json(users)
    } catch (e) {
        res.status(500).json({
            message: 'Server error'
        })
    }
})

// i create user
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
        res.status(500).json({
            message: 'Server error'
        })
    }
})

// i get user by id
router.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findOne({ where: { chatId: req.params.id } })
        res.status(200).json({user})
    } catch (e) {
        res.status(500).json({
            message: 'Server error'
        })
    }
})

// i change autoupdate status
router.get('/users/autoupdate', async (req, res) => {
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
        res.status(500).json({
            message: 'Server error'
        })
    }
})

//  i get list of user's tag
router.get('/user/tag/list/:userid', async (req,res)=>{
    try{
        const user = await User.findOne({ where: { chatId: req.params.userid } })
        const tags_active = await user.tags
        // console.log(tags_active)
        res.status(200).json({status: "Succsess",result: {"tags": tags_active}})
    }catch(e){
        res.status(500).json({
            message: 'Server error'
        })
    }
})

//  i get list of user's custom tag
router.get('/user/tagcustom/list/:userid', async (req,res)=>{
    try{
        const user = await User.findOne({ where: { chatId: req.params.userid } })
        const tags_custom_active = await user.tags_custom
        // console.log(tags_active)
        res.status(200).json({status: "Succsess",result: {"tags_custom": tags_custom_active}})
    }catch(e){
        res.status(500).json({
            message: 'Server error'
        })
    }
})

//  i add tag to user
router.put('/user/tag/add/:userid', async (req,res)=>{
    try{
        const user = await User.findOne({ where: { chatId: req.params.userid } })
        let tags_active_new = await req.body.data.tags;
        user.tags = await tags_active_new;
        await user.save();
        res.status(200).json(user.tags)
    }catch(e){
        res.status(500).json({
            message: 'Server error'
        })
    }
})

//  i add custom tag to user
router.put('/user/tagcustom/add/:userid', async (req,res)=>{
    try{
        const user = await User.findOne({ where: { chatId: req.params.userid } })
        console.log( await req.body)
        let tags_active_new = await req.body.data.tags_custom;
        user.tags_custom = await tags_active_new;
        await user.save();
        res.status(200).json(user.tags_custom)
    }catch(e){
        res.status(500).json({
            message: 'Server error'
        })
    }
})

//  i change project type to user
router.put('/user/project_type/update/:userid', async (req,res)=>{
    try{
        const user = await User.findOne({ where: { chatId: req.params.userid } })
        let project_type_new = await req.body.data.type;
        user.project_type = await project_type_new;
        await user.save();
        res.status(200).json({status: "Succsess",result: {"project_type":  user.project_type}})
    }catch(e){
      res.status(500).json({
        message: 'Server error'
      })
    }
})

// i change autoupdate status
router.put('/user/autoupdate/update/:userid', async (req,res)=>{
    try{
        const user = await User.findOne({ where: { chatId: req.params.userid } })
        let autoupdate_new = await req.body.data.autoupdate;
        user.autoupdate = await autoupdate_new;
        await user.save();
        res.status(200).json({status: "Succsess",result: {"autoupdate":  user.autoupdate}})
    }catch(e){
        res.status(500).json({
            message: 'Server error'
        })
    }
})

module.exports = router