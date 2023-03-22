const mongoose = require('mongoose');

const DataTeamMembersSchema = new mongoose.Schema({
    member_name: {
        type: String,
        required: true
    },
    number_of_docs_associated: {
        type: Number,
        default: 0,
        required: false
    },
    

}, {timestamps:true}, {collection: 'data_team_members'})

const DataTeamMembers = mongoose.model("data_team_members", DataTeamMembersSchema)
module.exports = DataTeamMembers;