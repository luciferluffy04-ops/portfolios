'use client'

import { clsx } from 'clsx'
import { TemplateId } from '@/lib/types'

export function TemplateThumb({ id, accent }: { id: TemplateId; accent: string }) {
  if (id === 'developer-dark') {
    return (
      <div className="h-28 p-3 flex flex-col gap-2 bg-[#0f1117]">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full flex-shrink-0" style={{ background: accent + '66' }} />
          <div className="h-2 rounded-full w-1/2" style={{ background: accent + '55' }} />
        </div>
        <div className="h-2 rounded w-3/4 bg-[#2d3748]" />
        <div className="flex gap-2">
          <div className="px-2 py-1 rounded text-[9px] font-mono" style={{ background: accent + '33', color: accent }}>React</div>
          <div className="px-2 py-1 rounded text-[9px] font-mono" style={{ background: accent + '22', color: accent + 'cc' }}>Node.js</div>
        </div>
        <div className="mt-1 h-10 rounded bg-[#1a202c] border border-[#2d3748]" />
      </div>
    )
  }
  if (id === 'bold-visual') {
    return (
      <div className="h-28 flex flex-col" style={{ background: accent }}>
        <div className="p-3 flex-1">
          <div className="h-3 rounded w-2/3 bg-white/30 mb-2" />
          <div className="h-2 rounded w-1/2 bg-white/20" />
        </div>
        <div className="p-3 bg-white grid grid-cols-2 gap-2">
          <div className="h-8 rounded-lg border border-gray-100" style={{ background: accent + '0f' }} />
          <div className="h-8 rounded-lg border border-gray-100" />
        </div>
      </div>
    )
  }
  if (id === 'timeline') {
    return (
      <div className="h-28 p-3 bg-white flex gap-3">
        <div className="flex flex-col items-center gap-0 pt-1">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: accent }} />
          <div className="w-px flex-1" style={{ background: accent + '30' }} />
          <div className="w-2 h-2 rounded-full flex-shrink-0 bg-gray-200" />
          <div className="w-px flex-1 bg-gray-100" />
          <div className="w-2 h-2 rounded-full flex-shrink-0 bg-gray-200" />
        </div>
        <div className="flex flex-col gap-3 flex-1">
          {[1, 2, 3].map(i => (
            <div key={i}>
              <div className={clsx('h-2 rounded mb-1', i === 1 ? 'w-3/4' : 'w-1/2 bg-gray-100')}
                style={i === 1 ? { background: accent } : {}} />
              <div className="h-1.5 rounded w-4/5 bg-gray-100" />
            </div>
          ))}
        </div>
      </div>
    )
  }
  // minimal
  return (
    <div className="h-28 p-3 bg-white flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-gray-100 flex-shrink-0" />
        <div className="flex flex-col gap-1">
          <div className="h-2 rounded w-20 bg-gray-200" />
          <div className="h-1.5 rounded w-14" style={{ background: accent + '66' }} />
        </div>
      </div>
      <div className="h-1.5 rounded w-full bg-gray-100" />
      <div className="h-1.5 rounded w-4/5 bg-gray-100" />
      <div className="flex gap-1.5 mt-1">
        {[1, 2, 3].map(i => (
          <div key={i} className="px-2 h-4 rounded-full border text-[8px] flex items-center" style={{ borderColor: accent + '55', color: accent + '99' }}>tag</div>
        ))}
      </div>
    </div>
  )
}
