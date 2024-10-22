function PdfViewer() {
    return (
      <div className="fixed top-16 bottom-0 left-0 right-0 w-full">
        <iframe
          src="/pdf/manual.pdf"
          className="w-full h-full"
          style={{ border: 'none' }}
          title="PDF Viewer"
        />
      </div>
    );
  }
  
  export default PdfViewer;