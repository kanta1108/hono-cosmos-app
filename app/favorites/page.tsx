'use client'

import React, { useState } from "react";
import useSWR from "swr";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card"
import { Label } from "@/components/ui/label";
import { Favorite } from "@/types";

const fetcher = async(url:string)=>{
    try{
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export default function FavoritesPage() {
    const {data, mutate, isLoading} = useSWR<Favorite[]>('/api/favorites', fetcher)
    const [title, setTitle]= useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = async(e:React.FormEvent)=>{
        e.preventDefault()
        if(!title || !url) return;
        await fetch('/api/favorites',{
            method:'POST',
            headers:{"Content-Type":'application/json'},
            body:JSON.stringify({
                id:crypto.randomUUID(),
                title,
                url
            })
        })
        setTitle('')
        setUrl('')
        mutate()
    }

    const handleDelete = async (id: string) => {
    await fetch('/api/favorites', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
    })
    mutate()
    }

    return(
        <div className="max-w-xl mx-auto space-y-6 p-4">
            <h1 className="text-3xl font-bold">お気に入り登録</h1>
            <form onSubmit={handleSubmit} className="space-y-4 ">
                <div>
                    <Label htmlFor="title" className="mb-2">タイトル</Label>
                    <Input id="title" value={title} onChange={(e)=>setTitle(e.target.value)}></Input>
                </div>
                <div>
                    <Label htmlFor="url" className="mb-2">URL</Label>
                    <Input id="url" type="url" value={url} onChange={(e) => setUrl(e.target.value)} />
                </div>
                <Button type="submit" variant="outline">登録</Button>
            </form>
            <div>
                <h2 className="text-xl font-semibold mb-2">登録済み一覧</h2>
                {
                    isLoading?(
                        <p>読み込み中...</p>
                    ):(
                        <div className="grid grid-cols-4 gap-4">
                            {data?.map((fav)=>(
                                <Card key={fav.id} className="flex justify-between items-center">
                                    <CardContent className="p-0">
                                        <a href={fav.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                            {fav.title}
                                        </a>
                                    </CardContent>
                                    <Button variant='outline' size='sm' onClick={()=>handleDelete(fav.id)}>削除</Button>
                                </Card>
                            ))}
                        </div>
                    )
                }
            </div>
        </div>
    )
}
