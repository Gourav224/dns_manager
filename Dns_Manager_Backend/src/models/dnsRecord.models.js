import mongoose, { Schema } from "mongoose";

const dnsRecordSchema = new Schema({
    domain: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    recordType: {
        type: String,
        enum: ['A', 'AAAA', 'CNAME', 'MX', 'NS', 'PTR', 'SOA', 'SRV', 'TXT', 'DNSSEC'],
    },
    value: {
        type: [String], // Allow multiple values for CNAME, MX, NS, and SRV records
    },
}, {
    timestamps: true // Adds createdAt and updatedAt fields automatically
});


// Compile the model
export const DNSRecord = mongoose.model("DNSRecord", dnsRecordSchema);
