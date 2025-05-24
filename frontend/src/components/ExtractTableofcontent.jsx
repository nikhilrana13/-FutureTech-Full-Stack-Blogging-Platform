import React from 'react';

const ExtractTableofcontent = ({content}) => {
    if(!content || typeof content !== 'string'){
        return [];
    }

 // Normalize line breaks
    content = content.replace(/\r\n/g, '\n')
// Fix line breaks between number and title 
  content = content.replace(/(\d{1,2}\.)\s*\n\s*/g, '$1 ');
//Match each section that starts with 1. 2. 3.and captures till next numbered point or conclusion
const matches = [...content.matchAll(/(\d{1,2}\.\s[\s\S]*?)(?=\n\d{1,2}\. |\n🎯Conclusion|$)/g)];
 // if no numbered poinst return empty array
 if(matches.length === 0) return [];
// Extract only the title line first line of each section 
  const headings = matches.map(match => {
    const section = match[1].trim();
    const [titleLine] = section.split("\n");
    return titleLine.trim();
  });

  return headings;
}

export default ExtractTableofcontent;
