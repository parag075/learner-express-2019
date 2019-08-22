const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const dbname = "TodoListDB";
const url = "mongodb+srv://root:toor@cluster0-2fo6d.mongodb.net/test";
const mongoOptions = { useNewUrlParser: true };

const state = {
	db: null
};

const connect = cb => {
	if (state.db) {
		cb();
	} else {
		MongoClient.connect(url, mongoOptions, (err, client) => {
			state.db = client.db(dbname);
			cb();
		});
	}
};

const getPrimaryKey = _id => {
	return ObjectId(_id);
};

const getDB = () => {
	return state.db;
};

module.exports = { getDB, connect, getPrimaryKey };
