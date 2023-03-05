// Dependencies
var mongoose = require("mongoose");

// Schema
var teamSchema = new mongoose.Schema({
    Name_of_Player: {
        type: String
      },
    Role:{
        type: String
      },
    Batting_Style: {
        type: String
      },
    Bowling_Style: {
        type: String
      }
});

// Return model
module.exports = mongoose.model('Team', teamSchema,"team");

