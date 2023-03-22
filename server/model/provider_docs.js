const mongoose = require('mongoose');

const ProviderDocsSchema = new mongoose.Schema({
    employee_id: {
        type: Number,
        required: true,
    },
    document_type: {
        type: String,
        required: true
    },
    s3_key: {
        type: String,
        required: true
    },
    expiry_date: {
        type: Date,
        required: true,
    },
    is_deleted: {
        type: Boolean,
        required: false,
        default: false
    },
    

}, {timestamps:true}, {collection: 'providers_and_documents'})

const ProviderDocs = mongoose.model("providers_and_documents", ProviderDocsSchema)
module.exports = ProviderDocs;