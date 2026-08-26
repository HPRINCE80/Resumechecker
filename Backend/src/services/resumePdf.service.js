const PDFDocument = require('pdfkit');
const { PassThrough } = require('stream');

function generateResumePdfBuffer(data, template = 'modern') {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const stream = new PassThrough();
    const chunks = [];

    doc.pipe(stream);
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);

    template === 'minimal' ? renderMinimalTemplate(doc, data) : renderModernTemplate(doc, data);

    doc.end();
  });
}

function sectionTitle(doc, title, color) {
  doc.font('Helvetica-Bold').fontSize(13).fillColor(color).text(title.toUpperCase());
  doc.moveDown(0.4);
}

function renderModernTemplate(doc, data) {
  const accent = '#ff2d78';

  doc.rect(0, 0, doc.page.width, 110).fill('#0d1117');
  doc.fillColor('#ffffff').fontSize(26).font('Helvetica-Bold')
    .text(data.fullName || 'Your Name', 50, 35);
  doc.fontSize(10).fillColor('#c9d1d9').font('Helvetica')
    .text(`${data.email || ''}  •  ${data.phone || ''}  •  ${data.location || ''}`, 50, 72);

  doc.y = 140;
  doc.fillColor('#000000');

  if (data.summary) {
    sectionTitle(doc, 'Summary', accent);
    doc.font('Helvetica').fontSize(10.5).fillColor('#333').text(data.summary);
    doc.moveDown(1);
  }

  if (data.experience?.length) {
    sectionTitle(doc, 'Experience', accent);
    data.experience.forEach((exp) => {
      doc.font('Helvetica-Bold').fontSize(11).fillColor('#000').text(`${exp.role} — ${exp.company}`);
      doc.font('Helvetica').fontSize(9).fillColor('#7d8590').text(`${exp.startDate} - ${exp.endDate || 'Present'}`);
      doc.font('Helvetica').fontSize(10).fillColor('#333').text(exp.description || '');
      doc.moveDown(0.7);
    });
  }

  if (data.education?.length) {
    sectionTitle(doc, 'Education', accent);
    data.education.forEach((edu) => {
      doc.font('Helvetica-Bold').fontSize(11).fillColor('#000').text(`${edu.degree} — ${edu.institution}`);
      doc.font('Helvetica').fontSize(9).fillColor('#7d8590').text(`${edu.startDate} - ${edu.endDate || ''}`);
      doc.moveDown(0.5);
    });
  }

  if (data.skills?.length) {
    sectionTitle(doc, 'Skills', accent);
    doc.font('Helvetica').fontSize(10).fillColor('#333').text(data.skills.join('   •   '));
    doc.moveDown(1);
  }

  if (data.projects?.length) {
    sectionTitle(doc, 'Projects', accent);
    data.projects.forEach((proj) => {
      doc.font('Helvetica-Bold').fontSize(11).fillColor('#000').text(proj.title);
      doc.font('Helvetica').fontSize(10).fillColor('#333').text(proj.description || '');
      doc.moveDown(0.5);
    });
  }

  if (data.certifications?.length) {
    sectionTitle(doc, 'Certifications', accent);
    data.certifications.forEach((cert) => doc.font('Helvetica').fontSize(10).fillColor('#333').text(`• ${cert}`));
  }
}

function renderMinimalTemplate(doc, data) {
  const plainSection = (title) => {
    doc.font('Helvetica-Bold').fontSize(12).fillColor('#000').text(title.toUpperCase());
    doc.moveDown(0.3);
  };

  doc.font('Helvetica-Bold').fontSize(22).fillColor('#000').text(data.fullName || 'Your Name');
  doc.font('Helvetica').fontSize(10).fillColor('#555')
    .text(`${data.email || ''}   |   ${data.phone || ''}   |   ${data.location || ''}`);
  doc.moveDown(1);
  doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor('#ddd').stroke();
  doc.moveDown(1);

  if (data.summary) {
    plainSection('Summary');
    doc.font('Helvetica').fontSize(10).fillColor('#333').text(data.summary);
    doc.moveDown(1);
  }

  if (data.experience?.length) {
    plainSection('Experience');
    data.experience.forEach((exp) => {
      doc.font('Helvetica-Bold').fontSize(10.5).fillColor('#000')
        .text(`${exp.role}, ${exp.company} (${exp.startDate} - ${exp.endDate || 'Present'})`);
      doc.font('Helvetica').fontSize(10).fillColor('#333').text(exp.description || '');
      doc.moveDown(0.6);
    });
  }

  if (data.education?.length) {
    plainSection('Education');
    data.education.forEach((edu) => {
      doc.font('Helvetica').fontSize(10).fillColor('#333')
        .text(`${edu.degree}, ${edu.institution} (${edu.startDate} - ${edu.endDate || ''})`);
    });
    doc.moveDown(1);
  }

  if (data.skills?.length) {
    plainSection('Skills');
    doc.font('Helvetica').fontSize(10).fillColor('#333').text(data.skills.join(', '));
    doc.moveDown(1);
  }

  if (data.projects?.length) {
    plainSection('Projects');
    data.projects.forEach((proj) => {
      doc.font('Helvetica-Bold').fontSize(10.5).fillColor('#000').text(proj.title);
      doc.font('Helvetica').fontSize(10).fillColor('#333').text(proj.description || '');
      doc.moveDown(0.5);
    });
  }

  if (data.certifications?.length) {
    plainSection('Certifications');
    data.certifications.forEach((cert) => doc.font('Helvetica').fontSize(10).text(`- ${cert}`));
  }
}

module.exports = { generateResumePdfBuffer };