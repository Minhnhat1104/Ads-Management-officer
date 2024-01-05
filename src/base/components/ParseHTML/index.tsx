import React from 'react';

interface ParseHTMLProps {
  htmlContent: string;
}

const ParseHTML: React.FC<ParseHTMLProps> = ({ htmlContent }) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default ParseHTML;
