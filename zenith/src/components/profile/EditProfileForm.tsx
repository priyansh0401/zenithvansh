'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { useAuthStore } from '@/store/authStore'
import toast from 'react-hot-toast'

export default function EditProfileForm() {
    const { user, setUser } = useAuthStore()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [activeTab, setActiveTab] = useState<'info' | 'password'>('info')

    const [name, setName] = useState(user?.name || '')
    const [phone, setPhone] = useState(user?.phone || '')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSaveInfo = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/users/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, phone }),
            })
            const data = await res.json()
            if (data.success) {
                setUser(data.data)
                toast.success('Profile updated')
            } else {
                toast.error(data.error || 'Update failed')
            }
        } catch {
            toast.error('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match')
            return
        }
        setLoading(true)
        try {
            const res = await fetch('/api/users/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ currentPassword, newPassword }),
            })
            const data = await res.json()
            if (data.success) {
                toast.success('Password updated')
                setCurrentPassword('')
                setNewPassword('')
                setConfirmPassword('')
            } else {
                toast.error(data.error || 'Update failed')
            }
        } catch {
            toast.error('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    const getPasswordStrength = (pwd: string): { label: string; color: string; width: string } => {
        if (pwd.length === 0) return { label: '', color: '', width: '0%' }
        if (pwd.length < 8) return { label: 'Weak', color: 'bg-red-500', width: '33%' }
        if (pwd.length < 12 || !/[A-Z]/.test(pwd) || !/[0-9]/.test(pwd))
            return { label: 'Medium', color: 'bg-yellow-500', width: '66%' }
        return { label: 'Strong', color: 'bg-green-500', width: '100%' }
    }

    const strength = getPasswordStrength(newPassword)

    return (
        <div>
            <div className="mb-6 flex border-b border-[var(--color-border)]">
                {(['info', 'password'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-3 text-sm font-medium capitalize transition ${activeTab === tab
                                ? 'border-b-2 border-accent text-accent'
                                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
                            }`}
                    >
                        {tab === 'info' ? 'Personal Info' : 'Change Password'}
                    </button>
                ))}
            </div>

            {activeTab === 'info' && (
                <div className="max-w-md space-y-4">
                    <Input label="Full Name" value={name} onChange={(e) => setName((e.target as HTMLInputElement).value)} />
                    <Input label="Email" value={user?.email || ''} readOnly className="opacity-60" />
                    <Input label="Phone" value={phone} onChange={(e) => setPhone((e.target as HTMLInputElement).value)} />
                    <Button onClick={handleSaveInfo} loading={loading}>Save Changes</Button>
                </div>
            )}

            {activeTab === 'password' && (
                <div className="max-w-md space-y-4">
                    <Input label="Current Password" type="password" value={currentPassword} onChange={(e) => setCurrentPassword((e.target as HTMLInputElement).value)} />
                    <div>
                        <Input label="New Password" type="password" value={newPassword} onChange={(e) => setNewPassword((e.target as HTMLInputElement).value)} />
                        {newPassword && (
                            <div className="mt-2">
                                <div className="h-1 w-full rounded-full bg-[var(--color-bg-tertiary)]">
                                    <div className={`h-full rounded-full transition-all ${strength.color}`} style={{ width: strength.width }} />
                                </div>
                                <p className="mt-1 text-xs text-[var(--color-text-muted)]">{strength.label}</p>
                            </div>
                        )}
                    </div>
                    <Input label="Confirm New Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword((e.target as HTMLInputElement).value)} />
                    <Button onClick={handleChangePassword} loading={loading}>Update Password</Button>
                </div>
            )}
        </div>
    )
}
