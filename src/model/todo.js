const Joi = require("joi");
const mongoose = require("mongoose");

const Todo = mongoose.model(
	"Todos",
	new mongoose.Schema({
		title: {
			type: String,
			require: true,
			trim: true,
			minlength: "5",
			maxlength: 255
		},
		description: {
			type: String
		}
	})
);

function validateTodo(Todo) {
	const schema = {
		title: Joi.string()
			.min(5)
			.max(50)
			.required()
	};

	return Joi.validate(Todo, schema);
}

exports.Todo = Todo;
exports.validate = validateTodo;
