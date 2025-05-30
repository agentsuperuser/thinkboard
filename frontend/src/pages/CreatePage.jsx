import { ArrowLeftIcon } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router'
import api from '../libs/axios'

const CreatePage = () => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault()
        if(!title.trim() || !content.trim()){
            toast.error("You missed Required fields")
            return
        }
        
        setLoading(true)
        try {
            await api.post("/notes", {
                title,
                content
            })
            toast.success("Added a new note")
            navigate("/")
        } catch (error) {
            console.log("error creating notes", error);
            
            toast.error("Failed to add your note")
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='min-h-screen bg-base-200'>
            <div className='container mx-auto px-4 py-8'>
                <div className='max-w-2xl mx-auto'>
                    <Link to={"/"} className='btn btn-ghost mb-6'>
                        <ArrowLeftIcon className='size-5' />
                        back
                    </Link>

                    <div className='card bg-base-100'>
                        <div className='card-body'>
                            <h2 className='card-title text-2xl mb-4'>New Note</h2>
                            <form onSubmit={handleSubmit}>
                                <div className='form-control mb-4'>
                                    <label className='label'>
                                        <span className='label-text'>Title</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        placeholder='Title' 
                                        className='input input-bordered' 
                                        onChange={(e)=> setTitle(e.target.value)} 
                                        value={title} 
                                    />
                                </div>

                                <div className='form-control mb-4'>
                                    <label className='label'>
                                        <span className='label-text'>Content</span>
                                    </label>
                                    <textarea 
                                        type="text" 
                                        placeholder='Write your thoughts...' 
                                        className='textarea textarea-bordered h-32' 
                                        onChange={(e)=> setContent(e.target.value)} 
                                        value={content} 
                                    />
                                </div>

                                <div className='card-actions justify-end'>
                                    <button type='submit' className='btn btn-primary' disabled={loading}>
                                        {loading ? "Creating..." : "Create Note"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePage