const mongoose = require('mongoose');

const S3ProviderDocsSchema = new mongoose.Schema({
    associated: {
        type: Boolean,
        default: false
    },
    file_name: {
        type: String,
    },
    folder: {
        type: String,
    },
    s3_key: {
        type: String,
    },
    reviewed: {
        type: Date,
        default: null
    }

}, {timestamps:true}, {collection: 'provider_docs_s3'})

const S3ProviderDocs = mongoose.model("provider_docs_s3", S3ProviderDocsSchema)
module.exports = S3ProviderDocs;