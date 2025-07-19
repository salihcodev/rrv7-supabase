import * as React from "react";
import { Link, useLoaderData, useSearchParams } from "react-router-dom";
import { Button } from "~/components/ui/button";
import supabase from "~/lib/supabase-client";
import type { Item } from "~/lib/schemas/items";

const ITEMS_PER_PAGE = 12;

export async function loader({ request }: { request: Request }) {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const from = (page - 1) * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE - 1;

    const [{ data: items, error }, { count }] = await Promise.all([
        supabase
            .from("items")
            .select("*")
            .order("created_at", { ascending: false })
            .range(from, to),
        supabase.from("items").select("*", { count: "exact", head: true }),
    ]);

    if (error) {
        throw new Error(error.message);
    }

    const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE);

    return { items, page, totalPages };
}

export default function ItemsList() {
    const { items, page, totalPages } = useLoaderData<{
        items: Item[];
        page: number;
        totalPages: number;
    }>();
    const [searchParams, setSearchParams] = useSearchParams();

    const handlePageChange = (newPage: number) => {
        setSearchParams((prev) => {
            prev.set("page", newPage.toString());
            return prev;
        });
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Items</h1>
                <Button asChild>
                    <Link to="/items/create">Add New Item</Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {items.length === 0 ? (
                    <div className="col-span-full text-center p-12 border rounded-lg bg-card">
                        <p className="text-lg text-foreground/70">
                            No items found
                        </p>
                        <Button asChild className="mt-4" variant="gradient">
                            <Link to="/items/create">
                                Create your first item
                            </Link>
                        </Button>
                    </div>
                ) : (
                    items.map((item) => (
                        <Link
                            key={item.id}
                            to={`/items/${item.id}`}
                            className="block h-full p-6 rounded-lg border bg-card text-card-foreground hover:bg-muted/50 transition-colors"
                        >
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold">
                                    {item.name}
                                </h2>
                                <svg
                                    className="w-5 h-5 text-foreground/50 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </div>
                            <p className="mt-2 text-foreground/80 line-clamp-2">
                                {item.description}
                            </p>
                            <div className="mt-4 text-sm text-foreground/60">
                                Added{" "}
                                {new Date(item.created_at).toLocaleDateString()}
                            </div>
                        </Link>
                    ))
                )}
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                    <Button
                        variant="outline"
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page <= 1}
                    >
                        Previous
                    </Button>
                    <div className="flex items-center gap-1">
                        {Array.from(
                            { length: totalPages },
                            (_, i) => i + 1
                        ).map((pageNum) => (
                            <Button
                                key={pageNum}
                                variant={
                                    pageNum === page ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => handlePageChange(pageNum)}
                            >
                                {pageNum}
                            </Button>
                        ))}
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page >= totalPages}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
}
