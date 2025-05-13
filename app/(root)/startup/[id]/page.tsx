import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { STARTUP_QUERY_BY_ID } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from "next/image";
import markdownit from 'markdown-it'
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
const md = markdownit();

export const experimental_ppr: boolean = true; // Enable experimental PPR (Partial Page Rendering) for this page;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;

    const post = await client.fetch(STARTUP_QUERY_BY_ID, { id });
    // console.log(post);
    if (!post) {
        return (
            notFound()
        );
    }

    const parsedContent = md.render(post?.pitch || '');

    return (
        <>

            <section className='pink_container !min-h-[230px] pattern'>
                <p className='tag'>{formatDate(post?._createdAt)}</p>
                <h1 className='heading'>{post.title}</h1>
                <p className='sub-heading !max-w-5xl'>{post?.description}</p>
            </section>

            <section className='section_container'>
                <img
                    src={post?.image || ""}
                    alt={"thumbnail"}
                    className='w-full max-h-[650px] rounded-xl object-cover aspect-auto '
                />
                <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
                    <div className='flex-between gap-5'>
                        <Link
                            href={`/user/${post.author?._id}`}
                            className='flex gap-2 items-center mb-3'
                        >
                            <Image
                                src={post.author?.image || ""}
                                alt="profile-picture"
                                width={64}
                                height={64}
                                className='rounded-full object-cover aspect-square drop-shadow-lg'
                            />
                            <div>
                                <p className='text-20-medium'>{post.author?.name}</p>
                                <p className='text-16-medium !text-black-300'>@{post.author?.username}</p>
                            </div>
                        </Link>
                        <p className='category-tag'>{post.category}</p>
                    </div>
                    <h3 className='text-30-bold'>Startup Details</h3>
                    {
                        parsedContent ? (
                            <article 
                            className='prose mas-w-4xl break-all font-work-sans'
                            dangerouslySetInnerHTML={{__html: parsedContent}} />
                        ) : ( <p className='no-result'>No details Found</p> )
                    }
                </div>
                <hr className='divider'/>

                <Suspense fallback={<Skeleton className='view_skeleton' />}> 
                {/* //  npx shadcn@latest add skeleton */}
                    <View id={post._id}/>
                </Suspense>
                
            </section>

        </>
    )
}

export default page
