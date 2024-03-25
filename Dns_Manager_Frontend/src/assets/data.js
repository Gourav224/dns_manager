const generateDummyData = () => {
    const dummyData = [];
    const domains = ['example.com', 'example.net', 'example.org'];
    const recordTypes = ['A', 'AAAA', 'CNAME', 'MX', 'NS', 'PTR', 'SOA', 'SRV', 'TXT', 'DNSSEC'];
  
    for (let i = 1; i <= 50; i++) {
      const domain = domains[Math.floor(Math.random() * domains.length)];
      const recordType = recordTypes[Math.floor(Math.random() * recordTypes.length)];
      const name = recordType !== 'NS' && recordType !== 'SOA' ? `subdomain${i}` : undefined;
      const value = recordType === 'A' ? `192.0.2.${i}` : `value${i}.example.com`;
      const ttl = Math.floor(Math.random() * 3600) + 1; // Random TTL between 1 and 3600
  
      const record = {
        id: i,
        domain,
        recordType,
        name,
        value,
        ttl
      };
  
      dummyData.push(record);
    }
  
    return dummyData;
  };
  
  const dummyDNSRecords = generateDummyData();
  export default dummyDNSRecords;
  