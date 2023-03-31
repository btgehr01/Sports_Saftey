import React from "react";
import { Row, Form, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import "./Form.scss";

const ContactForm = ({ eapObject, setEAPObject, incrementStep }) => {
  return (
    <Formik
      initialValues={{
        name: eapObject.contact.name,
        phoneNumber: eapObject.contact.phoneNumber,
        email: eapObject.contact.email,
        type: eapObject.contact.type,
        role: eapObject.contact.role,
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("Required"),
        phoneNumber: Yup.string()
          .min(12, "phone number must be at least 12 characters")
          .required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        type: Yup.string().required("Required"),
        role: Yup.string().required("Required"),
      })}
      onSubmit={(values) => {
        const contact = {
          name: values.name,
          phoneNumber: values.phoneNumber,
          email: values.email,
          type: values.type,
          role: values.role,
        };
        setEAPObject({
          ...eapObject,
          contact: contact,
        });
        incrementStep();
      }}
    >
      {(formik) => (
        <Form id="addForm" onSubmit={formik.handleSubmit}>
          <Row>
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Contact Name*</Form.Label>
              <Form.Control
                placeholder="Contact Name"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="form-error">{formik.errors.name}</div>
              ) : null}
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Phone Number*</Form.Label>
              <Form.Control
                placeholder="(123) 456-7890"
                {...formik.getFieldProps("phoneNumber")}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <div className="form-error">{formik.errors.phoneNumber}</div>
              ) : null}
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3" controlId="formGridEmail">
              <Form.Label>Email*</Form.Label>
              <Form.Control
                placeholder="someone@example.com"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="form-error">{formik.errors.email}</div>
              ) : null}
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="formGridType">
              <Form.Label>Type*</Form.Label>
              <Form.Control {...formik.getFieldProps("type")} />
              {formik.touched.type && formik.errors.type ? (
                <div className="form-error">{formik.errors.type}</div>
              ) : null}
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="formGridRole">
              <Form.Label>Role*</Form.Label>
              <Form.Control as="textarea" {...formik.getFieldProps("role")} />
              {formik.touched.role && formik.errors.role ? (
                <div className="form-error">{formik.errors.role}</div>
              ) : null}
            </Form.Group>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
