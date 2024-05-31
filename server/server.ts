import express, { Request, Response } from 'express';
import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import cors from 'cors';

const app = express();
const port = 5000;

interface Listing {
    unit: string;
}

interface HealthStatus {
    unit_id: string;
    zillow_status: string;
    zumper_status: string;
}

let listings: Listing[] = [];

// Fetch listings data
const fetchListings = async (): Promise<void> => {
    const url = "https://www.rentengine.io/api/getListingsInView?neLat=55.98296328587119&neLng=-54.54163846501635&swLat=5.1917120305937345&swLng=-142.45547380176595";
    const response = await axios.get(url);
    listings = response.data;
};

// Parse XML feed
const parseXmlFeed = async (feedUrl: string): Promise<string[]> => {
    const response = await axios.get(feedUrl);
    const parsedData = await parseStringPromise(response.data);

    // Adjust this logic based on the actual structure
    if (parsedData && parsedData.hotPadsItems && Array.isArray(parsedData.hotPadsItems.Listing)) {
        return Object.values(parsedData.hotPadsItems.Listing).map((listing: any) => listing.unit[0]);
    }
    return [];
    // return Object.values(parsedData.hotPadsItems.Listing).map((listing: any) => listing.unit[0]);
    // } else {
    //     throw new Error("Unexpected XML structure");
    // }
};


app.use(cors()); // Enable CORS

app.get('/api/health_statuses', async (req: Request, res: Response) => {
    try {
        await fetchListings();
        const zillowFeedUrl = "https://dcepycifzliabhkgcitm.supabase.co/storage/v1/object/public/listing-feeds/zillow/rentengineListings.xml";
        const zumperFeedUrl = "https://dcepycifzliabhkgcitm.supabase.co/storage/v1/object/public/listing-feeds/zumper/rentengineListings.xml";

        const zillowListings = await parseXmlFeed(zillowFeedUrl);
        const zumperListings = await parseXmlFeed(zumperFeedUrl);

        const healthStatuses: HealthStatus[] = [];
        listings.map(listing => {
            if (listing) {
                healthStatuses.push({
                    unit_id: listing.unit,
                    zillow_status: zillowListings.includes(listing.unit) ? "Available" : "Not Available",
                    zumper_status: zumperListings.includes(listing.unit) ? "Available" : "Not Available"
                });
            }
        });

        res.json(healthStatuses);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
