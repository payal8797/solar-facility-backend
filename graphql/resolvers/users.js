const User = require('../../models/User');
const {ApolloError} = require('apollo-server-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    Mutation: {
        async registerUser(_, {registerInput: {username, email, password, confirmPassword} }) {

            if (password !== confirmPassword) {
                throw new ApolloError('Passwords do not match', 'PASSWORDS_DO_NOT_MATCH');
            }
            const oldUser = await User.findOne({email});

            if(oldUser){
                throw new ApolloError('A user is already registered with the entered email: ' + email, 'USER_ALREADY_EXISTS');
            }

            var encryptPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                username: username,
                email: email.toLowerCase(),
                password: encryptPassword
            })

            const token = jwt.sign(
                {newUser_id: newUser._id, email},
                "UNSAFE_STRING",
                {
                    expiresIn: "1h"
                }
            );
            
            newUser.token = token;

            const response = await newUser.save();

            return {
                id: response.id,
                ...response._doc
            }
        },
        async loginUser(_, {loginInput: {email, password} }) {
            const existingUser = await User.findOne({email});
 
            if(!existingUser){
             throw new ApolloError('No User is registered with the entered email: ' + email, 'USER_DOES_NOT_EXISTS');
            }

            if(existingUser && (await bcrypt.compare(password, existingUser.password))){
                const token = jwt.sign(
                    {user_id: existingUser._id, email},
                    "UNSAFE_STRING",
                    {
                        expiresIn: "1h"
                    }
                   );
            
            existingUser.token = token;

            return {
                id: existingUser.id,
                ...existingUser._doc
                }
            } 
            else {
                throw new ApolloError('Incorrect Password', 'INCORRECT_PASSWORD');
            }
        }
    },
    Query: {
        user: (_, {ID}) => User.findById(ID)
    }
}