import React, { useState, useEffect } from "react";

const AnimateText = ({ text }: { text: string }) => {
   const [showText, setShowText] = useState("");

   useEffect(() => {
      let currentText = "";
      const displayText = async () => {
         for (let i = 0; i < text.length; i++) {
            currentText += text[i];
            setShowText(currentText);
            await new Promise((resolve) => setTimeout(resolve, 150));
         }
      };

      displayText();
   }, [text]);

   return (
      <div className="flex items-center justify-center">
         <h1 className="text-lg text-center ">{showText}</h1>
      </div>
   );
};

export default AnimateText;
