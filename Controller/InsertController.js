import database from "../Mongo/connection.js";
import model from "../Schema/Schema.js"

const insertController = {
    async insert(req, res, next) {
        try {
            const db = await database()
            const { name, email, pass, city } = req.body
            const data = new model({ name, email, pass, city })
            const insert = await data.save()
            res.send("done")
        } catch (err) {
            next(err)
        }
    }
}

const updateController = {
    async put(req, res, next) {
        try {
            const db = await database()
            const { name, email, pass, city } = req.body
            const data = await model.findByIdAndUpdate({ _id: req.params.id }, { name, email, pass, city })
            res.send("done")
        } catch (err) {
            next(err)
        }
    }
}

const deleteController = {
    async delete(req, res, next) {
        try {
            const db = await database()
            const data = await model.findByIdAndDelete({ _id: req.params.id })
            res.send(data)
        } catch (err) {
            next(err)
        }
    }
}

const showController = {
    async showData(req, res, next) {
        try {
            const db = await database();
            // const detail = await db.Collection('details')
            // // const data = await detail.find()
            // console.log(detail);
            
            // const showone = await model.aggregate([ { $match: {city:"Goa"}}, {$project: {name:1,email:{$type:"$email"},_id:0}}]);
            const showone = await model.aggregate([ { $match: {city:"Goa"}}, {$count:'Total_City'}]);
            if (!showone) {
                return res.status(404).send({ error: "No data found" });
            }
            res.send(showone);
        } catch (err) {
            next(err);
        }
    },

    async showOneData(req, res, next) {
        try {
            const db = await database();
            const showone = await model.findOne().select('-_id -createdAt -updatedAt -__v');
            if (!showone) {
                return res.status(404).send({ error: "No data found" });
            }
            res.send(showone);
        } catch (err) {
            next(err);
        }
    }
}

export { insertController, updateController, deleteController, showController }