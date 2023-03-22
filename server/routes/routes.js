const ProviderDocs = require("../controllers/providerDocsController")
const S3ProviderDocs = require("../controllers/s3ProviderDocsController")
const DataTeamMembers = require("../controllers/dataTeamContoller")
module.exports = (app) => {
    app.get("/api/provider-docs/:id", ProviderDocs.findOne)
    app.get("/api/provider-docs", ProviderDocs.findAll)
    app.post("/api/provider-docs", ProviderDocs.create)
    app.delete("/api/provider-docs/:id", ProviderDocs.delete)

    app.get("/api/s3-provider-docs/one-to-associate", S3ProviderDocs.findOneToAssociate)
    app.get("/api/s3-provider-docs/:id", S3ProviderDocs.findOne)
    app.put("/api/s3-provider-docs/:id", S3ProviderDocs.update)

    app.get("/api/data-team/:id", DataTeamMembers.findOne)
    app.get("/api/data-team", DataTeamMembers.findAll)
    app.put("/api/data-team/:id", DataTeamMembers.update)
    app.post("/api/data-team", DataTeamMembers.create)
    app.delete("/api/data-team/:id", DataTeamMembers.delete)

}