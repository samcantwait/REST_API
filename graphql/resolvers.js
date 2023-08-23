const bcrypt = require('bcryptjs');
const validator = require('validator');
const jsw = require('jsonwebtoken');

const User = require('../models/user');
const Post = require('../models/post');

module.exports = {
    createUser: async function ({ userInput }, req) {
        const errors = [];
        const { email, name, password } = userInput;
        if (!validator.isEmail(email)) errors.push({ message: 'Email is invalid.' });
        if (validator.isEmpty(password) || !validator.isLength(password, { min: 5 })) errors.push({ message: 'Password too short.' });
        const existingUser = await User.findOne({ email });
        if (errors.length > 0) {
            const error = new Error('Invalid input.');
            error.data = errors;
            error.code = 422;
            throw error;
        }
        if (existingUser) {
            const error = new Error('User exists already!');
            throw error;
        }
        const hashedPw = await bcrypt.hash(password, 12);
        const user = new User({
            email,
            name,
            password: hashedPw
        });
        const createdUser = await user.save();
        return { ...createdUser._doc, _id: createdUser._id.toString() };
    },
    createPost: async function ({ postContent }, req) {
        if (!req.isAuth) {
            const error = new Error('Not authenticated!');
            error.code = 401;
            throw error;
        }
        // There should be validation but I skipped it.
        const { title, content, imageUrl } = postContent;
        const user = await User.findById(req.userId);
        if (!user) {
            const error = new Error('Invalid user.');
            error.code = 401;
            throw error;
        }
        const post = new Post({
            title,
            content,
            imageUrl,
            creator: user
        });
        const newPost = await post.save();
        user.posts.push(newPost);
        return { ...newPost._doc, _id: newPost._id.toString(), createdAt: newPost.createdAt.toISOString(), updatedAt: newPost.updatedAt.toISOString() }
    },
    login: async function ({ email, password }) {
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error('User not found.');
            error.code = 401;
            throw error;
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error('Password is incorrect.');
            error.code = 401;
            throw error;
        }
        const token = jsw.sign({
            userId: user._id.toString(),
            email: user.email
        }, 'supersecret', { expiresIn: '1h' });
        return { token, userId: user._id.toString() };
    }
}