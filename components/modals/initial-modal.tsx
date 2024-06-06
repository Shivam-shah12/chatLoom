"use client"
import { useForm } from 'react-hook-form';
import { useState, useEffect } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import axios from "axios"
import * as z from "zod";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormControl, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FileUpload } from "@/components/file-upload";
import { useRouter } from 'next/navigation';

const formSchema = z.object({
    name: z.string().min(1, { message: "Server Name is required" }),
    imageUrl: z.string().min(1, { message: "Image URL is required" })
});

const InitialModal = () => {
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: ""
        }
    });

    const isLoading = form.formState.isSubmitted;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post("/api/server", values);
            form.reset();
            router.refresh();
            window.location.reload();
        } catch (error) {
            console.log(error);
            form.reset();
        }
    }

    if (!isMounted) return null;

    return (
        <Dialog open>
            <DialogContent className="overflow-hidden bg-white text-black p-0">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center text-2xl font-bold">
                        Customize Your Server
                    </DialogTitle>
                    <DialogDescription className="text-zinc-500 text-center">
                        Give your server personality with a name & image, which you can change later.
                    </DialogDescription>
                    <div className="space-y-8">
                        <div className=" flex items-center justify-center text-center">
                            <Form {...form}>
                                <FormField
                                    control={form.control}
                                    name="imageUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload endpoint="serverImage" value={field.value} onChange={field.onChange} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </Form>
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="relative text-left">
                                            <FormLabel className="text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                                Server Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field}
                                                    placeholder="Enter your server name"
                                                    className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <DialogFooter className="bg-gray-100 px-6 py-4">
                                    <Button variant="primary" disabled={isLoading}>
                                        Create
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default InitialModal;
