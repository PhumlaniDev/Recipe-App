import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";
import { FaTrashAlt } from "react-icons/fa";

function GoalItem({ goal }) {
	const dispatch = useDispatch();

	return (
		<div className="goal">
			<div>{new Date(goal.createdAt).toLocaleString("en-US")}</div>
			<h2>{goal.name}</h2>
			<button onClick={() => dispatch(deleteGoal(goal._id))} className="close">
				<FaTrashAlt />
			</button>
		</div>
	);
}

export default GoalItem;
