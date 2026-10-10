
import { useEffect, useState } from "react"
import useAuth from "../../../hooks/useAuth"
import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
} from "../../../api/categoryApi"

function AdminCategories() {
    const { token } = useAuth()

    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [showForm, setShowForm] = useState(false)
    const [editingCategory, setEditingCategory] = useState(null)

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    useEffect(() => {
        async function fetchCategories() {
            setLoading(true)

            try {
                const data = await getCategories()
                setCategories(data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()
    }, [])

    function openCreateForm() {
        setEditingCategory(null)
        setName("")
        setDescription("")
        setShowForm(true)
    }

    function openEditForm(category) {
        setEditingCategory(category)
        setName(category.name)
        setDescription(category.description)
        setShowForm(true)
    }

    function closeForm() {
        setShowForm(false)
        setEditingCategory(null)
        setName("")
        setDescription("")
    }

    async function handleSubmit(event) {
        event.preventDefault()

        try {
            if (editingCategory) {
                const updatedCategory = await updateCategory(
                    editingCategory._id,
                    {
                        name,
                        description
                    },
                    token
                )

                setCategories(currentCategories =>
                    currentCategories.map(category =>
                        category._id === updatedCategory._id
                            ? updatedCategory
                            : category
                    )
                )
            } else {
                const newCategory = await createCategory(
                    {
                        name,
                        description
                    },
                    token
                )

                setCategories(currentCategories => [
                    ...currentCategories,
                    newCategory
                ])
            }

            closeForm()

        } catch (error) {
            alert(error.message)
        }
    }

    async function handleDelete(id) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this category?"
        )

        if (!confirmed) return

        try {
            await deleteCategory(id, token)

            setCategories(currentCategories =>
                currentCategories.filter(category => category._id !== id)
            )
        } catch (error) {
            alert(error.message)
        }
    }

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return (
        <div className="admin-categories">

            <div className="admin-page-header">
                <h2>Categories</h2>

                <button onClick={openCreateForm}>
                    Create Category
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit}>

                    <h3>
                        {editingCategory
                            ? "Edit Category"
                            : "Create Category"}
                    </h3>

                    <input
                        type="text"
                        placeholder="Category name"
                        value={name}
                        onChange={(event) =>
                            setName(event.target.value)
                        }
                        required
                    />

                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(event) =>
                            setDescription(event.target.value)
                        }
                        required
                    />

                    <button type="submit">
                        {editingCategory ? "Update" : "Create"}
                    </button>

                    <button
                        type="button"
                        onClick={closeForm}
                    >
                        Cancel
                    </button>

                </form>
            )}

            {categories.length === 0 ? (
                <p>No categories yet.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {categories.map(category => (
                            <tr key={category._id}>
                                <td>{category.name}</td>

                                <td>{category.description}</td>

                                <td>
                                    <button
                                        onClick={() =>
                                            openEditForm(category)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(category._id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

        </div>
    )
}

export default AdminCategories

