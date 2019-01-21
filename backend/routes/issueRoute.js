var express = require('express');
const router = express.Router();
var Issue = require('../models/issue');

router.get('/issues', function(req,res){ // WebUrl.com/Issues?

  
   
    Issue.find(function(err, issues){

            if (err){
                console.log(err);
                res.send("An error has occured");
            }
            else{
                res.json(issues);
            }
        
    }); 

});

router.get('/issues/:id', function(req, res){
        Issue.findById(req.params.id, function(err, issue){

            if (err){
                console.log(err);
                res.send("An error has occured")
            }
            else
                res.json(issue);

        });
})

router.post('/issues/add', function(req, res){

    let issue = new Issue(req.body);

    issue.save()
        .then(function(req,res){
            res.status(200).json({'issue' : 'Added successfully'})
        }).catch(function(err){
            console.log(err);
            res.status(400).send('Failed to create new record...')
        })
});


router.post('/issues/update/:id', function(req, res){

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

router.get('/issues/delete/:id', function(req, res){

        Issue.findByIdAndRemove({_id: req.params.id}, function(err, issue){

                if (err)
                    res.json(err)
                else
                    res.json('Remove Sucessful')

        });


});


module.exports = router;