import { client } from '@/sanity/lib/client';

export default interface Organization {
  _id: string;
  name: string;
  address: string;
  businessNumber: string;
  ceo: string;
  phoneNumber: string;
  email: string;
  instagramUrl: string;
  youTubeUrl: string;
}

const BASE_QUERY = `*[_type == 'organization'][0]`;

async function getOrganization() {
  const organization = await client.fetch(BASE_QUERY);
  return organization;
}

async function updateOrganization(
  id: string,
  updateOrganization: Organization
) {
  const updatedUser = await client
    .patch(id!!)
    .set({
      address: updateOrganization.address,
      businessNumber: updateOrganization.businessNumber,
      ceo: updateOrganization.ceo,
      phoneNumber: updateOrganization.phoneNumber,
      email: updateOrganization.email,
      instagramUrl: updateOrganization.instagramUrl,
      youTubeUrl: updateOrganization.youTubeUrl,
    })
    .commit();
}

export { getOrganization, updateOrganization };
