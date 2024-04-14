import { client } from "@/sanity/lib/client";

export default interface Organization {
    name: string;
    address: string;
    businessNumber: string;
    ceo: string;
    phoneNumber: string;
    email: string;
    instagramUrl: string,
    youTubeUrl: string
}

const BASE_QUERY = `*[_type == 'organization'][0]`;

async function getOrganization() {
    const organization = await client.fetch(BASE_QUERY);
    console.log('organization info: ', organization);
    return organization;
}

export { getOrganization }

