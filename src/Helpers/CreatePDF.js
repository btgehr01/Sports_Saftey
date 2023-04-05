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

const CreatePDF = async ({eapObject}) => {

  const bullet = '\u2022';

  // Create a new PDFDocument instance
  const doc = await PDFDocument.create();

  // Set the document title
  doc.setTitle(`${eapObject.venueName}`);

  // Set the document author
  doc.setAuthor(`${eapObject.contact.name}`);

  const front_page = doc.addPage();

  front_page.drawText(`${eapObject.group}`, { x: 150, y: 700, size: 40});
  front_page.drawText(`Athletic Department`, { x: 200, y: 650, size: 30});

  front_page.drawText(`Emergency Action Plan`, { x: 150, y: 200, size: 35});
  front_page.drawText(`(2023-2024)`, { x: 300, y: 150, size: 30});

  // Add a new page to the document
  const page = doc.addPage();

  // Add content to the page
  page.drawText(`${eapObject.venueName}`, { x: 50, y: 780, size: 20});

  page.drawText('Emergency Personnel', { x: 75, y: 730, size: 14 });
  page.drawText(`${bullet} Athletic trainer, coaches, administrators`, { x: 100, y: 700, size: 10});

  page.drawText('Emergency Communication', { x: 75, y: 650, size: 14 });
  page.drawText(`${bullet} Mobile phone carried by the ${eapObject.contact.type} (${eapObject.contact.name}):  ${eapObject.contact.phoneNumber}`, { x: 100, y: 620, size: 10 });

  page.drawText('Emergency Equipment', { x: 75, y: 570, size: 14  });
  page.drawText(`${bullet} Basic first aid kit including tools for extraction of equipment, AED.`, { x: 100, y: 540, size: 10 });

  page.drawText('Roles of the First Responders', { x: 75, y: 490, size: 14  });
  page.drawText('1) Immediate care of the injured athlete or ill student (Most qualified at the scene shall assume this role)', { x: 100, y: 460, size: 10  });
  page.drawText('2) Emergency equipment retrieval – coaches, available personnel.', { x: 100, y: 430, size: 10  });
  page.drawText('3) Activation of EMS – student, coach, or administrator.', { x: 100, y: 400, size: 10  });
  page.drawText('a) 911 call (provide name, address, telephone number; number of individuals injured; condition of injured; first aid treatment;', { x: 150, y: 380, size: 9  });
  page.drawText('first aid treatment; specific directions; other information as requested)', { x: 150, y: 360, size: 9  });
  page.drawText('b) Notify parents as soon as possible (Consent papers have parent contact numbers)', { x: 150, y: 340, size: 9  });

  const page2 = doc.addPage();

  page2.drawText(`${eapObject.address.streetAddress}, ${eapObject.address.city}, ${eapObject.address.state}, ${eapObject.address.country} ${eapObject.address.zipCode}  `, { x: 150, y: 700, size: 10  });

  // Draw the image onto the page
  const image = await doc.embedPng(eapObject.image);
  const imageSize = image.scale(0.75);
  page2.drawImage(image, {
    x: page.getWidth() / 2 - imageSize.width / 2,
    y: 360,
    width: imageSize.width,
    height: imageSize.height,
  });

  // Generate a unique file name for the PDF document
  const fileName = `${eapObject.org}/${eapObject.group}/${eapObject.venueName}.pdf`;

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

  return url;
};

export default CreatePDF;
