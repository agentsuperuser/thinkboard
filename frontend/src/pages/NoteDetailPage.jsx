import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import api from '../libs/axios'
import toast from 'react-hot-toast'
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react'

const NoteDetailPage = () => {
    const [note, setNote] = useState(null)
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)

    const navigate = useNavigate()

    const {id} = useParams()

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await api.get(`/notes/${id}`)
                setNote(res.data)
            } catch (error) {
                console.log("Fetching failed", error);
                toast.error("Failed to fetch the note")
                
            } finally {
                setLoading(false)
            }
        }
        fetchNote()
    },[id])
    console.log({note});
    const handleDelete = async () => {
        if(!window.confirm("Are you sure?")) return
        try {
            await api.delete(`/notes/${id}`)
            toast.success("Note Deleted")
            navigate('/')
        } catch (error) {
            console.log("Error deleting", error);
            toast.error("Failed to delete")
        }
    }
    const handleSave = async () => {
        if(!note.title.trim() || !note.content.trim()){
            toast.error("Please add a title or content to save")
            return
        }

        setSaving(true)

        try {
            await api.put(`/notes/${id}`, note)
            toast.success("Note Updated")
            navigate('/')
        } catch (error) {
            console.log("error updating", error);
            toast.error("Error in updating your note")
        } finally {
            setSaving(false)
        }
    }
    
    if(loading) {
        return (
            <div className='min-h-screen bg-base-200 flex items-center justify-center'>
                <LoaderIcon className='animate-spin size-10' />
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-base-200'>
            <div className='container mx-auto px-4 py-8'>
                <div className='max-w-2xl mx-auto'>
                    <div className='flex items-center justify-between mb-6'>
                        <Link to='/' className='btn btn-ghost'>
                            <ArrowLeftIcon className='h-5 w-5' />
                            Back
                        </Link>

                        <button onClick={handleDelete} className='btn btn-error btn-outline'>
                            <Trash2Icon className='h-5 w-5' />
                            Delete Note
                        </button>
                    </div>
                    <div className='card bg-base-100'>
                        <div className='card-body'>
                            <div className='form-control mb-4'>
                                <label className='label'>
                                    <span className='label-text'>Edit Title</span>
                                    <input 
                                        type="text"
                                        placeholder='Note title'
                                        className='input input-bordered'
                                        value={note?.title}
                                        onChange={(e) => setNote({...note, title: e.target.value})}
                                    />
                                </label>
                            </div>
                            <div className='form-control mb-4'>
                                <label className='label'>
                                    <span className='label-text'>Content</span>
                                    <textarea 
                                    placeholder='Edit Note'
                                    className='textarea textarea-bordered h-32'
                                    value={note?.content}
                                    onChange={(e)  => setNote({ ...note, content: e.target.value })}
                                />
                                </label>
                            </div>

                            <div className='card-actions justify-end'>
                                <button className='btn btn-primary' disabled={saving} onClick={handleSave}>
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteDetailPage