const ProviderDocs = require("../model/provider_docs")

module.exports = {
    findOne: (req, res) => {
        ProviderDocs.findOne({_id : req.params.id})
            .then(providerDoc => res.json(providerDoc))
            .catch(err => res.json(err))
    },
    findAll: (req, res) => {
        ProviderDocs.find()
            .then(members => res.json(members))
    },
    create: (req, res) => {
        ProviderDocs.create(req.body)
            .then(newProviderDoc => {
                console.log("DB sucessfully created ProviderDoc")
                return res.json(newProviderDoc)
            })
            .catch(err => {
                console.log("DB error creating note")
                return res.json(err)
            })
    },
    delete: (req, res) => {
        console.log(req.params.id);
        ProviderDocs.findByIdAndDelete(req.params.id)
            .then(result => req.json(result))
            .catch(err => res.json(err))
    }
}