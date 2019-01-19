import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Issue from './models/issue'

const app = express();
const router = express.Router();

mongoose.connect('mongodb://localhost:27017/issues');

const connection = mongoose.connection;


app.use(cors()); //find out what exactly this does
app.use(bodyParser.json());




app.get('/', router);


router.route('/issues').get(function(req,res){//find out what exactly this does

    Issue.find(function(err, issues){

            if (err){
                console.log(err);
            }
            else{
                res.json(issues);
            }
        
    });

});

router.route('issues/:id', function(req, res){
        Issue.findById(req.params.id, function(err, issue){

            if (err)
                console.log(err);
            else
                res.json(issue);

        });
})

router.route('issues/add').post(function(req, res){

    let issue = new Issue(req.body);

    issue.save()
        .then(function(req,res){
            res.status(200).json({'issue' : 'Added successfully'})
        }).catch(function(err){
            console.log(err);
            res.status(400).send('Failed to create new record...')
        })
});


router.route('issues/update/:id').post(function(req, res){

        Issue.findById(req.params.id, function(err, issue){

            if (!issue)
                return next(new Error('Could not load document'))
            else {
                issue.title = req.body.title;
                issue.responsible = req.body.responsible;
                issue.description = req.body.description;
                issue.severity = req.body.severity;
                issue.status = req.body.status;

                issue.save().then(function (issue) {

                    res.json('Update done');

                }).catch(function (err) {
                    res.status(400).send('Update failed');
                });
            }
        })


})

router.route('issues/delete/:id').get(function(req, res){

        Issue.findByIdAndRemove({_id: req.params.id}, function(err, issue){

                if (err)
                    res.json(err)
                else
                    res.json('Remove Sucessful')

        });


});

connection.once('open', function(){
    console.log("Connection to mongo database has been established!");
});

app.listen(4000, function(){

    console.log("Express server is running on port 4000!");

})