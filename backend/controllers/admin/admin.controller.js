const joi = require("joi");
const multer = require('multer');
const upload = multer(); // Initialize multer
const {ticketSchema} = require("../../models/tickets")
var AWS = require('aws-sdk');
const { OpenAI } = require('openai');
const fs = require('fs');
const { getJSONFromImage } = require('../../utils/json_from_image');


/**
 * @api {POST} /api/admin/get_json
 * @params user signup
 */
module.exports.getJson = async (req, res) => {

    try {
        const processedData = await getJSONFromImage(req?.files?.imagePath?.tempFilePath);
    
        await ticketSchema.create({
          sportName: processedData.exact_sport_name,
          eventName: processedData.event_name_or_league_name,
          homeTeam: processedData.teams_played.home,
          awayTeam: processedData.teams_played.away,
          venue: processedData.venue,
          price: processedData.price,
          date: processedData.date,
          time: processedData.time,
          imageLocation: req?.files?.imagePath?.tempFilePath,
          gameDetails: processedData.Memorable_Moments
        });
  
    
    res.status(200).json({ message: 'Data processed successfully',processedData });
 } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

/**
 * @api {GET} /api/admin/tickets
 * @params user signup
 */
module.exports.getTicket = async (req, res) => {
    try {
        // Get the ticket ID from the request parameters
        const ticketId = req.query.ticket_id;
    
        // Find the ticket by ID in the MongoDB collection
        const ticket = await ticketSchema.findById(ticketId);
    
        // If the ticket is not found, return a 404 Not Found response
        if (!ticket) {
          return res.status(404).json({ error: 'Ticket not found' });
        }
    
        // If the ticket is found, return it as a JSON response
        res.json(ticket);
      } catch (err) {
        // If an error occurs, return a 500 Internal Server Error response
        console.error('Error fetching ticket:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }

};


/**
 * @api {GET} /api/admin/all_tickets
 * @params user signup
 */
module.exports.getAlltickets = async (req, res) => {
    try {
        // Fetch all tickets from the database
        const tickets = await ticketSchema.find({});
        res.json(tickets); // Send the tickets as JSON response
      } catch (err) {
        console.error('Error fetching tickets:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }

};


/**
 * @api {POST} /api/admin/del_tickets
 * @params user signup
 */
module.exports.deleteTicket = async (req, res) => {
    try {
        // Get the ticket ID from the request parameters
        const ticketId = req.query.ticket_id;
    
        // Delete the ticket by ID in the MongoDB collection
        const result = await ticketSchema.findByIdAndDelete(ticketId);
    
        // If the ticket is not found, return a 404 Not Found response
        if (!result) {
          return res.status(404).json({ error: 'Ticket not found' });
        }
    
        // If the ticket is found and deleted, return a success message
        res.json({ message: 'Ticket successfully deleted' });
      } catch (err) {
        // If an error occurs, return a 500 Internal Server Error response
        console.error('Error deleting ticket:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
};


/**
 * @api {POST} /api/admin/update_tickets
 * @params user signup
 */
module.exports.updateTicket = async (req, res) => {
    try {
        // Get the ticket ID from the request parameters
        const ticketId = req.query.ticket_id;
    
        // Get the new data for the ticket from the request body
        const newData = {
          sportName: req.body.sportName,
          eventName: req.body.eventName,
          homeTeam: req.body.homeTeam,
          awayTeam: req.body.awayTeam,
          venue: req.body.venue,
          price: req.body.price,
          date: req.body.date,
          time: req.body.time,
          imageLocation: req.body.imageLocation,
          gameDetails: req.body.gameDetails
        };
    
        // Update the ticket by ID in the MongoDB collection
        const ticket = await ticketSchema.findByIdAndUpdate(ticketId, newData, { new: true });
    
        // If the ticket is not found, return a 404 Not Found response
        if (!ticket) {
          return res.status(404).json({ error: 'Ticket not found' });
        }
    
        // If the ticket is found and updated, return the updated ticket
        res.json(ticket);
      } catch (err) {
        // If an error occurs, return a 500 Internal Server Error response
        console.error('Error updating ticket:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }

 
};