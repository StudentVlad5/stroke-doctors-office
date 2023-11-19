import React from 'react';
import mammoth from 'mammoth';

export const Word = () => {
  const htmlData = '<p>Hello, this is a Word document!</p>';

  const downloadWord = () => {
    mammoth
      .extractRawText({ arrayBuffer: new TextEncoder().encode(htmlData) })
      .then(result => {
        const data = new Blob([result.value], {
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(data);
        link.download = 'yourDocument.docx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <button onClick={downloadWord}>Download Word</button>
    </div>
  );
};
