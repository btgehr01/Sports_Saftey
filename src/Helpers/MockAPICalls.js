//import dummy data for the project, this will become obsolete when the AWS database is configured and populated
import { organizations, dummyGoodMapsImage } from "./DummyData";

export const getOrganizationsForUser = () => {
  return organizations;
};

export const getOrganizationForOrgId = (orgId) => {
  return organizations.find((org) => org.id === orgId);
};

export const getGroupForGroupId = (orgId, groupId) => {
  return organizations
    .find((org) => org.id === orgId)
    .groups.find((group) => group.id === groupId);
};

const formatAddress = (address) => {
  return address.replace(/\s+/g, "+");
};

export const createGoogleMapsAPIURLFromEAPObject = (eapObject) => {
  /*
"1600 Amphitheatre Parkway, Mountain View, CA 94043, United States", 
 replace {address} with "1600+Amphitheatre+Parkway,+Mountain+View,+CA+94043,+United+States"
  */
  //Example URL: https://maps.googleapis.com/maps/api/staticmap?center={address}&zoom=15&size=400x400&maptype=roadmap&markers=color:red%7C{address}&key=YOUR_API_KEY

  //use eapObject's address and or venueName properties to configure a google maps API
  const addressField = eapObject.address;
  let address = `${addressField.streetAddress}, ${addressField.city}, ${addressField.country} ${addressField.zipCode}, ${addressField.country}`;
  address = formatAddress(address);
  const URL = `https://maps.googleapis.com/maps/api/staticmap?center=${address}&zoom=15&size=400x400&maptype=roadmap&markers=color:red%7C${address}&key=YOUR_API_KEY`;
  return URL;
};

export const simulateGoogleMapsAPICall = (eapObject) => {
  //Construct the GoogleMaps API URL using the "createGoogleMapsAPIURLFromEAPObject" helper function
  const URL = createGoogleMapsAPIURLFromEAPObject(eapObject);
  //Call the URL using axios and return the result (image)
  console.log("GoogleMapsAPIURL", URL);
  return dummyGoodMapsImage;
};
