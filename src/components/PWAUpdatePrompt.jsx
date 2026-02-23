import { useRegisterSW } from 'virtual:pwa-register/react'
import { RefreshCw, X } from 'lucide-react'

/**
 * Shows a slim toast at the bottom when a new service-worker version
 * is available, letting the user reload to get the update.
 */
export function PWAUpdatePrompt() {
    const {
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            console.log('[PWA] Service worker registered:', r)
        },
        onRegisterError(error) {
            console.error('[PWA] Service worker registration error:', error)
        },
    })

    if (!needRefresh) return null

    return (
        <div className="fixed bottom-20 md:bottom-4 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-sm">
            <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl border border-amber-700/40 bg-stone-900/95 backdrop-blur-md shadow-2xl shadow-black/40">
                {/* Icon + text */}
                <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-amber-600/20 border border-amber-700/30 flex items-center justify-center flex-shrink-0">
                        <RefreshCw size={14} className="text-amber-400" />
                    </div>
                    <p className="text-sm text-stone-300 font-bangla leading-tight">
                        নতুন আপডেট পাওয়া গেছে।
                        <span className="text-stone-500 block text-xs">রিফ্রেশ করুন।</span>
                    </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                        onClick={() => updateServiceWorker(true)}
                        className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-semibold font-bangla transition-colors"
                    >
                        আপডেট
                    </button>
                    <button
                        onClick={() => setNeedRefresh(false)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-stone-500 hover:text-stone-300 transition-colors"
                    >
                        <X size={14} />
                    </button>
                </div>
            </div>
        </div>
    )
}
