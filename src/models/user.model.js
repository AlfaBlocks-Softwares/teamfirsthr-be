const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
		age: {
			type: Number,
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		last_login: {
			type: Date
		},
		is_active: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);


const User = mongoose.model('User', userSchema);

module.exports = User;
