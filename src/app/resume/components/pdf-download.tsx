"use client";

import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download } from 'lucide-react';

interface PDFDownloadProps {
  fileName?: string;
}

export default function PDFDownload({ fileName = 'resume' }: PDFDownloadProps) {
  const resumeRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    const element = document.getElementById('resume-content');
    if (!element) {
      console.error('Resume content element not found');
      alert('Resume content not found. Please try again.');
      return;
    }

    try {
      // Show loading state
      const button = document.querySelector('[data-pdf-button]') as HTMLButtonElement;
      if (button) {
        button.disabled = true;
        button.textContent = 'Generating PDF...';
      }

      // Wait a bit for any pending renders
      await new Promise(resolve => setTimeout(resolve, 100));

      // Create canvas with high quality
      const canvas = await html2canvas(element, {
        scale: 1.5, // Reduced scale for better compatibility
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: element.offsetWidth,
        height: element.offsetHeight,
        scrollX: 0,
        scrollY: 0,
      });

      // Create PDF
      const imgData = canvas.toDataURL('image/png', 0.95);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Get A4 dimensions in mm
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate image dimensions to fit A4
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      
      // Center the image on the page
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      // Add image to PDF
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);

      // Download PDF
      const safeFileName = fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      pdf.save(`${safeFileName || 'resume'}.pdf`);
      
      // Reset button state
      if (button) {
        button.disabled = false;
        button.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> Download PDF';
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      
      // Try fallback method
      try {
        const button = document.querySelector('[data-pdf-button]') as HTMLButtonElement;
        if (button) {
          button.textContent = 'Trying alternative method...';
        }

        // Simple fallback - just print the page
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(`
            <html>
              <head>
                <title>Resume - ${fileName}</title>
                <style>
                  body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
                  @media print { body { margin: 0; padding: 0; } }
                </style>
              </head>
              <body>
                ${element.outerHTML}
              </body>
            </html>
          `);
          printWindow.document.close();
          printWindow.print();
        } else {
          alert('Please use your browser\'s print function (Ctrl+P) to save as PDF');
        }
      } catch (fallbackError) {
        console.error('Fallback method also failed:', fallbackError);
        alert('PDF generation failed. Please use your browser\'s print function (Ctrl+P) to save as PDF');
      }
      
      // Reset button state
      const button = document.querySelector('[data-pdf-button]') as HTMLButtonElement;
      if (button) {
        button.disabled = false;
        button.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> Download PDF';
      }
    }
  };

  return (
    <button
      data-pdf-button
      onClick={downloadPDF}
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md transition-colors font-medium"
    >
      <Download size={16} />
      Download PDF
    </button>
  );
}
