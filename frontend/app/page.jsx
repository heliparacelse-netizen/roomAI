const features = [
  {
    title: 'AI Layout Intelligence',
    description:
      'Automatically understands room geometry and proposes balanced furniture flow in seconds.'
  },
  {
    title: 'Style Blending Engine',
    description:
      'Mix modern, japandi, industrial and more into one cohesive visual direction instantly.'
  },
  {
    title: 'Client-ready Exports',
    description:
      'Generate polished visual previews your clients can review, share, and approve quickly.'
  }
];

const steps = [
  {
    icon: '⬆️',
    title: 'Upload your space'
  },
  {
    icon: '🎨',
    title: 'Choose style direction'
  },
  {
    icon: '✨',
    title: 'Generate immersive preview'
  }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#07090E] text-white">
      <nav className="px-8 py-4 flex items-center justify-between border-b border-white/10">
        <div className="text-xl font-semibold tracking-tight">DesignAI</div>
        <div className="hidden md:flex items-center gap-10 text-sm text-gray-300">
          <a href="#product" className="hover:text-white transition-colors">Product</a>
          <a href="#studio" className="hover:text-white transition-colors">Studio</a>
          <a href="#process" className="hover:text-white transition-colors">Process</a>
        </div>
        <button className="rounded-full border border-white/20 px-5 py-2 text-sm font-medium hover:bg-white/10 transition-colors">
          Login
        </button>
      </nav>

      <section className="min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-8 w-full">
          <h1 className="text-5xl md:text-6xl font-semibold leading-tight max-w-4xl">
            Design stunning interiors with AI and immersive 3D precision.
          </h1>
          <p className="text-lg text-gray-400 mt-6 max-w-2xl">
            DesignAI transforms any room photo into a premium concept in minutes with intelligent layout planning,
            style synthesis, and instant visual storytelling.
          </p>
          <div className="mt-8 flex gap-4 justify-center md:justify-start">
            <button className="rounded-xl bg-white text-black px-6 py-3 font-medium hover:bg-gray-200 transition-colors">
              Start Designing
            </button>
            <button className="rounded-xl border border-white/20 px-6 py-3 font-medium hover:bg-white/10 transition-colors">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      <section id="studio" className="mt-24 max-w-7xl mx-auto px-8">
        <div className="rounded-3xl bg-gradient-to-br from-indigo-500/20 via-cyan-400/10 to-fuchsia-500/20 border border-white/10 min-h-[420px] p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.12),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(99,102,241,0.2),transparent_38%)]" />
          <div className="relative z-10 h-full flex items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-gray-300">3D Live Preview</p>
              <h2 className="text-3xl md:text-4xl font-semibold mt-3">See every concept before you commit.</h2>
            </div>
          </div>
        </div>
      </section>

      <section id="product" className="max-w-7xl mx-auto px-8 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <article key={feature.title} className="p-6 rounded-2xl bg-white/5 backdrop-blur border border-white/10">
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-400 mt-3 leading-relaxed">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="process" className="max-w-7xl mx-auto px-8 pb-24">
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-xl">{step.icon}</div>
              <p className="text-sm text-gray-400 mt-4">Step {index + 1}</p>
              <h3 className="text-lg font-medium mt-2">{step.title}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-8 pb-24 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold">Bring your next interior idea to life now.</h2>
        <button className="mt-10 rounded-xl bg-white text-black px-8 py-4 font-semibold text-lg hover:bg-gray-200 transition-colors">
          Start your first room
        </button>
      </section>
    </main>
  );
}
