import { DNSRecord } from "../models/dnsRecord.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandlers.js";

// Controller function to add a DNS record for a specific domain
const addDomain = asyncHandler(async (req, res) => {

    const { domain } = req.body;
    if (!domain) {
        throw new ApiError(400, "domain name required fields");
    }
    // Checking if the domain already exists in the database
    let dnsRecords = await DNSRecord.find({ domain: domain });
    if (dnsRecords && dnsRecords.length > 0) {
        throw new ApiError(409, `The domain ${domain} is already registered`);
    }
    // Create a new instance of the model with the provided data and save it into the database
    const newDNSRecord = await DNSRecord.create({
        domain
    });
    const createdDomain = await DNSRecord.findById(newDNSRecord._id);
    if (!createdDomain) {

        throw new ApiError(500, "Something went wrong when add the domain ");
    }
    return res.status(201).json(
        new ApiResponse(200, createdDomain, "domain added Sucessfully")
    );
});
const addDNSRecord = asyncHandler(async (req, res) => {
    const { domainId, recordType, value, ttl, priority } = req.body;

    // Check if all required fields are provided
    if (!domainId || !recordType || !value) {
        throw new ApiError(400, "Missing required fields");
    }

    // Validate recordType against the allowed enum values
    const allowedRecordTypes = ['A', 'AAAA', 'CNAME', 'MX', 'NS', 'PTR', 'SOA', 'SRV', 'TXT', 'DNSSEC'];
    if (!allowedRecordTypes.includes(recordType)) {
        throw new ApiError(400, "Invalid recordType");
    }

    // Check if the domain exists
    const domain = await DNSRecord.findByIdAndUpdate(domainId);
    if (!domain) {
        throw new ApiError(404, "Domain not found");
    }

    // Create a new DNSRecord instance
    const newDNSRecord = new DNSRecord({
        recordType,
        value,
        ttl,
        priority
    });

    // Save the DNSRecord instance to the database
    const savedDNSRecord = await newDNSRecord.save();
    if (!savedDNSRecord) {
        throw new ApiError(500, "Failed to add DNS record");
    }

    // Return success response
    return res.status(201).json(new ApiResponse(201, savedDNSRecord, "DNS record added successfully"));
});



// Controller function to get all DNS records for a specific domain
const getAllDNSRecordsForDomain = asyncHandler(async (req, res) => {
    const { domainId } = req.params; // Extract domain ID from request parameters

    // Find the domain by ID
    const domain = await DNSRecord.findById(domainId);
    if (!domain) {
        throw new ApiError(404, "Domain not found");
    }

    // Fetch all DNS records for the domain from the database
    const dnsRecords = await DNSRecord.find({ domain: domainId });

    // Return success response with the fetched DNS records
    return res.status(200).json(new ApiResponse(200, dnsRecords, "All DNS records fetched successfully"));
});

// Controller function to get all domain names with pagination
const getAllDomainNames = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Fetch domain names with IDs from the database with pagination
    const domainNames = await DNSRecord.find({}, '_id domain')
                                     .limit(limit)
                                     .skip(skip);

    // Return success response with the fetched domain names
    return res.status(200).json(new ApiResponse(200, domainNames, "Domain names fetched successfully"));
});

export { addDNSRecord,addDomain,  getAllDNSRecordsForDomain ,getAllDomainNames};
