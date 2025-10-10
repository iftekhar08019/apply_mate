"use client";

import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

interface PDFDownloadProps {
  fileName?: string;
}

export default function PDFDownload({ fileName = 'resume' }: PDFDownloadProps) {
  const resumeRef = useRef<HTMLDivElement>(null);
 const { data: session } = useSession();
  const downloadPDF = async () => {
     if (!session?.user) {
      toast.error("Please login first to download your resume.");
      return;
    }
    const element = document.getElementById('resume-content');
    if (!element) {
      // console.error('Resume content element not found');
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

      // Wait for any pending renders
      await new Promise(resolve => setTimeout(resolve, 500));

      // Capture the element exactly as it appears - no modifications
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false
      });

      // Create PDF with A4 dimensions
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      // Get A4 dimensions
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Convert canvas to image
      const imgData = canvas.toDataURL('image/png', 1.0);
      
      // Calculate dimensions to fit the canvas on PDF page
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      // Calculate aspect ratio
      const imgAspectRatio = imgWidth / imgHeight;
      const pdfAspectRatio = pdfWidth / pdfHeight;
      
      let finalWidth = pdfWidth;
      let finalHeight = pdfWidth / imgAspectRatio;
      
      // If height exceeds page, fit to height instead
      if (finalHeight > pdfHeight) {
        finalHeight = pdfHeight;
        finalWidth = pdfHeight * imgAspectRatio;
      }
      
      // Center the image on the page
      const xOffset = (pdfWidth - finalWidth) / 2;
      const yOffset = (pdfHeight - finalHeight) / 2;
      
      // Add image to PDF
      pdf.addImage(imgData, 'PNG', xOffset, yOffset, finalWidth, finalHeight);

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
      // console.error('Error generating PDF:', error);
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
        // console.error('Fallback method also failed:', fallbackError);
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
