import { Router } from 'express';
import { addDNSRecord, getAllDNSRecordsForDomain, addDomain, getAllDomainNames } from "../controllers/dnsRecord.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

// Apply JWT verification middleware to all routes in this router
router.use(verifyJWT);

// Define routes for handling DNS records

// Route to add a new DNS record for a specific domain
router.post("/add-dns", addDNSRecord);

router.get("/getdomains", getAllDomainNames);
// Route to update a DNS record by ID
router.patch("/adddomain", addDomain);

// Route to get all DNS records for a specific domain
router.get("/:domainId", getAllDNSRecordsForDomain);

export default router;
