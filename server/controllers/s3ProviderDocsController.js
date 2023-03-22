const S3ProviderDocs = require("../model/s3_provider_docs")
const moment = require('moment');

module.exports = {
    findOne: (req, res) => {
        S3ProviderDocs.findOne({_id : req.params.id})
            .then(providerDoc => res.json(providerDoc))
            .catch(err => res.json(err))
    },
    findOneToAssociate: (req, res) => {
        S3ProviderDocs.findOne({$and:[{associated: false},{$or:[{reviewed:{$lt:moment().format()}},{reviewed:null}]}]})
            .then((doc) => {
                return res.json(doc)
            })
            .catch( err => res.json(err))
    },
    update: (req, res) => {
        console.log("UPDATE id:", req.params.id)
        console.log("Update OBJ", req.body)
        S3ProviderDocs.findByIdAndUpdate(req.params.id, req.body, {
            new:true
        })
            .then(updatedS3ProviderDoc => {
                res.json(updatedS3ProviderDoc)
                console.log(updatedS3ProviderDoc)
            })
            .catch(err => console.log(err))
    },
}