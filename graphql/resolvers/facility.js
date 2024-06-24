const { ApolloError, UserInputError } = require('apollo-server-errors');
const Facility = require('../../models/Facility');
const { AuthenticationError } = require('apollo-server-express');

module.exports = {
    Mutation: {
        createFacility: async (_, { name, nominalPower }, token) => {
            if (!token) {
                throw new AuthenticationError('Unauthorized');
            }

            if (!name || nominalPower == null) {
                throw new UserInputError('Name and nominal power are required fields.');
            }

            try {
                const facility = new Facility({ name, nominalPower });
                await facility.save();
                return facility;
            } catch (err) {
                throw new ApolloError('Failed to create facility', 'FACILITY_CREATION_ERROR', { err });
            }
        },
        updateFacility: async (_, { id, name, nominalPower }, token) => {
            if (!token) {
                throw new AuthenticationError('Unauthorized');
            }

            if (!id) {
                throw new UserInputError('ID is required');
            }

            try {
                const facility = await Facility.findByIdAndUpdate(
                    id,
                    { name, nominalPower },
                    { new: true }
                );

                if (!facility) {
                    throw new ApolloError('Facility not found', 'FACILITY_NOT_FOUND');
                }

                return facility;
            } catch (err) {
                throw new ApolloError('Failed to update facility', 'FACILITY_UPDATE_ERROR', { err });
            }
        },
        deleteFacility: async (_, { id }, token) => {
            if (!token) {
                throw new AuthenticationError('Unauthorized');
            }
            
            if (!id) {
                throw new UserInputError('ID is required');
            }

            try {
                const facility = await Facility.findByIdAndDelete(id);

                if (!facility) {
                    throw new ApolloError('Facility not found', 'FACILITY_NOT_FOUND');
                }

                return facility;
            } catch (err) {
                throw new ApolloError('Failed to delete facility', 'FACILITY_DELETION_ERROR', { err });
            }
        },
    },
    Query: {
        facilities: async (_, __, token ) => {
            try {
                if (!token) {
                    throw new AuthenticationError('Unauthorized');
                }
                return await Facility.find();
            } catch (err) {
                throw new ApolloError('Failed to fetch facilities', 'FACILITIES_FETCH_ERROR', { err });
            }
        },
        facility: async (_, { id }, token) => {
            if (!token) {
                throw new AuthenticationError('Unauthorized');
            }
            if (!id) {
                throw new UserInputError('ID is required');
            }

            try {
                const facility = await Facility.findById(id);

                if (!facility) {
                    throw new ApolloError('Facility not found', 'FACILITY_NOT_FOUND');
                }

                return facility;
            } catch (err) {
                throw new ApolloError('Failed to fetch facility', 'FACILITY_FETCH_ERROR', { err });
            }
        },
    }
}
