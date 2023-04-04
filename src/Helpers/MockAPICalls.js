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

const createGoogleMapsAPIURLFromEAPObject = (eapObject) => {
  //use eapObject's address and or venueName properties to configure a google maps API
  let URL = "";
  // Object.keys(eapObject.address).forEach((value) => {
  //   URL += eapObject.address[value].replace(" ", "+") + "+";
  // });
  return URL;
};

export const simulateGoogleMapsAPICall = (eapObject) => {
  //Construct the GoogleMaps API URL using the "createGoogleMapsAPIURLFromEAPObject" helper function
  const URL = createGoogleMapsAPIURLFromEAPObject(eapObject);
  //Call the URL using axios and return the result (image)
  console.log("GoogleMapsAPICall", URL);
  return dummyGoodMapsImage;
};
