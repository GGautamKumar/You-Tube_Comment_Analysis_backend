const { GoogleGenerativeAI } = require('@google/generative-ai');

const geminiApi = process.env.GEMINI_AI_API_KEY;

if (!geminiApi) {
    throw new Error("GEMINI_AI_API_KEY is missing in environment variables");
}

const aiResult =  async(comment, videoTitle) => {
    try {
        
        const genAI = new GoogleGenerativeAI(geminiApi);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        

    const prompt = `Analyze the following comment  and determine if it expresses agreement or disagreement. 
        Comment: ${comment} 
        Output: "Agree" if the comment expresses agreement or queston or unclear, "Disagree" if it expresses disagreement or hate speech or use bad words, or "Neutral" if it's unrelated.`;
    
        const result = await model.generateContent(prompt);
        const response =await  result.response;
        

        const text=await response.text();
        

        const lowerText =  text.toLowerCase();
       
        //console.log(typeof (lowerText));
        if (lowerText.includes("agree")) {//console.log("agree"); 
            return "Agree";}
        else
        if (lowerText.includes("disagree")) {//console.log("disagree"); 
            return "Disagree";}
        else
        return "Neutral";

    } catch (error) {
        //console.error("Error:", error);
        return "Error";
    }
};

/*
const aiResultComment = async (comments) => {
    try {
        const genAI = new GoogleGenerativeAI(geminiApi);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

       
        
        const promt =`Identify the top most recurring words  in all comments , excluding common stopwords (such as 'the','is','and', etc).
        Comments: ${comments},
        Output:in javascript Array formate
        `;
        

        const result = await model.generateContent(prompt);
       
        const response =await result.response;

        
        const text=response.text();
        
        return text;

    } catch (error) {
        console.error("Error:", error);
        return "Error";
    }
};

*/
const aiResultComment = async (comments) => {
    try {
        const genAI = new GoogleGenerativeAI(geminiApi);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Properly format comments
        const formattedComments = comments.join("\n");

        const prompt = `Identify the top most recurring words in the given comments, excluding common stopwords (such as 'the', 'is', 'and', etc).
        Provide the result in a JavaScript array format (e.g., ["word1", "word2", "word3"]).

        Comments:
        ${formattedComments}

        Output:`;

        // Generate response
        const result = await model.generateContent(prompt);
        const response = await result.response;

        // Extract the response text
        let text = await response.text();

       
        try {
            text = JSON.parse(text);
        } catch (jsonError) {
            console.warn("AI response is not a JSON array, returning raw text.");
        }
        
       // const wordsArray = text.split(",").map(word => word.trim());

        return text;

    } catch (error) {
        console.error("Error:", error);
        return "Error";
    }
};


exports.aiResult = aiResult;

exports.aiResultComment=aiResultComment;
