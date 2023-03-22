const DataTeamMembers = require("../model/data_team")

module.exports = {
    findOne: (req, res) => {
        DataTeamMembers.findOne({_id : req.params.id})
            .then(member => res.json(member))
            .catch(err => res.json(err))
    },
    findAll: (req, res) => {
        DataTeamMembers.find()
            .then(members => res.json(members))
    },
    update: (req, res) => {
        console.log("UPDATE id:", req.params.id)
        console.log("Update OBJ", req.body)
        DataTeamMembers.findByIdAndUpdate(req.params.id, req.body, {
            new:true
        })
            .then(updatedDataTeamMember => {
                res.json(updatedDataTeamMember)
                console.log(updatedDataTeamMember)
            })
            .catch(err => console.log(err))
    },
    create: (req, res) => {
        DataTeamMembers.create(req.body)
            .then(newDataTeamMember => {
                console.log("DB sucessfully created DataTeamMember")
                return res.json(newDataTeamMember)
            })
            .catch(err => {
                console.log("DB error creating DataTeamMember")
                return res.json(err)
            })
    },
    delete: (req, res) => {
        console.log(req.params.id);
        DataTeamMembers.findByIdAndDelete(req.params.id)
            .then(result => req.json(result))
            .catch(err => res.json(err))
    }
}