'use client'

import uniqid from 'uniqid'
import { FC, useState } from 'react'
import Modal from './Modal'
import useUploadModal from '@/hooks/useUploadModal'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Input from './Input'
import Button from './Button'
import { toast } from 'react-hot-toast'
import { useUser } from '@/hooks/useUser'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'


interface UploadModalProps {

}

const UploadModal: FC<UploadModalProps> = ({ }) => {
    const [isLoading, setIsLoading] = useState(false)
    const uploadModal = useUploadModal();

    const router = useRouter();

    const { user } = useUser();
    const supabaseClient = useSupabaseClient();

    const {
        register, handleSubmit, reset
    } = useForm<FieldValues>({
        defaultValues: {
            author: "",
            title: "",
            song: null,
            image: null,

        }
    });

    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            uploadModal.onClose();
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        //! upload to supabase

        try {
            setIsLoading(true);
            const imageFile = data.image?.[0];
            const songFile = data.song?.[0];

            if (!imageFile || !songFile || !user) {
                toast.error("Missing fields!");

                return;
            }

            const uniqID = uniqid();;

            // upload song
            const {
                data: songData,
                error: songError
            } = await supabaseClient
                .storage.from('songs')
                .upload(`song-${data.title}-${uniqID}`, songFile, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (songError) {
                setIsLoading(false);
                return toast.error('Failed song upload')
            }

            //! upload image
            const {
                data: imageData,
                error: imageError
            } = await supabaseClient
                .storage.from('images')
                .upload(`image-${data.title}-${uniqID}`, imageFile, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (imageError) {
                setIsLoading(false);
                return toast.error('Failed image upload')
            }

            const { error: supabaseError, } = await supabaseClient
                .from('songs')
                .insert({
                    user_id: user.id,
                    title: data.title,
                    author: data.author,
                    image_path: imageData.path,
                    song_path: songData.path
                });

            if (supabaseError) {
                setIsLoading(false)
                return toast.error(supabaseError.message)
            }

            router.refresh();
            setIsLoading(false);
            toast.success("Song uploaded successfully");
            reset();

            uploadModal.onClose();
        }
        catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }
    return <>
        <Modal title='Add a song' description='Upload an mp3 file' isOpen={uploadModal.isOpen} onChange={onChange}>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4 '>
                <Input
                    id="title"
                    disabled={isLoading}
                    {...register("title", { required: true })}
                    placeholder="Song Title"
                />
                <Input
                    id="author"
                    disabled={isLoading}
                    {...register("author", { required: true })}
                    placeholder="Song Author"
                />

                <div>

                    <div className='pb-1 '>
                        Select Song file
                    </div>
                    <Input
                        id="song"
                        type='file'
                        disabled={isLoading}
                        accept='.mp3'
                        {...register("song", { required: true })}
                    />
                </div>

                <div>

                    <div className='pb-1 '>
                        Select an image
                    </div>
                    <Input
                        id="image"
                        type='file'
                        disabled={isLoading}
                        accept='image/*'
                        {...register("image", { required: true })}
                    />
                </div>

                <Button type='submit' disabled={isLoading}>Create</Button>
            </form>
        </Modal>
    </>
}

export default UploadModal