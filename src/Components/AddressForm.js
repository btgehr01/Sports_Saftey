import React from "react";
import { Row, Form, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { STATES, CANADIANTERRITORIES, COUNTRIES } from "../Constants/constant";
import "./Form.scss";

const AddressForm = ({ eapObject, setEAPObject, incrementStep }) => {
  //formik is used to handle form variables and set an onSubmit callback function
  //the initial values is used to set the form variables upon the initial load
  //Yup is used for form validation
  return (
    <Formik
      initialValues={{
        venueName: eapObject.venueName,
        streetAddress: eapObject.address.streetAddress,
        streetAddress2: eapObject.address.streetAddress2,
        city: eapObject.address.city,
        state: eapObject.address.state,
        country: eapObject.address.country,
        zipCode: eapObject.address.zipCode,
      }}
      validationSchema={Yup.object({
        venueName: Yup.string().required("Required"),
        streetAddress: Yup.string().required("Required"),
        streetAddress2: Yup.string(),
        city: Yup.string().required("Required"),
        state: Yup.string().required("Required"),
        country: Yup.string().required("Required"),
        zipCode: Yup.string()
          .min(5, "zip code must be at least 5 characters")
          .required("Required"),
      })}
      onSubmit={(values) => {
        //create an address object from the form values
        const address = {
          streetAddress: values.streetAddress,
          streetAddress2: values.streetAddress2,
          city: values.city,
          state: values.state,
          country: values.country,
          zipCode: values.zipCode,
        };
        //update the venueName and address properties within the EAP object within the parent component
        setEAPObject({
          ...eapObject,
          venueName: values.venueName,
          address: address,
        });
        //increment the EAP form process step
        incrementStep();
      }}
    >
      {(formik) => (
        <Form id="addForm" onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Name of Venue*</Form.Label>
            <Form.Control
              placeholder="Venue Name"
              {...formik.getFieldProps("venueName")}
            />
            {formik.touched.venueName && formik.errors.venueName ? (
              <div className="form-error">{formik.errors.venueName}</div>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Address*</Form.Label>
            <Form.Control
              placeholder="1234 Main St"
              {...formik.getFieldProps("streetAddress")}
            />
            {formik.touched.streetAddress && formik.errors.streetAddress ? (
              <div className="form-error">{formik.errors.streetAddress}</div>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control
              placeholder="Apartment, studio, or floor"
              {...formik.getFieldProps("streetAddress2")}
            />
            {formik.touched.streetAddress2 && formik.errors.streetAddress2 ? (
              <div className="form-error">{formik.errors.streetAddress2}</div>
            ) : null}
          </Form.Group>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City*</Form.Label>
              <Form.Control {...formik.getFieldProps("city")} />
              {formik.touched.city && formik.errors.city ? (
                <div className="form-error">{formik.errors.city}</div>
              ) : null}
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>State/Territory*</Form.Label>
              <Form.Select {...formik.getFieldProps("state")}>
                <option value="">Select A State</option>
                <optgroup label="U.S. States/Territories">
                  {STATES.map((state) => {
                    return (
                      <option key={state.code} value={state.code}>
                        {state.name}
                      </option>
                    );
                  })}
                </optgroup>
                <optgroup label="Canadian Provinces">
                  {CANADIANTERRITORIES.map((territory) => {
                    return (
                      <option key={territory.code} value={territory.code}>
                        {territory.name}
                      </option>
                    );
                  })}
                </optgroup>
              </Form.Select>
              {formik.touched.state && formik.errors.state ? (
                <div className="form-error">{formik.errors.state}</div>
              ) : null}
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Country*</Form.Label>
              <Form.Select as="select" {...formik.getFieldProps("country")}>
                <option value="">Select A Country</option>
                <optgroup label="Countries">
                  {COUNTRIES.map((country) => {
                    return (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    );
                  })}
                </optgroup>
              </Form.Select>
              {formik.touched.country && formik.errors.country ? (
                <div className="form-error">{formik.errors.country}</div>
              ) : null}
            </Form.Group>
            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip Code*</Form.Label>
              <Form.Control {...formik.getFieldProps("zipCode")} />
              {formik.touched.zipCode && formik.errors.zipCode ? (
                <div className="form-error">{formik.errors.zipCode}</div>
              ) : null}
            </Form.Group>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default AddressForm;
