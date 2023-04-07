import React from 'react';
import { PDFDocument, rgb} from 'pdf-lib';
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
  const introduction = `Emergency situations may arise at any time during athletic events. To provide the best possible care to the sport participant during emergency and/or life-threatening conditions, quick and expedient action must be taken. The development and implementation of an emergency action plan will help ensure that the best care will be provided. As emergencies may occur at any time during an activity, the athletic department must be prepared. Athletic organizations have a duty to develop an emergency plan that may be implemented immediately when necessary and to provide appropriate standards of emergency care to all sports participants. This preparation involves formulation of an emergency plan, proper coverage of events, maintenance of appropriate emergency equipment and supplies, utilization of appropriate emergency medical personnel, and continuing education in emergency medicine and planning. Hopefully, through careful pre-participation physical screenings, adequate medical coverage, safe practice and training techniques and other safety avenues, some potential emergencies may be averted. However, accidents and injuries are inherent with sports participation, and proper preparation on the part of the sports medicine team should enable each emergency to be managed appropriately.`;

  // Create a new PDFDocument instance
  const doc = await PDFDocument.create();
  // Set the document title
  doc.setTitle(`${eapObject.venueName}`);
  // Set the document author
  doc.setAuthor(`${eapObject.contact.name}`);



  const front_page = doc.addPage();
  front_page.drawText(`${eapObject.group}`, { x: 100, y: 700, size: 40});
  front_page.drawText(`Athletic Department`, { x: 150, y: 650, size: 30});
  front_page.drawText(`Emergency Action Plan`, { x: 100, y: 200, size: 35});
  front_page.drawText(`(2023-2024)`, { x: 200, y: 150, size: 30});

  const page1 = doc.addPage();
  page1.drawText(`${eapObject.venueName}`, { x: 50, y: 780, size: 25, color: rgb(0,0,1)});
  page1.drawText(`Introduction`, { x: 50, y: 730, size: 18, underline: true, bold: true});
  page1.drawText(introduction, {
    x: 50,
    y: 700,
    size: 10,
    maxWidth: 500,
    maxHeight: 500,
  });
  page1.drawText(`The terms Athletic Trainer and ATC are used interchangeably throughout this plan.`, { x: 50, y: 390, size: 10});
  page1.drawText(`Components of The Emergency Action Plan `, { x: 50, y: 330, size: 18, underline: true, bold: true});
  page1.drawText(`1. Emergency Personnel and Roles`, { x: 100, y: 300, size: 10});
  page1.drawText(`2. Emergency Communication`, { x: 100, y: 280, size: 10});
  page1.drawText(`3. Emergency Equipment `, { x: 100, y: 260, size: 10});
  page1.drawText(`4. Emergency Transportation `, { x: 100, y: 240, size: 10});
  page1.drawText(`Emergency Personnel and Roles`, { x: 50, y: 200, size: 18});
  page1.drawText(`All members of the Athletic Department and all head and assistant coaches will be required to 
have current CPR/AED certifications.`, { x: 50, y: 170, size: 10});
  page1.drawText(`${bullet} ${eapObject.contact.name} - ${eapObject.contact.type} 
  ${eapObject.contact.phoneNumber} (Cell) ${eapObject.contact.email}`, { x: 100, y: 120, size: 10, color: rgb(0,0,1) });

  // Add a new page to the document
  const page = doc.addPage();

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
  page2.drawText(`Venue-Specific Emergency Action Plans `, { x: 50, y: 750, size: 18  });
  page2.drawText(`${eapObject.address.streetAddress}, ${eapObject.address.city}, ${eapObject.address.state}, ${eapObject.address.country} ${eapObject.address.zipCode}  `, { x: 100, y: 720, size: 10  });
  // Draw the image onto the page
  const image = await doc.embedPng(eapObject.image);
  const imageSize = image.scale(1.1);
  page2.drawImage(image, {
    x: page.getWidth() / 2 - imageSize.width / 2,
    y: 200,
    width: imageSize.width,
    height: imageSize.height,
  });

  const acknowledgemnt = doc.addPage();
  acknowledgemnt.drawText(`Acknowledgement of EAP`, { x: 200, y: 750, size: 18  });
  acknowledgemnt.drawText(`By signing this, it states that you have read and understand the policies and procedures of The 
${eapObject.group} Emergency Action Plan. By signing, you understand to operate and 
follow these policies and procedures in the event of an emergency.`, { x: 100, y: 700, size: 10  })
  acknowledgemnt.drawText(`Name:                                                                                                    Date:`, { x: 50, y: 600, size: 10  });
  acknowledgemnt.drawText(`__________________________________________________           _________________________`, { x: 50, y: 595, size: 10, color: rgb(0,0,1)});
  acknowledgemnt.drawText(`Name:                                                                                                    Date:`, { x: 50, y: 545, size: 10  });
  acknowledgemnt.drawText(`__________________________________________________           _________________________`, { x: 50, y: 540, size: 10, color: rgb(0,0,1)});
  acknowledgemnt.drawText(`Name:                                                                                                    Date:`, { x: 50, y: 490, size: 10  });
  acknowledgemnt.drawText(`__________________________________________________           _________________________`, { x: 50, y: 485, size: 10, color: rgb(0,0,1)});
  acknowledgemnt.drawText(`Name:                                                                                                    Date:`, { x: 50, y: 435, size: 10  });
  acknowledgemnt.drawText(`__________________________________________________           _________________________`, { x: 50, y: 430, size: 10, color: rgb(0,0,1)});
  acknowledgemnt.drawText(`Name:                                                                                                    Date:`, { x: 50, y: 380, size: 10  });
  acknowledgemnt.drawText(`__________________________________________________           _________________________`, { x: 50, y: 375, size: 10, color: rgb(0,0,1)});

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
