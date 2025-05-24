import { ArrowDown } from 'lucide-react';
import React from 'react';
import { useState } from 'react';

const FormattedBlogContent = ({ content }) => {
    const [showFull, setShowFull] = useState(false);

    if (!content) return null;

    //  normalize line breaks
    content = content.replace(/\r\n/g, '\n')

    //extract numbered sections with full paragraphs
    const matches = [...content.matchAll(/(\d{1,2}\. .*?)(?=\n\d{1,2}\. |\n Conclusion|$)/gs)]
    const numberedPoints = matches?.map(match => match[1].trim()).filter(Boolean) || [];
    // extract conclusion
    const conclusionMatch = content.match(/Conclusion(.*)/s);
    const conclusion = conclusionMatch ? conclusionMatch[0].replace("Conclusion", "").trim() : null;



    // if no numbered points and no conclusion
    if(!numberedPoints.length === 0 && !conclusion){
        return (
            <div className='text-[#7E7E81] text-center'>
                Blog Content is not formatted
            </div>
        )
    }
    // First section is heading if it doesn't start with "1."
    let heading = "";
    if (numberedPoints?.length > 0 && numberedPoints[0].startsWith("1.") === false) {

        heading = numberedPoints.shift().trim(); // remove heading from sections
    }
    // short version for first 4 points
    const visiblePoints = showFull ? numberedPoints : numberedPoints.slice(0, 4);

    return (
        <div className='text-white space-y-6 leading-7'>


            {/* numbered points */}
            {visiblePoints.map((point, index) => {
                const [titleLine, ...rest] = point.trim().split("\n");
                const description = rest.join(" ");
                return (
                    <div key={index} >
                        <p className="font-semibold text-white  text-lg">{titleLine.trim()}</p>
                        <p className="text-[#7E7E81] mt-1">{description.trim()}</p>
                    </div>
                )
            })}
             {/* read full blog  */}
            {
                !showFull && numberedPoints.length > 4 && (
                    <div className='flex justify-center mt-4'>
                        <button
                            onClick={() => setShowFull(true)}
                            className="mt-4 px-4 flex items-center gap-2 py-2 bg-[#333333] hover:bg-[#FFD11A] hover:text-black cursor-pointer  text-sm text-[#7E7E81] rounded transition"
                        >
                            Read Full Blog
                            <ArrowDown className='hover:text-black' />
                        </button>
                    </div>

                )
            }

            {/* conclusion */}
            {showFull && conclusion && (
                <div className="mt-8 border-t border-gray-600 pt-6">
                    <h3 className="text-xl font-bold">Conclusion</h3>
                    <p className="text-[#7E7E81] mt-2">
                        {conclusion}
                    </p>
                </div>
            )}


        </div>
    );
}

export default FormattedBlogContent;

