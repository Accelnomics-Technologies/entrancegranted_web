var AWS = require('aws-sdk');
const { OpenAI } = require('openai');
const fs = require('fs');


// Replace 'YOUR_API_KEY' with your actual OpenAI API key
require('dotenv').config();
const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: apiKey });
const config = new AWS.Config({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }) 
AWS.config.update({region:'us-west-2'});
const rekognition = new AWS.Rekognition();

const  extractTextFromImage=async(photo)=> {
    // Read the image file
    const imageBytes = fs.readFileSync(photo);
  
    // Use AWS Rekognition to detect text
    const params = {
      Image: {
        Bytes: imageBytes
      }
    };
    
    try {
      const response = await rekognition.detectText(params).promise();
      const textDetections = response.TextDetections;
      
      const extractedText = textDetections
        .filter(text => !text.ParentId)
        .map(text => text.DetectedText)
        .join("\n");
      
      return extractedText;
    } catch (error) {
      console.error("Error detecting text: ", error);
      return null;
    }
  }


const getJson=async (prompt)=> {
    let user_content = `${prompt} \nThe given text is extracted from a ticket stub image, review the details of the game and create a JSON object in the following format. The field "Memorable_Moments" should encapsulate all the essence of significant sporting events, including extraordinary feats, unexpected outcomes, big player appearances and emotional highlights. This encompasses game-winning shots, breakthrough performances, record-breaking achievements, iconic rivalries, comebacks, retirement farewells, historic firsts, acts of sportsmanship, unexpected triumphs, final score and personal triumphs over adversity. Ensure inclusion of final scores, historical context, and relevant details. Make sure to keep the field "Memorable_Moments" non empty. If any information is not available from the ticket or event details, leave it as null. Make sure to fill in what you can for partial information.\n\n<format>\n{\n "event_name_or_league_name": "", # e.g., "Premier League", "World Cup", "Olympics", etc.\n "exact_sport_name": "", # e.g., "Men's Basketball", "Women's American Football", "Men's Cricket", etc.\n "teams_played": {\n   "home": "",\n   "away": ""\n },\n "date": "", # in YYYY-MM-DD format\n "time": "", # in HH:MM (12-hour format)\n "price": "", # in the given currency\n "venue": "",\n "Memorable_Moments": [ ] # List of all the moments in string format. Make sure to keep it non-empty.\n}\n</format>\nIf any of the field in the JSON object is not obtained from the given text data, keep it as Null. If only partial information is available, fill in what you can and leave the rest as Null.`;

  const completion = await openai.chat.completions.create({
    messages: [
        { role: "system", content: "You are a helpful assistant designed to output JSON." },
        { role: "user", content: user_content }
      ],
    model: "gpt-4-1106-preview",
    temperature: 0.1,
  });

  const data = completion.choices[0].message.content;
  const pattern = /\{(?:.|\n)*\}/;
  const match = data.match(pattern);
  if (match){
    let json = JSON.parse(match[0]);
    if (json['Memorable_Moments']){
        json['Memorable_Moments'] = json['Memorable_Moments'].join('\n');
        return json;
    }
  }
  
}


// Function to get JSON from image
 module.exports.getJSONFromImage=async (imagePath)=>{
    try {
        const extractedText = await extractTextFromImage(imagePath);
        return await getJson(extractedText);
    } catch (error) {
        console.error("Error extracting JSON from image:", error);
    }
}

