import { ExternalLink, Heart, Code2, Github, Linkedin } from 'lucide-react'

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
    return (
        <footer className="relative z-10 mt-16 border-t border-amber-900/20 bg-stone-950/80 backdrop-blur-sm">

            {/* Top ornament line */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-700/40 to-transparent" />

            <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col items-center gap-6 text-center">

                {/* Arabic calligraphy accent */}
                <p
                    className="text-3xl text-amber-400/60 leading-none select-none"
                    style={{ fontFamily: "'Amiri', serif" }}
                    aria-hidden="true"
                >
                    ٱلْحَمْدُ لِلَّهِ
                </p>

                {/* Divider dots */}
                <div className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-amber-800/60" />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-700/60" />
                    <span className="w-1 h-1 rounded-full bg-amber-800/60" />
                </div>

                {/* Developer credit */}
                <div className="flex items-center gap-1.5 text-sm text-stone-400 font-bangla flex-wrap justify-center">
                    <Code2 size={13} className="text-amber-600" />
                    <span>Developed with</span>
                    <Heart size={12} className="text-red-500/80 fill-red-500/60" />
                    <span>by</span>
                    <a
                        href="https://thbappy7706.github.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold transition-colors duration-200 hover:underline underline-offset-2"
                    >
                        Tanvir Hossen Bappy
                        <ExternalLink size={11} />
                    </a>
                </div>

                {/* Social links */}
                <div className="flex items-center gap-3">
                    <a
                        href="https://github.com/thbappy7706"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="GitHub"
                        className="w-9 h-9 flex items-center justify-center rounded-xl border border-stone-800 text-stone-500 hover:text-white hover:border-stone-600 hover:bg-stone-800 transition-all duration-200"
                    >
                        <Github size={17} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/tanvir-hossen-bappy/"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="LinkedIn"
                        className="w-9 h-9 flex items-center justify-center rounded-xl border border-stone-800 text-stone-500 hover:text-sky-400 hover:border-sky-900 hover:bg-sky-950/50 transition-all duration-200"
                    >
                        <Linkedin size={17} />
                    </a>
                </div>

                {/* API credit */}
                <p className="text-xs text-stone-600 font-bangla flex items-center gap-1.5 flex-wrap justify-center">
                    <span>কুরআনের তথ্য সরবারহকৃত</span>
                    <a
                        href="https://quranapi.pages.dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-amber-700 hover:text-amber-500 transition-colors duration-200 hover:underline underline-offset-2"
                    >
                        QuranAPI
                        <ExternalLink size={10} />
                    </a>
                </p>

                {/* Copyright */}
                <p className="text-xs text-stone-700 font-bangla">
                    &copy; {CURRENT_YEAR} Tanvir Hossen Bappy. All rights reserved.
                </p>
            </div>
        </footer>
    )
}
