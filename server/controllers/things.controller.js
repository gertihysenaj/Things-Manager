const Thing = require('../models/things.model');  // import Thing model

module.exports.findAllThings = (request, response) => {
    Thing.find()  
        .sort({likes: -1})
        .then(allThings => response.json({ things: allThings }))
        .catch(err => response.json({ message: 'Something went wrong', error: err }));
};

module.exports.createThing = (request, response) => {
    Thing.exists({name: request.body.name})
        .then(thingExists => {
            if(thingExists){
                return Promise.reject('*This thing exists')
            }
            return Thing.create(request.body)
        })
        .then(result => response.json(result))
        .catch(err => response.status(400).json(err))
};

module.exports.getOneThing = (request, response) => {
    Thing.findOne({_id:request.params.id})
        .then(oneThing => response.json(oneThing))
        .catch(err => response.json(err));
}

module.exports.editThing = async (request, response) => {
    const id = request.params.id;
    const newName = request.body.name;

    const existingThing = await Thing.findOne({ name: newName });

    if (existingThing && existingThing._id.toString() !== id) {
        return response.status(400).send({ message: `The Thing "${newName}" already exists. Please try a different name.` });
    }

    Thing.findByIdAndUpdate(id, request.body, {new: true, runValidators: true})
        .then(editedThing => response.json(editedThing))
        .catch(err => response.status(400).json(err));
};


module.exports.likeThing = (request, response) => {
    Thing.findOneAndUpdate({_id: request.params.id}, {$inc: {likes: 1}}, {new: true})
        .then(likedThing => response.json(likedThing))
        .catch(err => response.json(err));
}

module.exports.deleteThing = (request, response) => {
    Thing.findByIdAndDelete({_id: request.params.id})
      .then(deletedThing => response.json(deletedThing))
      .catch(err => response.json(err));
  }

module.exports.findRecentThings = (request, response) => {
    Thing.find()
        .sort({createdAt: -1})
        .limit(3)
        .then(recentThings => response.json({ things: recentThings }))
        .catch(err => response.json({ message: 'Something went wrong', error: err }));
};

