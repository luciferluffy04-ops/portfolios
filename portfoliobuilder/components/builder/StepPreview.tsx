'use client'

import { useState, useEffect } from 'react'
import {
  ArrowLeft, Globe, Download, Copy, Check,
  Palette, Type, ExternalLink
} from 'lucide-react'
import { useBuilder } from './BuilderContext'
import { ACCENT_COLORS, ROLES } from '@/lib/constants'
import { generatePortfolioHTML } from '@/lib/generatePortfolio'

export function StepPreview() {
  const { state, goBack, setSubdomain, setAccentColor, setFontStyle } = useBuilder()
  const [copied, setCopied] = useState(false)
  const [published, setPublished] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [html, setHtml] = useState('')

  // Auto-generate subdomain from name
  useEffect(() => {
    if (!state.subdomain && state.details.name) {
      const slug = state.details.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
      setSubdomain(slug)
    }
  }, [state.details.name, state.subdomain, setSubdomain])

  // Regenerate HTML on state change
  useEffect(() => {
    if (!state.role || !state.templateId) return
    const generated = generatePortfolioHTML({
      details: state.details,
      templateId: state.templateId!,
      role: state.role!,
      accentColor: state.accentColor,
      fontStyle: state.fontStyle,
    })
    setHtml(generated)
  }, [state.details, state.templateId, state.role, state.accentColor, state.fontStyle])

  async function handlePublish() {
    setPublishing(true)
    try {
      await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subdomain: state.subdomain,
          html,
        }),
      })
      setPublished(true)
    } catch {
      // fallback to download
      handleDownload()
    } finally {
      setPublishing(false)
    }
  }

  function handleDownload() {
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${state.subdomain || 'portfolio'}.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  async function handleCopyLink() {
    await navigator.clipboard.writeText(`https://${state.subdomain}.portfol.io`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const url = `${state.subdomain || 'your-name'}.portfol.io`
  const roleLabel = ROLES.find(r => r.id === state.role)?.label ?? 'Developer'

  return (
    <div className="animate-fade-up">
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Preview & publish</h2>
      <p className="text-sm text-gray-500 mb-5">
        Your {roleLabel} portfolio is ready. Customise, then publish.
      </p>

      <div className="grid lg:grid-cols-[1fr_260px] gap-5">
        {/* Browser preview */}
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 border-b border-gray-200">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-300" />
            </div>
            <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-md px-2.5 py-1">
              <Globe size={11} className="text-gray-400 flex-shrink-0" />
              <span className="text-[11px] text-gray-500 truncate">{url}</span>
            </div>
            <ExternalLink size={13} className="text-gray-400 cursor-pointer hover:text-gray-600" />
          </div>

          {/* Iframe preview */}
          <div className="relative bg-white" style={{ height: '480px' }}>
            {html ? (
              <iframe
                srcDoc={html}
                className="w-full h-full border-0"
                title="Portfolio preview"
                sandbox="allow-same-origin"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-sm text-gray-400">
                Building preview…
              </div>
            )}
          </div>
        </div>

        {/* Right panel */}
        <div className="flex flex-col gap-4">

          {/* Publish card */}
          <div className="rounded-xl border border-gray-200 p-4 bg-white">
            <p className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-1.5">
              <Globe size={14} className="text-brand-600" /> Publish
            </p>

            {published ? (
              <div className="text-center py-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-2">
                  <Check size={18} className="text-teal-600" />
                </div>
                <p className="text-sm font-medium text-teal-700">Live!</p>
                <a
                  href={`https://${url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-brand-500 hover:underline mt-0.5 block"
                >
                  {url}
                </a>
                <button
                  onClick={handleCopyLink}
                  className="mt-3 flex items-center gap-1.5 mx-auto px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  {copied ? <Check size={11} className="text-teal-500" /> : <Copy size={11} />}
                  {copied ? 'Copied!' : 'Copy link'}
                </button>
              </div>
            ) : (
              <>
                <p className="text-xs text-gray-400 mb-2">Your URL will be:</p>
                <div className="flex items-center rounded-lg border border-gray-200 overflow-hidden mb-3">
                  <input
                    className="flex-1 px-2.5 py-2 text-xs text-gray-700 bg-white outline-none"
                    value={state.subdomain}
                    onChange={e => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    placeholder="your-name"
                  />
                  <span className="px-2.5 py-2 text-xs text-gray-400 bg-gray-50 border-l border-gray-200 whitespace-nowrap">
                    .portfol.io
                  </span>
                </div>
                <button
                  onClick={handlePublish}
                  disabled={publishing || !state.subdomain}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mb-2"
                >
                  <Globe size={14} />
                  {publishing ? 'Publishing…' : 'Publish now'}
                </button>
                <button
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <Download size={14} /> Download HTML
                </button>
              </>
            )}
          </div>

          {/* Customise card */}
          <div className="rounded-xl border border-gray-200 p-4 bg-white">
            <p className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-1.5">
              <Palette size={14} className="text-brand-600" /> Customise
            </p>

            <div className="flex flex-col gap-4">
              <div>
                <p className="text-xs text-gray-400 mb-2">Accent colour</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {ACCENT_COLORS.map(c => (
                    <button
                      key={c.value}
                      title={c.label}
                      onClick={() => setAccentColor(c.value)}
                      className="w-6 h-6 rounded-full transition-all"
                      style={{
                        background: c.value,
                        outline: state.accentColor === c.value ? `2px solid ${c.value}` : 'none',
                        outlineOffset: '2px',
                      }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                  <Type size={11} /> Font style
                </p>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['sans', 'serif', 'mono'] as const).map(f => (
                    <button
                      key={f}
                      onClick={() => setFontStyle(f)}
                      className={`py-1.5 rounded-md text-xs font-medium border transition-colors ${
                        state.fontStyle === f
                          ? 'border-brand-400 bg-brand-50 text-brand-700'
                          : 'border-gray-200 text-gray-500 hover:border-gray-300'
                      }`}
                    >
                      {f === 'sans' ? 'Modern' : f === 'serif' ? 'Editorial' : 'Dev'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Share */}
          <div className="rounded-xl border border-gray-200 p-4 bg-white">
            <p className="text-sm font-semibold text-gray-800 mb-3">Share</p>
            <div className="flex gap-2">
              <button
                onClick={handleCopyLink}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
              >
                {copied ? <Check size={12} className="text-teal-500" /> : <Copy size={12} />}
                {copied ? 'Copied!' : 'Copy link'}
              </button>
              <a
                href={`https://linkedin.com/sharing/share-offsite/?url=https://${url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center pt-4 mt-2 border-t border-gray-100">
        <button
          onClick={goBack}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft size={14} /> Edit details
        </button>
      </div>
    </div>
  )
}
