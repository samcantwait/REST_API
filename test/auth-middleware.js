const expect = require("chai").expect;
const authMiddleware = require("../middleware/is-auth");
const jwt = require("jsonwebtoken");
const sinon = require("sinon");

describe("Auth middleware", function () {
  it("should throw an error if no authorization header is present", function () {
    const req = {
      get: function () {
        return null;
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
      "Not authenticated."
    );
  });

  it("should throw an error if the authorization header is only one string", function () {
    const req = {
      get: function (headerName) {
        return "samiam";
      },
    };
    // we need to bind this so that we aren't calling the function ourselves, we're binding it the the instance when the test code call is.
    // the empty object represents 'res' and the empty function is for 'next' since next is a function we call at the end next();
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });

  it("should yield a userId after decoding the token", function () {
    const req = {
      get: function (headerName) {
        return "Bearer sometoken";
      },
    };
    // when checking for tokens (to which we don't have access) sinon will fake the verification for testing and then restore the verify function to it's proper form
    sinon.stub(jwt, "verify");
    jwt.verify.returns({ userId: "sam" });

    // we can also do this manually, but then the verify function is set globally as the fake function we create.
    // jwt.verify = function () {
    //   return { userId: "sam" };
    // };

    authMiddleware(req, {}, () => {});
    expect(req).to.have.property("userId");
    // other tests we can do
    expect(req).to.have.property("userId", "sam");
    expect(jwt.verify.called).to.be.true;
    jwt.verify.restore();
  });
});
