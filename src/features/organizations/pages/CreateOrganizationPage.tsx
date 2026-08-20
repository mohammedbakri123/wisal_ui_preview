import { type FormEvent, useState } from 'react'
import { BackButton } from '@/core/components/ui/BackButton'
import { Button } from '@/core/components/ui/Button'
import { PageContainer } from '@/core/components/layout/PageContainer'
import { FeatureScaffold } from '@/core/components/layout/FeatureScaffold'
import { ROUTES } from '@/core/utils/routes'
import { useOrganizations } from '../context/useOrganizations'

export default function CreateOrganizationPage() {
  const { addOrganization } = useOrganizations()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [details, setDetails] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!name.trim() || !email.trim()) return
    addOrganization(name.trim(), details.trim())
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <FeatureScaffold
        title="Request submitted"
        eyebrow="Verification review"
        description={`Your request for ${name} is waiting for administrative review. We will use ${email} for updates.`}
        backTo={ROUTES.ORGANIZATIONS.LIST}
        actions={[{ label: 'Back to organizations', path: ROUTES.ORGANIZATIONS.LIST }]}
        sections={[{ title: 'Next steps', items: [{ title: 'Review status', description: 'The request is pending review. Required documents can be added when the verification workflow is finalized.', meta: 'Pending' }] }]}
      />
    )
  }

  return (
    <div className="flex h-full flex-col bg-black text-[#e7e9ea]">
      <PageContainer className="w-full px-4 pt-3 pb-8">
        <div className="mx-auto max-w-2xl">
          <BackButton to={ROUTES.ORGANIZATIONS.LIST} />
          <header className="mb-6 mt-2">
            <p className="text-xs font-bold uppercase tracking-wider text-[#1d9bf0]">Organization request</p>
            <h1 className="mt-1 text-2xl font-bold">Create an organization</h1>
            <p className="mt-2 text-sm leading-relaxed text-[#71767b]">Submit the details for a real-world organization. Platform administrators review requests before verification.</p>
          </header>
          <form onSubmit={submitRequest} className="space-y-5 rounded-2xl border border-[#2f3336] bg-[#16181c] p-4 sm:p-6">
            <label className="block text-sm font-bold">Organization name<input value={name} onChange={(event) => setName(event.target.value)} required className="mt-2 h-11 w-full rounded-xl border border-[#2f3336] bg-[#202327] px-4 text-sm text-[#e7e9ea] outline-none placeholder:text-[#71767b] focus:border-[#1d9bf0]" placeholder="e.g. Acme University" /></label>
            <label className="block text-sm font-bold">Contact email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required className="mt-2 h-11 w-full rounded-xl border border-[#2f3336] bg-[#202327] px-4 text-sm text-[#e7e9ea] outline-none placeholder:text-[#71767b] focus:border-[#1d9bf0]" placeholder="admin@example.com" /></label>
            <label className="block text-sm font-bold">Organization details<textarea value={details} onChange={(event) => setDetails(event.target.value)} rows={5} className="mt-2 w-full resize-none rounded-xl border border-[#2f3336] bg-[#202327] p-3 text-sm text-[#e7e9ea] outline-none placeholder:text-[#71767b] focus:border-[#1d9bf0]" placeholder="Website, location, purpose, and any context for the review" /></label>
            <div className="rounded-xl border border-dashed border-[#536471] p-4"><p className="text-sm font-bold">Verification documents</p><p className="mt-1 text-xs leading-relaxed text-[#71767b]">Document upload is intentionally marked as pending in the product specification. This prototype records the request without a file upload.</p></div>
            <Button type="submit" className="w-full" disabled={!name.trim() || !email.trim()}>Submit verification request</Button>
          </form>
        </div>
      </PageContainer>
    </div>
  )
}
