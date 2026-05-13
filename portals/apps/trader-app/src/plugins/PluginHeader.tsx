import type { TaskType } from './index.tsx'

const TYPE_LABELS: Record<TaskType, string> = {
  SIMPLE_FORM: 'Form',
  WAIT_FOR_EVENT: 'Wait for Event',
  PAYMENT: 'Payment',
  FIRE_AND_FORGET: 'API Call',
}

const TYPE_COLORS: Record<TaskType, string> = {
  SIMPLE_FORM: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
  WAIT_FOR_EVENT: 'bg-amber-50 text-amber-700 ring-amber-200',
  PAYMENT: 'bg-violet-50 text-violet-700 ring-violet-200',
  FIRE_AND_FORGET: 'bg-sky-50 text-sky-700 ring-sky-200',
}

const READY_STYLE = { chip: 'bg-blue-50 text-blue-700 ring-blue-200', dot: 'bg-blue-500' }
const DRAFT_STYLE = { chip: 'bg-indigo-50 text-indigo-700 ring-indigo-200', dot: 'bg-indigo-500' }
const ACTIVE_STYLE = {
  chip: 'bg-orange-50 text-orange-700 ring-orange-200',
  dot: 'bg-orange-500 animate-pulse',
}
const FEEDBACK_STYLE = { chip: 'bg-amber-50 text-amber-700 ring-amber-200', dot: 'bg-amber-500' }
const REVIEWED_STYLE = { chip: 'bg-violet-50 text-violet-700 ring-violet-200', dot: 'bg-violet-500' }
const COMPLETED_STYLE = {
  chip: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  dot: 'bg-emerald-500',
}
const FAILED_STYLE = { chip: 'bg-red-50 text-red-700 ring-red-200', dot: 'bg-red-500' }
const UNKNOWN_STYLE = { chip: 'bg-sky-50 text-sky-700 ring-sky-200', dot: 'bg-sky-500' }

const PLUGIN_STATE_STYLES: Record<string, { chip: string; dot: string }> = {
  INITIALIZED: READY_STYLE,
  IDLE: READY_STYLE,
  DRAFT: DRAFT_STYLE,
  IN_PROGRESS: ACTIVE_STYLE,
  SUBMITTED: ACTIVE_STYLE,
  OGA_ACKNOWLEDGED: ACTIVE_STYLE,
  NOTIFIED_SERVICE: ACTIVE_STYLE,
  OGA_FEEDBACK_PROVIDED: FEEDBACK_STYLE,
  OGA_REVIEWED: REVIEWED_STYLE,
  COMPLETED: COMPLETED_STYLE,
  RECEIVED_CALLBACK: COMPLETED_STYLE,
  FAILED: FAILED_STYLE,
  NOTIFY_FAILED: FAILED_STYLE,
  SUBMISSION_FAILED: FAILED_STYLE,
}

function pluginStateStyle(pluginState: string): { chip: string; dot: string } {
  return PLUGIN_STATE_STYLES[pluginState] ?? UNKNOWN_STYLE
}

function formatPluginState(pluginState: string): string {
  return pluginState
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function Field({
  label,
  align = 'left',
  children,
}: {
  label: string
  align?: 'left' | 'right'
  children: React.ReactNode
}) {
  return (
    <div className={`flex flex-col gap-1 ${align === 'right' ? 'items-end' : 'items-start'}`}>
      <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</span>
      {children}
    </div>
  )
}

export default function PluginHeader({
  type,
  pluginState,
}: {
  type: TaskType
  pluginState: string
}) {
  const { chip, dot } = pluginStateStyle(pluginState)

  return (
    <div className="flex items-start justify-between gap-4 flex-wrap">
      <Field label="Type">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold ring-1 ring-inset ${TYPE_COLORS[type]}`}
        >
          <TypeIcon type={type} />
          {TYPE_LABELS[type]}
        </span>
      </Field>

      <Field label="State" align="right">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium ring-1 ring-inset ${chip}`}
        >
          <span className={`w-2 h-2 rounded-full shrink-0 ${dot}`} />
          {formatPluginState(pluginState)}
        </span>
      </Field>
    </div>
  )
}

function TypeIcon({ type }: { type: TaskType }) {
  switch (type) {
    case 'SIMPLE_FORM':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      )
    case 'WAIT_FOR_EVENT':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    case 'PAYMENT':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      )
    case 'FIRE_AND_FORGET':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
      )
  }
}
