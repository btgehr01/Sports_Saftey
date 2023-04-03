import React from 'react';
import { PDFDocument } from 'pdf-lib';
import AWS from 'aws-sdk';

const key =  process.env.REACT_APP_MY_ACCESS_KEY_ID;
const secretkey =  process.env.REACT_APP_MY_SECRET_ACCESS_KEY;
const S3_BUCKET = 'eap-storage-bucket';
const REGION = 'us-east-1';

const s3 = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
  accessKeyId: key,
  secretAccessKey: secretkey,
});

const CreatePDF = async ({data}) => {

  console.log(data)

  // Create a new PDFDocument instance
  
  const doc = await PDFDocument.create();

  // Set the document title
  doc.setTitle(`${data.address.venueName}`);

  // Set the document author
  doc.setAuthor(`${data.contact.name}`);

  // Add a new page to the document
  const page = doc.addPage();

  // Add content to the page
  page.drawText(`Venue Name: ${data.address.venueName}`, { x: 50, y: 750 });
  page.drawText(`Address: ${data.address.streetAddress}`, { x: 50, y: 730 });
  page.drawText(`Address 2: ${data.address.streetAddress2}`, { x: 50, y: 710 });
  page.drawText(`City: ${data.address.city}`, { x: 50, y: 690 });
  page.drawText(`State: ${data.address.state}`, { x: 50, y: 670 });
  page.drawText(`Country: ${data.address.country}`, { x: 50, y: 650 });
  page.drawText(`Zip Code: ${data.address.zipCode}`, { x: 50, y: 630 });
  page.drawText(`Contact Name: ${data.contact.name}`, { x: 50, y: 610 });
  page.drawText(`Phone Number: ${data.contact.phoneNumber}`, { x: 50, y: 590 });
  page.drawText(`Email: ${data.contact.email}`, { x: 50, y: 570 });
  page.drawText(`Contact Type: ${data.contact.type}`, { x: 50, y: 550 });
  page.drawText(`Contact Role: ${data.contact.role}`, { x: 50, y: 530 });

  // Generate a unique file name for the PDF document
  const fileName = `${data.address.venueName}.pdf`;

  const pdfBytes = await doc.save();

    // Upload the PDF to S3
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Body: pdfBytes,
      ContentType: 'application/pdf',
      ACL: 'public-read',
    };
    const s3Response = await s3.upload(s3Params).promise();

    // Once the PDF has been generated and uploaded, trigger a download in the browser
    const url = s3Response.Location;
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  return <button onClick={CreatePDF}>Create PDF</button>;
};

export default CreatePDF;
