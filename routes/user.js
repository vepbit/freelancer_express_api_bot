const {Router} = require('express');
const Sequelize = require('sequelize');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authMiddleware = require('./../middlewaree/authMiddleware')
const roleMiddleware = require('./../middlewaree/roleMiddleware')


const Op = Sequelize.Op;

const User = require('../models/user');
const Role = require('../models/role');


User.belongsTo(Role, { as: 'role'})
Role.hasMany(User, { as :'users'});

const router = Router();




const SECRET = process.env.SECRET

const generateAccessToken = (id, roleid) => {
    const payload = {
        id,
        roleid
    }
    return jwt.sign(payload, SECRET, {expiresIn: "24h"} )
}


// i get list of users
router.get('/users/list', roleMiddleware(['1']),async (req, res) => {
    try {
        const users = await User.findAll()
        res.status(200).json(users)
    } catch (e) {
        res.status(500).json({status: "Error",result: "Server error"})
    }
})

// i create user
router.post('/user/create', async (req, res) => {
    try {
        const user = await User.findOne({ where: { chatId: req.body.data.id } })
        let candidate = '';
        let data = await req.body.data;

        const hashPassword = data.password ? bcrypt.hashSync(data.password, 7) : '';

        if(!user){
            candidate = await User.create({
                chatId: data.id,
                user_data: JSON.stringify(data),
                password: hashPassword,
                roleId: data.roleId
            })
            res.status(200).json(data)
        }else{
            res.status(209).json({status: 'Error', message:'Chat id is exist'})
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({status: "Error",result: "Server error"})
    }
})

router.post('/user/login', async (req, res) => {
    try {
        // console.log(req.body.data);
        const  {id, password} = await req.body.data;
        const user = await User.findOne({ where: { chatId: id } })

        const theSamePassword = bcrypt.compareSync(password, user.password);

        if(!theSamePassword){
            return res.status(400).json({status: "Error",result: "Wrong password"})
        }
        // console.log('roles in route: ',user.role)

        const token = generateAccessToken(user.chatId, user.roleid)
        return res.json({token})

    } catch (e) {
        console.log(e);
        res.status(500).json({status: "Error",result: "Server error"})
    }
})




// i get user by id
router.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findOne({ where: { chatId: req.params.id },
        },
        {include: ['users']})
        console.log(user);
        res.status(200).json({user})
    } catch (e) {
        console.log(e);
        res.status(500).json({status: "Error",result: "Server error"})
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
        res.status(500).json({status: "Error",result: "Server error"})
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
        res.status(500).json({status: "Error",result: "Server error"})
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
        res.status(500).json({status: "Error",result: "Server error"})
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
        res.status(500).json({status: "Error",result: "Server error"})
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
        res.status(500).json({status: "Error",result: "Server error"})
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
      res.status(500).json({status: "Error",result: "Server error"})
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
        res.status(500).json({status: "Error",result: "Server error"})
    }
})

module.exports = router