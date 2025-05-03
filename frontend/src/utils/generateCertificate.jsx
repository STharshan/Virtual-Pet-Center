import jsPDF from 'jspdf';

export function generateAdoptionCertificate(pet, adopterName = 'Valued Adopter') {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text('Certificate of Adoption', 60, 30);

  doc.setFontSize(12);
  doc.text(`This certifies that ${adopterName}`, 20, 50);
  doc.text(`has officially adopted`, 20, 60);
  doc.setFontSize(16);
  doc.text(`${pet.name} the ${pet.species}`, 20, 75);
  doc.setFontSize(12);
  doc.text(`on ${new Date().toLocaleDateString()}.`, 20, 85);

  doc.text(`We thank you for giving this pet a loving home.`, 20, 100);

  doc.setFontSize(10);
  doc.text('Virtual Pet Adoption Center', 20, 130);

  doc.save(`Adoption_Certificate_${pet.name}.pdf`);
}
