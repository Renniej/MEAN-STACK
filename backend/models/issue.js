
var mongoose = require('mongoose')

var IssueSchema = mongoose.Schema({


    title: String,
    responsible : String,
    description : String,
    severity : String,
    status : {
        type : String,
        default : 'Open'
    }


}, { collection: 'Issues' });

  var IssueModel = mongoose.model('Issues', IssueSchema);

 module.exports = IssueModel;