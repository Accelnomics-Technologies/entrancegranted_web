const joi = require("joi");
const multer = require('multer');
const upload = multer(); // Initialize multer
const {ticketSchema} = require("../../models/tickets")
var AWS = require('aws-sdk');
const { OpenAI } = require('openai');
const fs = require('fs');
const { getJSONFromImage } = require('../../utils/json_from_image');


/**
 * @api {POST} /api/auth/signup
 * @params user signup
 */
module.exports.getJson = async (req, res) => {


    const processedData = await getJSONFromImage(req?.files?.imagePath?.tempFilePath);

    await ticketSchema.create({
      sportName:processedData.exact_sport_name,
      eventName:processedData.event_name_or_league_name,
      homeTeam:processedData.teams_played.home,
      awayTeam:processedData.teams_played.away,
      venue:processedData.venue,
      price:processedData.price,
      date:processedData.date,
      time:processedData.time,
      imageLocation:req?.files?.imagePath?.tempFilePath,
      gameDetails:processedData.Memorable_Moments
    })
  
    
    res.status(200).json({ message: 'Data processed successfully',processedData });

};
