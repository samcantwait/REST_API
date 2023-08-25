const expect = require("chai").expect;
const sinon = require("sinon");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("../models/user");
const AuthController = require("../controllers/auth");

describe("Auth Controller - Login", function () {
  //   it("should throw an error with code 500 if accessing the database fails", function () {
  //     // stub is faking the database check
  //     sinon.stub(User, "findOne");
  //     User.findOne.throws();
  //     const req = {
  //       body: {
  //         email: "sam@samcantwait",
  //         password: "tester",
  //       },
  //     };
  // for async code
  // AuthController.login(req, {}, () => {}).then((result) => {
  //   console.log(result);
  //   expect(result).to.not.be.an("error");
  //   done();
  // });
  // console.log(AuthController.login(req, {}, () => {}));
  //     User.findOne.restore();
  //   });
  // we want to test the database but with a fake database so we don't jeopardize client information
  // THESE TESTS ARE NOT WORKING probably because I didn't switch my code to async
  //   it("should send a response with a valid user status for an existing user", function (done) {
  //     make sure to use a test database!
  //     mongoose;
  //     mongoose
  //       .connect(
  //         `mongodb+srv://samatkins:${process.env.MONGODB_PASS}@cluster0.mur6nvg.mongodb.net/test-messages?retryWrites=true&w=majority`
  //       )
  //       .then((result) => {
  //         const user = new User({
  //           email: "test@test.com",
  //           password: "tester",
  //           name: "Test",
  //           posts: [],
  //           _id: "5c0f66b979af55021b34728a",
  //         });
  //         return user.save();
  //       })
  //       .then(() => {
  //         const req = { userId: "5c0f66b979af55021b34728a" };
  //         const res = {
  //           statusCode: 500,
  //           userStatus: null,
  //           status: function (code) {
  //             this.statusCode = code;
  //             return this;
  //           },
  //           json: function (data) {
  //             this.userStatus = data.status;
  //           },
  //         };
  //         AuthController.getUserStatus(req, res, () => {}).then(() => {
  //           expect(res.statusCode).to.be.equal(200);
  //           expect(res.userStatus).to.be.equal("I am new!");
  //           User.deleteMany({});
  //           mongoose.disconnect().then(() => {
  //             done();
  //           });
  //         });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   });
});
