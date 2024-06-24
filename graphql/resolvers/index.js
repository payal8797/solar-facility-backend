const fileResolvers = require('./csvData');
const facilityResolvers = require('./facility');
const usersResolvers = require('./users');

module.exports = {
    Query: {
        ...usersResolvers.Query,
        ...facilityResolvers.Query,
        ...fileResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...facilityResolvers.Mutation,
        ...fileResolvers.Mutation
    },
};