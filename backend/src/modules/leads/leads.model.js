const mongoose = require("mongoose")

const LeadSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        contactName: {
            type: String,
            trim: true,
        },
        companyName: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            lowercase: true,
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
        },

        source: {
            type: String,
            enum: ["website", "referral", "ads", "cold_call", "other"],
            default: "other",
        },

        status: {
            type: String,
            enum: ["new", "contacted", "qualified", "proposal", "won", "lost"],
            default: "new",
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            // required: true,
        },

        value: {
            type: Number,
            default: 0,
        },

        expectedCloseDate: {
            type: Date,
        },

        notes: {
            type: String,
            trim: true,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    }, {
    timestamps: true,
})

module.exports=mongoose.model("Lead",LeadSchema)