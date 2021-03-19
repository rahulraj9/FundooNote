let chai = require("chai");
let chaiHttp = require("chai-http");

let server = require("../server");
chai.use(chaiHttp);
const userData = require("./sampleRequests.json");
chai.should();

describe("register", () => {



/**
 * @description - All types of negative test cases
 */
    it("Registeration fields are sent empty , expected status code --> 422  ", (done) => {
        let userInfo = userData.user.registerUserEmptyData;
        console.log("userInfo: " + userInfo);
        chai
            .request(server)
            .post("/user/registration")
            .send(userInfo)
            .end((err, res) => {
                res.should.have.status(422);
                done();


            });

    }),

    it("First name field contains numbers ... expecting status code 422 ", (done) => {
        let userInfo = userData.user.registrationNumberData;
        console.log("userInfo: " + userInfo);
        chai.request(server)
            .post("/user/registration")
            .send(userInfo)
            .end((err, res) => {
                res.should.have.status(422); // unprocessable entity
                done();
            })
    }),
    it("First name length smaller 2 ... expecting status code 422 ", (done) => {
        let userInfo = userData.user.registrationNameLength;
        console.log("userInfo: " + userInfo);
        chai.request(server)
            .post("/user/registration")
            .send(userInfo)
            .end((err, res) => {
                res.should.have.status(422); // unprocessable entity
                done();
            })
    })

    it("Invalid email is passed  ... expecting status code 422  ", (done) => {
        let userInfo = userData.user.registrationInvalidEmail;
        console.log("userInfo: " + userInfo);
        chai.request(server)
            .post("/user/registration")
            .send(userInfo)
            .end((err, res) => {
                res.should.have.status(422); // unprocessable entity
                done();
            })
    }),

        it("Password length is set to less than 6 ... expecting status code 422 ", (done) => {
            let userInfo = userData.user.registrationPasswordLength;
            console.log("userInfo: " + userInfo);
            chai.request(server)
                .post("/user/registration")
                .send(userInfo)
                .end((err, res) => {
                    res.should.have.status(422); // unprocessable entity
                    done();
                })
        }),
        it("Password length is set to greater than 12 ... expecting status code 422 ", (done) => {
            let userInfo = userData.user.registrationMaxPassword;
            console.log("userInfo: " + userInfo);
            chai.request(server)
                .post("/user/registration")
                .send(userInfo)
                .end((err, res) => {
                    res.should.have.status(422); // unprocessable entity
                    done();
                })
        }),
        it("Duplicate email is passed  ... expecting status code 409  ", (done) => {
            let userInfo = userData.user.registrationDuplicateEmail;
            console.log("userInfo: " + userInfo);
            chai.request(server)
                .post("/user/registration")
                .send(userInfo)
                .end((err, res) => {
                    res.should.have.status(409); // unprocessable entity
                    done();
                })
        })


/**
 * @description - AA ideal positive test case!!!!
 */

        it("User_whenGivenProperData_shouldSaveUser expecting status of 200", (done) => {
            let userInfo = userData.user.registerUserProperData;
            console.log("userInfo: " + userInfo);
            chai
                .request(server)
                .post("/user/registration")
                .send(userInfo)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();


                });
        });



})










/**
   * @description - A ideal positive test case
   */
// describe("register", () => {
//     it("User_whenGivenProperData_shouldSaveUser expecting status of 200", (done) => {
//         let userInfo = userData.user.registerUserProperData;
//         console.log("userInfo: " + userInfo);
//         chai
//             .request(server)
//             .post("/user/registration")
//             .send(userInfo)
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 done();


//             });
//     });





// })