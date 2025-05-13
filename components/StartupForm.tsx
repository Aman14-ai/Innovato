'use client'
import React, { useActionState, useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea';
import MDEditor from '@uiw/react-md-editor';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/validation';
import { z } from "zod";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';
import { createPitch } from '@/lib/action';

// It helps you:
// ✅ define the shape (schema) of your data,
// ✅ validate that data at runtime, and
// ✅ automatically infer TypeScript types.

// It’s widely used in TypeScript/JavaScript projects to validate forms, API requests, environment variables, configs, etc.



const StartupForm = () => {

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [pitch, setPitch] = React.useState("");
    const router = useRouter();


    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try {
            const formValues = {
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                category: formData.get('category') as string,
                link: formData.get('link') as string,
                pitch
            };

            await formSchema.parseAsync(formValues);
            console.log(formValues);

            const result = await createPitch(prevState , formData, pitch);
            console.log("Result by radha : ", result);

            toast.success("Form submitted successfully");


            router.push(`/startup/${result._id }`)
            

            // return result;

            




        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErorrs = error.flatten().fieldErrors;

                setErrors(fieldErorrs as unknown as Record<string, string>);
                toast.error("Form validation failed");
                return { ...prevState, error: "Form validation failed", status: "ERROR" };
            }
            return { ...prevState, error: "An unexpected error has occurred.", status: "ERROR" };
        }
    }

    const [state, formAction, isPending] = useActionState(handleFormSubmit, { error: "", status: "initial" });





    return (
        <form action={formAction} className='startup-form'>
            <div>
                <label htmlFor="title" className='startup-form_label'>Title</label>
                <Input
                    id='title'
                    name='title'
                    className='startup-form_input'
                    required
                    placeholder='Startup Title'
                />
                {
                    errors.title && <p className="startup-form_error">{errors.title}</p>
                }
            </div>
            <div>
                <label htmlFor="description" className='startup-form_label'>Description</label>
                <Textarea
                    id="description"
                    name="description"
                    required
                    placeholder="Startup Description"
                    className="startup-form_textarea"
                />

                {
                    errors.description && <p className='startup-form_error'>{errors.description}</p>
                }
            </div>
            <div>
                <label htmlFor="category" className='startup-form_label'>Category</label>
                <Input
                    id='category'
                    name='category'
                    className='startup-form_input'
                    required
                    placeholder='Startup Category (Tech , Health , Education ,etc)'
                />
                {errors.category && <p className='startup-form_error'>{errors.category}</p>}
            </div>
            <div>
                <label htmlFor="link" className='startup-form_label'>Image URL</label>
                <Input
                    id='link'
                    name='link'
                    className='startup-form_input'
                    required
                    placeholder='Startup Image URL'
                />
                {errors.link && <p className='startup-form_error'>{errors.link[0]}</p>}
            </div>
            {/* for pitch markdown : npm i @uiw/react-md-editor */}
            <div data-color-mode="light">
                <label htmlFor="pitch" className='startup-form_label'>Pitch</label>
                <MDEditor
                    value={pitch}
                    onChange={(val) => setPitch(val || "")}
                    id='pitch'
                    height={300}
                    preview='edit'
                    style={{ borderRadius: 20, overflow: "hidden" }}
                    textareaProps={{
                        placeholder: 'Briefly describe your startup idea. What real world problems does it solve ?',
                    }}
                    previewOptions={{
                        disallowedElements: ['style'],
                    }}
                />

                {errors.pitch && <p className='startup-form_error'>{(errors.pitch)}</p>}
            </div>
            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />

            <Button
                type='submit'
                className='startup-form_btn text-white'
                disabled={isPending}>
                {isPending ? "Submitting..." : "Submit Your Startup"}
                <Send className='size-6 mt-1.5 ml-1.5' />
            </Button>
        </form>
    )
}

export default StartupForm;
