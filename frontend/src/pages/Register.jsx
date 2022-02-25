import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Register() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const { name, email, password, confirmPassword } = formData;

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		if (isSuccess || user) {
			navigate("/");
		}

		dispatch(reset());
	}, [user, isError, isSuccess, message, navigate, dispatch]);

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
		} else {
			const userData = {
				name,
				email,
				password,
			};

			dispatch(register(userData));
		}
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<section className="form-group">
				<FaUser />
				<h1>Please an account</h1>
			</section>

			<section className="form">
				<form onSubmit={onSubmit}>
					<div className="form-group">
						<input
							className="form-control"
							id="name"
							type="text"
							name="name"
							value={name}
							onChange={onChange}
							placeholder="Enter your name"
						/>
					</div>
					<div className="form-group">
						<input
							className="form-group"
							id="email"
							type="text"
							name="email"
							value={email}
							onChange={onChange}
							placeholder="Enter your email"
						/>
					</div>
					<div className="form-group">
						<input
							className="form-control"
							id="password"
							type="password"
							name="password"
							value={password}
							onChange={onChange}
							placeholder="Enter your password"
						/>
					</div>
					<div className="form-group">
						<input
							className="form-control"
							id="confirmPassword"
							type="password"
							name="confirmPassword"
							value={confirmPassword}
							onChange={onChange}
							placeholder="Enter your confirm Password"
						/>
					</div>
					<div className="form-group">
						<button className="btn btn-block">Register</button>
					</div>
				</form>
			</section>
		</>
	);
}

export default Register;
