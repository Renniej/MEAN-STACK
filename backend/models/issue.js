import mongoose from 'mongoose';



var IssueSchema = mongoose.Schema({


    title: String,
    responsible : String,
    description : String,
    severity : String,
    status : {
        type : String,
        default : 'Open'
    }


});

export var IssueModel = mongoose.model('Issue', IssueSchema);