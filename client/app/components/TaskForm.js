import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// Example categories and users
const categories = ["Development", "Design", "QA", "Management"];
const technicians = ["Alice", "Bob", "Charlie", "Diana"];

export default function TaskForm({ onSubmit, initialData = {}, onCancel }) {
  const [form, setForm] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    priority: initialData.priority || "medium",
    due: initialData.due || "",
    category: initialData.category || "",
    assignTo: initialData.assignTo || [],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, options } = e.target;
    if (name === "assignTo") {
      // Multi-select
      const selected = Array.from(options)
        .filter((o) => o.selected)
        .map((o) => o.value);
      setForm({ ...form, assignTo: selected });
    } else {
      setForm({ ...form, [name]: value });
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate required fields
    let errs = {};
    if (!form.title) errs.title = "Title is required";
    if (!form.description) errs.description = "Description is required";
    if (!form.due) errs.due = "Due date is required";
    if (!form.category) errs.category = "Category is required";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    onSubmit(form);
  };

return (
    <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <Label htmlFor="title">Title</Label>
            <Input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
            />
            {errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title}</p>
            )}
        </div>
        <div>
            <Label htmlFor="description">Description</Label>
            <Input
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                required
            />
            {errors.description && (
                <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
        </div>
        <div>
            <Label htmlFor="priority">Priority</Label>
            <select
                id="priority"
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="border rounded px-2 py-1 w-full"
            >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select>
        </div>
        <div>
            <Label htmlFor="due">Due Date</Label>
            <Input
                id="due"
                name="due"
                type="date"
                value={form.due}
                onChange={handleChange}
                required
            />
            {errors.due && <p className="text-red-500 text-xs mt-1">{errors.due}</p>}
        </div>
        <div>
            <Label htmlFor="category">Category</Label>
            <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="border rounded px-2 py-1 w-full"
                required
            >
                <option value="">Select category</option>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>
            {errors.category && (
                <p className="text-red-500 text-xs mt-1">{errors.category}</p>
            )}
        </div>
        <div>
            <Label htmlFor="assignTo">Assign To (optional)</Label>
            <select
                id="assignTo"
                name="assignTo"
                value={form.assignTo[0] || ""}
                onChange={(e) =>
                    setForm({ ...form, assignTo: e.target.value ? [e.target.value] : [] })
                }
                className="border rounded px-2 py-1 w-full"
            >
                <option value="">Select technician</option>
                {technicians.map((technician) => (
                    <option key={technician} value={technician}>
                        {technician}
                    </option>
                ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
                Select a technician to assign
            </p>
        </div>
        <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
            </Button>
            <Button type="submit">Save Task</Button>
        </div>
    </form>
);
}