import {
    Form,
    useActionData,
    Link,
    useNavigation,
    type ActionFunctionArgs,
    redirect,
} from "react-router-dom";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import supabase from "~/lib/supabase-client";
import React from "react";
import { createItemSchema } from "~/lib/schemas/items";

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const name = formData.get("name");
    const description = formData.get("description");

    const parseResult = createItemSchema.safeParse({ name, description });

    if (!parseResult.success) {
        // Return the first error message for each field
        const fieldErrors: Record<string, string> = {};
        for (const issue of parseResult.error.issues) {
            fieldErrors[issue.path[0] as string] = issue.message;
        }
        return { success: false, fieldErrors };
    }

    const { data, error } = await supabase
        .from("items")
        .insert([
            {
                name: parseResult.data.name,
                description: parseResult.data.description,
            },
        ])
        .select()
        .single();

    if (error) {
        return { success: false, error: error.message };
    }

    return {
        success: true,
        data: { name: data.name, description: data.description },
    };
}

export default function CreateItem() {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    const actionData = useActionData() as
        | {
              success: boolean;
              data?: { name: string; description: string };
              error?: string;
              fieldErrors?: { [key: string]: string };
          }
        | undefined;

    // Show toast notifications and handle redirect
    React.useEffect(() => {
        if (actionData?.success) {
            toast.success("Item created successfully!", {
                description: `${actionData.data?.name} has been added to your items.`,
            });
            // Redirect after a short delay to ensure toast is visible
            const timeout = setTimeout(() => {
                window.location.href = "/items";
            }, 1000);
            return () => clearTimeout(timeout);
        } else if (actionData?.error) {
            toast.error("Failed to create item", {
                description: actionData.error,
            });
        }
    }, [actionData]);

    return (
        <div className="max-w-lg mx-auto mt-10 bg-card shadow-lg rounded-2xl p-8 border border-border">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-foreground">
                    Create Item
                </h1>
                <Link
                    to="/items"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors underline"
                >
                    Back to Items
                </Link>
            </div>
            <Form method="post" className="space-y-6" noValidate>
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoFocus
                        disabled={isSubmitting}
                        placeholder="Enter item name"
                        aria-invalid={!!actionData?.fieldErrors?.name}
                        aria-describedby={
                            actionData?.fieldErrors?.name
                                ? "name-error"
                                : undefined
                        }
                        defaultValue={
                            typeof document !== "undefined"
                                ? document.querySelector<HTMLInputElement>(
                                      'input[name="name"]'
                                  )?.value ?? ""
                                : ""
                        }
                    />
                    {actionData?.fieldErrors?.name && (
                        <p
                            className="text-destructive text-sm mt-1"
                            id="name-error"
                        >
                            {actionData.fieldErrors.name}
                        </p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        name="description"
                        required
                        disabled={isSubmitting}
                        rows={4}
                        placeholder="Describe the item"
                        aria-invalid={!!actionData?.fieldErrors?.description}
                        aria-describedby={
                            actionData?.fieldErrors?.description
                                ? "description-error"
                                : undefined
                        }
                        defaultValue={
                            typeof document !== "undefined"
                                ? document.querySelector<HTMLTextAreaElement>(
                                      'textarea[name="description"]'
                                  )?.value ?? ""
                                : ""
                        }
                    />
                    {actionData?.fieldErrors?.description && (
                        <p
                            className="text-destructive text-sm mt-1"
                            id="description-error"
                        >
                            {actionData.fieldErrors.description}
                        </p>
                    )}
                </div>
                <Button
                    type="submit"
                    variant="gradient"
                    loading={isSubmitting}
                    className="w-full"
                >
                    Create Item
                </Button>
            </Form>
        </div>
    );
}
