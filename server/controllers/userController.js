const User = require('../models/user');
const { comparePassword } = require('../helpers/bcrypt');
const { getToken } = require('../helpers/jwt');

class UserController {
	static create(req, res, next) {
		const { name, email, password, watchTag } = req.body;
		User.create({
			name,
			email,
			password,
			watchTag
		})
			.then((data) => {
				let token = getToken({ _id: data._id, name: data.name, email: data.email });
				res.status(201).json({
					message: `Welcome new user!`,
					token: token,
					_id: data._id,
					email: data.email,
					name: data.name,
					password: data.password,
					watchTag: data.watchTag
				});
			})
			.catch(next);
	}

	static updateTag(req, res, next) {
		let { watchTag } = req.body;
		User.findByIdAndUpdate(req.decoded._id, { watchTag: watchTag }, { new: true })
			.select('-password -createdAt -updatedAt')
			.then((data) => {
				res.send(data);
			})
			.catch(next);
	}

	static login(req, res, next) {
		const { email, password } = req.body;
		if (!email || !password) {
			res.status(400).json({
				message: 'Email/Pasword required'
			});
		}
		User.findOne({
			email: email
		})
			.then((data) => {
				if (data) {
					let passwordCheck = comparePassword(password, data.password);
					if (passwordCheck && data) {
						let token = getToken({
							_id: data._id,
							name: data.name,
							email: data.email
						});
						res.status(200).json({
							message: `Welcome to Code Red!`,
							token: token,
							email: data.email,
							_id: data._id
						});
					}
				} else {
					next({
						status: 400,
						message: 'Email/Password is invalid'
					});
				}
			})
			.catch(next);
	}

	static getDetail(req, res, next) {
		console.log(req.decoded);
		// 	User.findById(req.decoded._id)
		// 		.select('-password -createdAt -updatedAt')
		// 		.then((data) => {
		// 			res.status(200).json(data);
		// 		})
		// 		.catch(next);
	}
}

module.exports = UserController;
