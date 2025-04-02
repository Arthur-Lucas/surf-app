'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function AdminPanel() {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        waveType: '',
        difficulty: '',
        description: '',
        lat: '',
        lng: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const body = {
                ...formData,
                coordinates: [parseFloat(formData.lat), parseFloat(formData.lng)]
            };

            const res = await fetch('/api/admin/add-spot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                alert('Spot ajouté avec succès !');
                setFormData({
                    name: '', location: '', waveType: '', difficulty: '', description: '', lat: '', lng: ''
                });
            } else {
                alert("Erreur lors de l'ajout");
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    return (
        <main className="min-h-screen w-full bg-white text-black p-10 flex items-center justify-center">
            <div className="w-full max-w-3xl space-y-8">
                <h1 className="text-3xl font-bold">Ajouter un nouveau spot</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <Label className="py-4" htmlFor="name">Nom du spot</Label>
                        <Input name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div>
                        <Label className="py-4" htmlFor="location">Pays</Label>
                        <Input name="location" value={formData.location} onChange={handleChange} />
                    </div>
                    <div>
                        <Label className="py-4" htmlFor="waveType">Type de vague</Label>
                        <Input name="waveType" value={formData.waveType} onChange={handleChange} />
                    </div>
                    <div>
                        <Label className="py-4" htmlFor="difficulty">Difficulté</Label>
                        <Input name="difficulty" value={formData.difficulty} onChange={handleChange} />
                    </div>
                    <div>
                        <Label className="py-4" htmlFor="lat">Latitude</Label>
                        <Input name="lat" value={formData.lat} onChange={handleChange} />
                    </div>
                    <div>
                        <Label className="py-4" htmlFor="lng">Longitude</Label>
                        <Input name="lng" value={formData.lng} onChange={handleChange} />
                    </div>
                </div>

                <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea name="description" value={formData.description} onChange={handleChange} className="min-h-[100px]" />
                </div>

                <Button className="w-full" onClick={handleSubmit}>
                    Ajouter le spot
                </Button>
            </div>
        </main>
    );
}