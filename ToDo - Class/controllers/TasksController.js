const Task = require('../models/Task');

exports.store = (req, res) => {
  let task = {};
  task.description = req.body.description;
  Task.create(task).then((id) =>{
  	if (req.xhr || req.headers.accept.indexOf('json') > -1){
  		Task.find(id).then((task) => res.json(task));
  	} else {
  		res.redirect('/')
  	}
  });
  /*Task.create(task).then((id) => {
    console.log('Task created with id: ', id);
    res.redirect('/');
  });*/
}

exports.mierda = (req,res) => {
	let id = req.params.id;
  console.log("-------------------------------------ID:"+id);
	Task.find(id).then((task) =>{
		return Task.markAsDone(task);
	}).then((result) => {
		if (req.xhr || req.headers.accept.indexOf('json') > -1){
      Task.find(id).then((ans) => res.json(ans));
    } else {
      res.redirect('/')
    }
	})
}
/*  Task.find(req.params.id)
    .then((task) => {
      if (task) {
        return Task.done(req.params.id);
      }
    })
    .then(() => {
      if (req.xhr || req.headers.accept.indexOf("json") >= 0) {
        Task.find(req.params.id).then((task) => {
          res.json(task);
        });
      } else {
        res.redirect("/");
      }
    });
};*/

exports.delete = (req,res) => {
  let id = req.params.id;
  console.log("-------------------------------------ID:"+id);
  Task.delete(id).then((task) =>{
    if (req.xhr || req.headers.accept.indexOf('json') > -1){
      //Task.find(task).then((task) => res.json(task));
      res.json(id);
    } else {
      res.redirect('/')
    }
  })
}