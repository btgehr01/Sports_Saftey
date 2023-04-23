import { createGoogleMapsAPIURLFromEAPObject } from "../Helpers/MockAPICalls";

describe("createGoogleMapsAPIURLFromEAPObject", () => {
  test("returns a valid Google Maps URL with the specified address and style", () => {
    const eapObject = {
      venueName: "Cardinal Stadium",
      address: {
        streetAddress: "2550 S Floyd St",
        streetAddress2: "",
        city: "Louisville",
        state: "KY",
        country: "US",
        zipCode: "40208",
      },
      contact: {
        name: "",
        phoneNumber: "",
        email: "",
        type: "",
        role: "",
      },
      image: "",
      file: "",
      org: "UofLHealthOrgId",
      group: "UofLFootballGroupId",
    };
    const url = createGoogleMapsAPIURLFromEAPObject(eapObject);

    expect(url).toContain("https://maps.googleapis.com/maps/api/staticmap");
    expect(url).toContain("size=400x400");
    expect(url).toContain("maptype=roadmap");
    expect(url).toContain("center=2550+S+Floyd+St,+Louisville,+US+40208");
    expect(url).toContain(
      "markers=color:red%7C2550+S+Floyd+St,+Louisville,+US+40208,+US"
    );
    expect(url).toContain("key=");
  });
});
