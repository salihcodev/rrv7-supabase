import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../../lib/supabase-client";
import type { Item } from "../../lib/schemas/items";
import { createItemSchema } from "../../lib/schemas/items";
import { LoadingSpinner } from "../../components/ui/loading-spinner";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../../components/ui/dialog";

export default function Item() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState<Item | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [editForm, setEditForm] = useState({
        name: "",
        description: "",
    });
    const [validationErrors, setValidationErrors] = useState<{
        name?: string[];
        description?: string[];
    }>({});

    useEffect(() => {
        if (item) {
            setEditForm({
                name: item.name,
                description: item.description,
            });
        }
    }, [item]);

    useEffect(() => {
        async function fetchItem() {
            try {
                const { data, error } = await supabase
                    .from("items")
                    .select("*")
                    .eq("id", id)
                    .single();

                if (error) throw error;
                setItem(data);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Failed to fetch item"
                );
            } finally {
                setLoading(false);
            }
        }

        fetchItem();
    }, [id]);

    async function handleDelete() {
        if (!id) return;

        try {
            setIsDeleting(true);
            const { error } = await supabase
                .from("items")
                .delete()
                .eq("id", id);

            if (error) throw error;

            navigate("/items", {
                replace: true,
                state: { message: "Item deleted successfully" },
            });
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to delete item"
            );
            setIsDeleting(false);
        }
    }

    async function handleSave() {
        if (!id) return;

        try {
            setValidationErrors({});
            const result = createItemSchema.safeParse(editForm);

            if (!result.success) {
                setValidationErrors(result.error.flatten().fieldErrors);
                return;
            }

            setIsSaving(true);
            const { error } = await supabase
                .from("items")
                .update({
                    name: editForm.name,
                    description: editForm.description,
                })
                .eq("id", id);

            if (error) throw error;

            const { data: updatedItem } = await supabase
                .from("items")
                .select("*")
                .eq("id", id)
                .single();

            setItem(updatedItem);
            setIsEditing(false);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to save changes"
            );
        } finally {
            setIsSaving(false);
        }
    }

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-6">
                <Button
                    variant="ghost"
                    asChild
                    className="text-foreground/70 hover:text-foreground"
                >
                    <Link to="/items">
                        <svg
                            className="mr-2 h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        Back to Items
                    </Link>
                </Button>
                <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-4">
                    <p className="text-destructive">{error}</p>
                </div>
            </div>
        );
    }

    if (!item) {
        return (
            <div className="space-y-6">
                <Button
                    variant="ghost"
                    asChild
                    className="text-foreground/70 hover:text-foreground"
                >
                    <Link to="/items">
                        <svg
                            className="mr-2 h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        Back to Items
                    </Link>
                </Button>
                <div className="rounded-lg border bg-card p-8 text-center">
                    <svg
                        className="mx-auto h-12 w-12 text-foreground/30"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <h2 className="mt-4 text-xl font-semibold text-foreground/70">
                        Item not found
                    </h2>
                    <p className="mt-2 text-foreground/50">
                        The item you're looking for doesn't exist or has been
                        removed.
                    </p>
                    <Button asChild className="mt-6" variant="gradient">
                        <Link to="/items/create">Create new item</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Button
                    variant="ghost"
                    asChild
                    className="text-foreground/70 hover:text-foreground"
                >
                    <Link to="/items">
                        <svg
                            className="mr-2 h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        Back to Items
                    </Link>
                </Button>
                <div className="flex items-center gap-2">
                    <Button variant="gradient" asChild>
                        <Link to="/items/create">Add New Item</Link>
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                    />
                                </svg>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={() => setIsEditing(true)}
                                disabled={isEditing}
                            >
                                <svg
                                    className="mr-2 h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    />
                                </svg>
                                Edit Item
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="text-destructive focus:bg-destructive focus:text-destructive-foreground hover:bg-destructive hover:text-foreground"
                                disabled={isDeleting}
                                onClick={() => setShowDeleteDialog(true)}
                            >
                                {isDeleting ? (
                                    <>
                                        <LoadingSpinner className="mr-2 h-4 w-4" />
                                        Deleting...
                                    </>
                                ) : (
                                    <>
                                        <svg
                                            className="mr-2 h-4 w-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                            />
                                        </svg>
                                        Delete Item
                                    </>
                                )}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Item</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this item? This
                            action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setShowDeleteDialog(false)}
                            disabled={isDeleting}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? (
                                <>
                                    <LoadingSpinner className="mr-2 h-4 w-4" />
                                    Deleting...
                                </>
                            ) : (
                                "Delete Item"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className="overflow-hidden rounded-lg border bg-card">
                {isEditing ? (
                    <div className="space-y-6 p-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={editForm.name}
                                onChange={(e) =>
                                    setEditForm((prev) => ({
                                        ...prev,
                                        name: e.target.value,
                                    }))
                                }
                                placeholder="Enter item name"
                            />
                            {validationErrors.name?.map((error) => (
                                <p
                                    key={error}
                                    className="text-sm text-destructive"
                                >
                                    {error}
                                </p>
                            ))}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={editForm.description}
                                onChange={(e) =>
                                    setEditForm((prev) => ({
                                        ...prev,
                                        description: e.target.value,
                                    }))
                                }
                                placeholder="Enter item description"
                                rows={4}
                            />
                            {validationErrors.description?.map((error) => (
                                <p
                                    key={error}
                                    className="text-sm text-destructive"
                                >
                                    {error}
                                </p>
                            ))}
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="gradient"
                                onClick={handleSave}
                                disabled={isSaving}
                            >
                                {isSaving ? (
                                    <>
                                        <LoadingSpinner className="mr-2 h-4 w-4" />
                                        Saving...
                                    </>
                                ) : (
                                    "Save Changes"
                                )}
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setIsEditing(false);
                                    setEditForm({
                                        name: item.name,
                                        description: item.description,
                                    });
                                    setValidationErrors({});
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="border-b p-6">
                            <h1 className="text-2xl font-bold tracking-tight text-foreground">
                                {item.name}
                            </h1>
                            <p className="mt-1 text-sm text-foreground/60">
                                Added{" "}
                                {new Date(item.created_at).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="p-6">
                            <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
                                {item.description}
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
