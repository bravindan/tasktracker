"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";

const initialTasks = [
	{
		id: 1,
		title: "Update documentation",
		description: "Update API documentation with new endpoints",
		status: "completed",
		priority: "low",
		due: "2024-01-08",
		tags: ["Completed", "Documentation"],
	},
	{
		id: 2,
		title: "Fix critical bug",
		description: "Resolve the authentication issue in production",
		status: "active",
		priority: "high",
		due: "2024-01-11",
		tags: ["In Progress", "Bug Fix"],
	},
	{
		id: 3,
		title: "Review code changes",
		description: "Review pull requests from the development team",
		status: "active",
		priority: "medium",
		due: "2024-01-12",
		tags: ["To Do", "Development"],
	},
	{
		id: 4,
		title: "Complete project proposal",
		description:
			"Write and submit the Q4 project proposal for the new client dashboard",
		status: "active",
		priority: "high",
		due: "2024-01-10",
		tags: ["In Progress", "Work"],
	},
	{
		id: 5,
		title: "Team meeting preparation",
		description: "Prepare agenda and materials for weekly team meeting",
		status: "completed",
		priority: "medium",
		due: "2024-01-09",
		tags: ["To Do", "Meetings"],
	},
];

// Helper to check if a task is overdue
function isOverdue(task) {
	return task.status !== "completed" && new Date(task.due) < new Date();
}

export default function Dashboard() {
	const [filter, setFilter] = useState("all");
	const [view, setView] = useState("card");
	const [tasks, setTasks] = useState(initialTasks);

	let filteredTasks = tasks;
	if (filter === "active") {
		filteredTasks = tasks.filter((t) => t.status === "active");
	} else if (filter === "completed") {
		filteredTasks = tasks.filter((t) => t.status === "completed");
	} else if (filter === "overdue") {
		filteredTasks = tasks.filter(isOverdue);
	}

	// Mark a task as complete
	const markComplete = (id) => {
		setTasks((prev) =>
			prev.map((task) =>
				task.id === id
					? {
							...task,
							status: "completed",
							tags: [...new Set([...task.tags, "Completed"])],
					  }
					: task
			)
		);
	};

	// Reopen a completed task
	const reopenTask = (id) => {
		setTasks((prev) =>
			prev.map((task) =>
				task.id === id
					? { ...task, status: "active", tags: task.tags.filter((tag) => tag !== "Completed") }
					: task
			)
		);
	};

	// Handle checkbox for list view
	const handleCheckbox = (id, checked) => {
		if (checked) {
			markComplete(id);
		} else {
			reopenTask(id);
		}
	};

	return (
		<>
			{/* Stat Cards */}
			<section className="grid grid-cols-1 md:grid-cols-4 gap-4 px-8 py-6">
				<Card
					className={`border-blue-200 cursor-pointer ${
						filter === "all" ? "ring-2 ring-blue-400" : ""
					}`}
					onClick={() => setFilter("all")}
				>
					<CardContent className="flex flex-col gap-2 pt-4">
						<span className="text-gray-500 text-sm">Total Tasks</span>
						<span className="text-2xl font-bold">{tasks.length}</span>
					</CardContent>
				</Card>
				<Card
					className={`border-orange-200 cursor-pointer ${
						filter === "active" ? "ring-2 ring-orange-400" : ""
					}`}
					onClick={() => setFilter("active")}
				>
					<CardContent className="flex flex-col gap-2 pt-4">
						<span className="text-gray-500 text-sm">Active Tasks</span>
						<span className="text-2xl font-bold">
							{tasks.filter((t) => t.status === "active").length}
						</span>
					</CardContent>
				</Card>
				<Card
					className={`border-green-200 cursor-pointer ${
						filter === "completed" ? "ring-2 ring-green-400" : ""
					}`}
					onClick={() => setFilter("completed")}
				>
					<CardContent className="flex flex-col gap-2 pt-4">
						<span className="text-gray-500 text-sm">Completed</span>
						<span className="text-2xl font-bold">
							{tasks.filter((t) => t.status === "completed").length}
						</span>
					</CardContent>
				</Card>
				<Card
					className={`border-red-200 cursor-pointer ${
						filter === "overdue" ? "ring-2 ring-red-400" : ""
					}`}
					onClick={() => setFilter("overdue")}
				>
					<CardContent className="flex flex-col gap-2 pt-4">
						<span className="text-gray-500 text-sm">Overdue</span>
						<span className="text-2xl font-bold">
							{tasks.filter(isOverdue).length}
						</span>
					</CardContent>
				</Card>
			</section>

			{/* Filters */}
			<section className="flex flex-wrap items-center gap-4 px-8 pb-4">
				<Input placeholder="Search tasks..." className="w-48" />
				<select className="border rounded px-2 py-1 text-sm">
					<option>All Status</option>
					<option>Active</option>
					<option>Completed</option>
				</select>
				<select className="border rounded px-2 py-1 text-sm">
					<option>All Priority</option>
					<option>High</option>
					<option>Medium</option>
					<option>Low</option>
				</select>
				<select className="border rounded px-2 py-1 text-sm">
					<option>All Categories</option>
				</select>
				<Button
					variant={view === "card" ? "default" : "outline"}
					className="ml-auto"
					onClick={() => setView("card")}
				>
					Card View
				</Button>
				<Button
					variant={view === "list" ? "default" : "ghost"}
					onClick={() => setView("list")}
				>
					List View
				</Button>
				<Button variant="ghost">Calendar View</Button>
				<select className="border rounded px-2 py-1 text-sm">
					<option>Due Date</option>
				</select>
			</section>

			{/* Task Cards or List */}
			{view === "card" ? (
				<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8 pb-8">
					{filteredTasks.length === 0 ? (
						<div className="col-span-full text-center text-gray-400 py-8">
							No tasks found for this filter.
						</div>
					) : (
						filteredTasks.map((task) => (
							<Card key={task.id} className="border-blue-100">
								<CardHeader>
									<CardTitle className="text-lg">{task.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-gray-600 mb-2">{task.description}</p>
									<div className="flex flex-wrap gap-2 mb-2">
										{task.tags.map((tag) => (
											<Badge key={tag} variant="secondary" className="text-xs">
												{tag}
											</Badge>
										))}
										<Badge
											variant={
												task.status === "completed" ? "success" : "default"
											}
											className="text-xs"
										>
											{task.status.charAt(0).toUpperCase() + task.status.slice(1)}
										</Badge>
										<Badge variant="outline" className="text-xs">
											{task.priority.charAt(0).toUpperCase() +
												task.priority.slice(1)}
										</Badge>
									</div>
									<div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
										<CalendarDays className="w-4 h-4" />
										<span>
											Due:{" "}
											{new Date(task.due).toLocaleDateString("en-US", {
												month: "short",
												day: "2-digit",
												year: "numeric",
											})}
										</span>
									</div>
									<Button
										size="sm"
										variant={task.status === "completed" ? "outline" : "success"}
										className="mt-2"
										onClick={() =>
											task.status === "completed"
												? reopenTask(task.id)
												: markComplete(task.id)
										}
									>
										{task.status === "completed" ? "Reopen" : "Mark Complete"}
									</Button>
								</CardContent>
							</Card>
						))
					)}
				</section>
			) : (
				// List View
				<section className="overflow-x-auto px-8 pb-8">
					<table className="min-w-full bg-white border rounded shadow">
						<thead>
							<tr>
								<th className="px-4 py-2 border-b text-left">Done</th>
								<th className="px-4 py-2 border-b text-left">Title</th>
								<th className="px-4 py-2 border-b text-left">Description</th>
								<th className="px-4 py-2 border-b text-left">Priority</th>
								<th className="px-4 py-2 border-b text-left">Due</th>
								<th className="px-4 py-2 border-b text-left">Tags</th>
							</tr>
						</thead>
						<tbody>
							{filteredTasks.length === 0 ? (
								<tr>
									<td colSpan={6} className="text-center text-gray-400 py-8">
										No tasks found for this filter.
									</td>
								</tr>
							) : (
								filteredTasks.map((task) => (
									<tr key={task.id} className="border-b">
										<td className="px-4 py-2">
											<input
												type="checkbox"
												checked={task.status === "completed"}
												onChange={(e) => handleCheckbox(task.id, e.target.checked)}
												className="w-4 h-4"
											/>
										</td>
										<td className="px-4 py-2 font-medium">{task.title}</td>
										<td className="px-4 py-2">{task.description}</td>
										<td className="px-4 py-2">{task.priority}</td>
										<td className="px-4 py-2">
											{new Date(task.due).toLocaleDateString("en-US", {
												month: "short",
												day: "2-digit",
												year: "numeric",
											})}
										</td>
										<td className="px-4 py-2">
											<div className="flex flex-wrap gap-1">
												{task.tags.map((tag) => (
													<Badge key={tag} variant="secondary" className="text-xs">
														{tag}
													</Badge>
												))}
											</div>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</section>
			)}
		</>
	);
}
