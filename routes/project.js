const {Router} = require('express')
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

const Project = require('../models/project')
const User = require('../models/user')

const router = Router()


// I get list of projects depend on user request
router.post('/project/list', async (req, res) => {
    try {
        const user = await User.findOne({ where: { chatId: req.body.data.id } })
        let user_tags = await user.dataValues.tags;
        let user_project_type = await user.dataValues.project_type;
        let user_project_time_ago = await user.dataValues.project_time_ago;

        const startDate = Date.now() / 1000 - ( user_project_time_ago * 60);
        const endDate = Date.now() / 1000;

        let array_query_tags = [];
        let user_tags_arr = user_tags.split(',');

        //i add query with keywords.
        for(item in user_tags_arr){
            array_query_tags.push(            {
                tags: {
                    [Op.like]: `%${user_tags_arr[item]}%`
                }
            });
            array_query_tags.push(            {
                full_description: {
                    [Op.like]: `%${user_tags_arr[item]}%`
                }
            });
        }

        //i add query depend on project type
        if(user_project_type==="all" || user_project_type===""){
            const projects = await Project.findAll({
                where: {
                    publishtime: {
                        [Op.between]: [startDate, endDate]
                    },
                        [Op.or]: array_query_tags
                },
                order: [
                    ['id', 'DESC'],
                ],
        
            })
            return res.status(200).json(projects)
        }else{
            const projects = await Project.findAll({
                where: {
                  publishtime: {
                    [Op.between]: [startDate, endDate]
                  },
                  project_type: {
                    [Op.eq]: user_project_type
                  },
                  [Op.or]: array_query_tags
                },
                order: [
                    ['id', 'DESC'],
                ],
            })
            return res.status(200).json(projects)
        }
    } catch (e) {
      res.status(500).json({status: "Error",result: "Server error"})
    }
  })

module.exports = router