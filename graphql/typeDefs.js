const { gql } = require('apollo-server');

module.exports = gql`

scalar Upload
type User {
    username: String
    email: String
    password: String
    token: String
}

 type Facility {
    id: ID!
    name: String!
    nominalPower: Int!
}

input RegisterInput {
    username: String
    email: String
    password: String
    confirmPassword: String
}

input LoginInput {
    email: String
    password: String
}

type CSVData {
    id: ID!
    timestamp: String!
    activePower: Float!
    energy: Float!
}

type Query {
    user(id: ID!): User
    facilities: [Facility!]!
    facility(id: ID!): Facility
    getCSVData: [CSVData!]
}

type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
    createFacility(name: String!, nominalPower: Int!): Facility!
    updateFacility(id: ID!, name: String, nominalPower: Int): Facility!
    deleteFacility(id: ID!): Facility!
    uploadCSVFile(file: Upload!): String
}
`