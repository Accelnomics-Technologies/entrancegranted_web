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
    let user_content = `${prompt} \nGiven Text: Extracted from a ticket stub image
    Task: Review the details of the game and create a JSON object in the following format:
    
    <format>
    {
        "event_name_or_league_name": "Name of the event or league, such as 'Premier League', 'World Cup', or 'Olympics'. If unavailable, leave as null.",
        "exact_sport_name": "The specific sport category, like 'Men's Basketball', 'Women's American Football', 'Men's Cricket'. If unspecified, leave as null.",
        "teams_played": {
            "home": "Name of the home team. If unknown, leave as null.",
            "away": "Name of the away team. If unknown, leave as null.",
        },
        "date": "The event date in YYYY-MM-DD format. If not provided, leave as null.",
        "time": "Start time of the event in HH:MM format (12-hour clock). If not mentioned, leave as null.",
        "price": "Ticket price with currency symbol (e.g., $2.40, £25.00,etc). If not mentioned, leave as null.",
        "venue": "Location of the event. If not provided, leave as null.",
        "Memorable_Moments": [ ] # List of all the moments in string format. Make sure to keep it non-empty.
    }
    </format>
    Instructions:
      1. Review the text extracted from the ticket stub image.
      2. Fill in the corresponding fields in the JSON object based on the available information.
      3. If only partial information is available, fill in what you can and use "null" for the rest.
      4. The field "Memorable_Moments" should encapsulate all the essence of significant sporting events, including extraordinary feats, unexpected outcomes, big player appearances and emotional highlights. This encompasses game-winning shots, breakthrough performances, record-breaking achievements, iconic rivalries, comebacks, retirement farewells, historic firsts, acts of sportsmanship, unexpected triumphs, final score and personal triumphs over adversity. Ensure inclusion of final scores, historical context, and relevant details. Make sure to keep the field "Memorable_Moments" non empty.
      5. Ensure the JSON object follows the specified format and nothing else.`;

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

