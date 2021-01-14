const Dog = require(`./dog-model.js`);
const express = require(`express`);
const server = express();

server.use(express.json());

server.get(`/`, (req, res) => {
    res.send("hey there??");
});

server.get(`/hello`, (req, res) => {
    res.send("Hello World")
});

server.post(`/api/dogs`, async (req, res) => {
    const dog = req.body;

    if (!dog.name || !dog.weight ) {
        res.status(400).json({message:"must include name and weight"});
    } else {
        
        try {
            const newlyCreatedDog = await Dog.create(dog);
            res.status(200).json(newlyCreatedDog);
        } catch(err) {
            res.status(500).json({error:err.message});
        }
    }
});

server.get(`/api/dogs`, async (req, res) => {

    try {
        const dogs = await Dog.findAll();
        res.status(200).json(dogs);
    } catch (err) {
        res.status(500).json({error:err.message});
    }
})

server.delete(`/api/dogs/:id`, async (req, res) => {
    const {id} = req.params;

    try {
        const dog = await Dog.delete(id);
        if (dog) {
            res.status(200).json(dog);
        } else {
            res.status(404).json({message:"unknown id"})
        }
    } catch (err) {
            res.status(500).json({error: err.message});
    }
});

server.put(`/api/dogs/:id`, async (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    if (!changes.name || !changes.weight ) {
        res.status(400).json({message:"must include name and weight"});
    } else {
        
        try {
            const updatedDog = await Dog.update(id, changes);
            if (updatedDog) {
                res.status(200).json(updatedDog)                
            } else {
                res.status(404).json({message: "unkown id"})
            }
        } catch(err) {
            res.status(500).json({error:err.message});
        }
    }
})

module.exports = server;