const request = require('supertest');
const app = require('../server');

describe('Api testing ', () => {

    const user = {
        user: {
            id: 1,
            chatId: "766666666666666",
            tags: "",
            autoupdate: "On",
            project_time_ago: null,
            project_type: "all",
            user_data: "{\"id\":\"766666666666666\",\"user_data\":\"dummy data\",\"password\":\"766666666666666\",\"roleId\":2}",
            tags_custom: "",
            password: "$2a$07$eguHDfZWqENYxhyD9HyqsOEvPI3icVZhJ.6qFk1MKDuY1kzaAqXyO",
            createdAt: "2021-10-03T08:30:29.000Z",
            updatedAt: "2021-10-03T08:30:29.000Z",
            role: {
                id: 1,
                name: "admin",
                createdAt: "2021-10-03T11:29:53.000Z",
                updatedAt: "2021-10-04T11:29:53.000Z"
            }
        }
    }
    const test_user_id = 766666666666666;
    const test_user_id_unknown = 7666666666666661;

    it('Get user by id',   (done) => {
        jest.setTimeout(21000);
        const expectedResponse = {
            ...user
        }
        request(app)
        .get(`/api/v1/user/${test_user_id}`)
        .expect(200)
        .end(function(err, res) {
            if (err)  {
                done(err)
            }else{
                expect(res.body).toEqual(expectedResponse)
                done();
            };

        });
    });
    it('Get user by id witch do not exists',   (done) => {
        jest.setTimeout(21000);
        const expectedResponse = {status: "Error",result: "User does not exist"}
        request(app)
        .get(`/api/v1/user/${test_user_id_unknown}`)
        .expect(400)
        .end(function(err, res) {
            if (err)  {
                done(err)
            }else{
                expect(res.body).toEqual(expectedResponse)
                done();
            };

        });
    });
    
});
