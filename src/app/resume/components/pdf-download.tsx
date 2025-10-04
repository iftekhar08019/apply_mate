"use client";

import { useRef } from 'react';
import toast from 'react-hot-toast';
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
      toast.error('Resume content not found. Please try again.');
      return;
    }

    const toastId = toast.loading('Generating PDF...');

    try {
      // Show loading state
      const button = document.querySelector('[data-pdf-button]') as HTMLButtonElement;
      if (button) {
        button.disabled = true;
        button.textContent = 'Generating PDF...';
      }

      // Wait a bit for any pending renders
      await new Promise(resolve => setTimeout(resolve, 100));

      // Create canvas with higher quality and exact dimensions matching preview
      const canvas = await html2canvas(element, {
        scale: 3, // Higher scale for better quality (increased from 2 to 3)
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: element.offsetWidth,
        height: element.offsetHeight,
        windowWidth: element.offsetWidth,
        windowHeight: element.offsetHeight,
        scrollX: 0,
        scrollY: -window.scrollY,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById('resume-content');
          if (clonedElement) {
            // Ensure all styles are properly applied in the clone - match resume-preview exactly
            clonedElement.style.fontFamily = 'Calibri, Arial, sans-serif';
            clonedElement.style.fontSize = '11pt';
            clonedElement.style.lineHeight = '1.2';
            clonedElement.style.width = '210mm';
            clonedElement.style.maxWidth = '210mm';
            clonedElement.style.minHeight = '297mm';
            clonedElement.style.margin = '0 auto';
            clonedElement.style.padding = '15mm';
            clonedElement.style.boxSizing = 'border-box';
            clonedElement.style.background = '#ffffff';
            clonedElement.style.color = '#000000';
            
            // Ensure all text elements render properly
            const allElements = clonedElement.querySelectorAll('*');
            allElements.forEach((el: any) => {
              // Force render all elements
              if (el.style) {
                el.style.webkitPrintColorAdjust = 'exact';
                el.style.printColorAdjust = 'exact';
              }
            });
          }
        }
      });

      // Create PDF with exact A4 dimensions
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      // Get A4 dimensions in mm (210 x 297)
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate image dimensions to fit exactly on A4
      const imgData = canvas.toDataURL('image/png', 1.0);
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      // Calculate the ratio to fit the content on A4
      const ratio = Math.min(pdfWidth / (imgWidth / (canvas.width / element.scrollWidth)), 
                              pdfHeight / (imgHeight / (canvas.height / element.scrollHeight)));
      
      const finalWidth = pdfWidth;
      const finalHeight = (imgHeight * pdfWidth) / imgWidth;
      
      // If content is taller than one page, we might need multiple pages
      if (finalHeight > pdfHeight) {
        let position = 0;
        const pageHeight = (canvas.height * pdfWidth) / canvas.width;
        
        while (position < finalHeight) {
          const pageCanvas = document.createElement('canvas');
          pageCanvas.width = canvas.width;
          pageCanvas.height = Math.min(canvas.height, (canvas.width * pdfHeight) / pdfWidth);
          
          const ctx = pageCanvas.getContext('2d');
          if (ctx) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
            ctx.drawImage(
              canvas,
              0,
              (position / finalHeight) * canvas.height,
              canvas.width,
              pageCanvas.height,
              0,
              0,
              pageCanvas.width,
              pageCanvas.height
            );
            
            const pageImgData = pageCanvas.toDataURL('image/png', 1.0);
            if (position > 0) {
              pdf.addPage();
            }
            pdf.addImage(pageImgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          }
          
          position += pdfHeight;
        }
      } else {
        // Single page - center it
        pdf.addImage(imgData, 'PNG', 0, 0, finalWidth, finalHeight);
      }

      // Download PDF
      const safeFileName = fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      pdf.save(`${safeFileName || 'resume'}.pdf`);
      
      toast.success('PDF downloaded successfully!', { id: toastId, icon: '📄' });
      
      // Reset button state
      if (button) {
        button.disabled = false;
        button.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> Download PDF';
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF. Trying fallback method...', { id: toastId });
      
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
          toast.success('Print dialog opened. Save as PDF from there.', { id: toastId, icon: '🖨️' });
        } else {
          toast.error('Please use Ctrl+P (Cmd+P on Mac) to print and save as PDF', { id: toastId });
        }
      } catch (fallbackError) {
        console.error('Fallback method also failed:', fallbackError);
        toast.error('Please use Ctrl+P (Cmd+P on Mac) to print and save as PDF', { id: toastId });
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
      className="flex items-center gap-2 bg-gradient-to-r from-[#0439e6] to-[#0051ff] text-white px-5 py-2.5 rounded-lg font-semibold transition duration-300 hover:from-[#0051ff] hover:to-[#0439e6] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
    >
      <Download size={18} />
      Download PDF
    </button>
  );
}
