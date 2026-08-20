import { useState } from 'react'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { BackButton } from '@/core/components/ui/BackButton'
import { Button } from '@/core/components/ui/Button'
import { ROUTES } from '@/core/utils/routes'

const initialRequests = [
  { id: 'req-1', name: 'Northstar Labs', submitted: 'Today', status: 'Pending' },
  { id: 'req-2', name: 'Field Notes Collective', submitted: 'Yesterday', status: 'Pending' },
  { id: 'req-3', name: 'Atlas Education', submitted: '3 days ago', status: 'Pending' },
]

export default function InstitutionsPage() {
  const [requests, setRequests] = useState(initialRequests)
  const resolve = (id: string, status: string) => setRequests((current) => current.map((request) => request.id === id ? { ...request, status } : request))
  const remove = (id: string) => setRequests((current) => current.filter((request) => request.id !== id))

  return <div className="flex h-full flex-col bg-black"><PageContainer className="w-full max-w-3xl px-3 pt-3 sm:px-5"><BackButton to={ROUTES.ADMIN.ROOT} label="Overview" /><div className="mt-3"><p className="text-xs font-bold uppercase tracking-wider text-[#71767b]">Verification workflow</p><h1 className="mt-1 text-2xl font-bold text-[#e7e9ea]">Institution requests</h1><p className="mt-1 text-sm text-[#71767b]">Review submitted organization details before verification.</p></div><div className="mt-5 space-y-3">{requests.map((request) => <article key={request.id} className="rounded-2xl border border-[#2f3336] bg-[#16181c] p-4"><div className="flex items-start justify-between gap-4"><div><h2 className="font-bold text-[#e7e9ea]">{request.name}</h2><p className="mt-1 text-xs text-[#71767b]">Submitted {request.submitted}</p></div><span className={`text-xs font-bold ${request.status === 'Approved' ? 'text-[#00ba7c]' : request.status === 'Rejected' ? 'text-[#f4212e]' : request.status === 'Suspended' ? 'text-[#ffd400]' : 'text-[#ffd400]'}`}>{request.status}</span></div><div className="mt-4 flex flex-wrap gap-2">{request.status === 'Pending' && <><Button size="sm" onClick={() => resolve(request.id, 'Approved')}>Approve</Button><Button size="sm" variant="danger" onClick={() => resolve(request.id, 'Rejected')}>Reject</Button></>}{request.status === 'Approved' && <Button size="sm" variant="danger" onClick={() => resolve(request.id, 'Suspended')}>Suspend institution</Button>}{request.status === 'Suspended' && <Button size="sm" onClick={() => resolve(request.id, 'Approved')}>Restore institution</Button>}{request.status !== 'Pending' && <Button size="sm" variant="ghost" onClick={() => remove(request.id)}>Delete record</Button>}</div></article>)}</div>{requests.length === 0 && <p className="mt-6 text-center text-sm text-[#71767b]">No institution records remain.</p>}</PageContainer></div>
}
