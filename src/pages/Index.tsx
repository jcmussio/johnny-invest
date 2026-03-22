import { Header } from '@/components/home/Header'
import { Hero } from '@/components/home/Hero'
import { SystemPresentation } from '@/components/home/SystemPresentation'
import { CourseStructure } from '@/components/home/CourseStructure'
import { Gamification } from '@/components/home/Gamification'
import { Differentials } from '@/components/home/Differentials'
import { Pricing } from '@/components/home/Pricing'
import { Onboarding } from '@/components/home/Onboarding'
import { FAQ } from '@/components/home/FAQ'
import { Blog } from '@/components/home/Blog'
import { Footer } from '@/components/home/Footer'

export default function Index() {
  return (
    <div className="min-h-screen bg-[#1a2a4a] font-sans selection:bg-[#10b981] selection:text-white overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <SystemPresentation />
        <CourseStructure />
        <Gamification />
        <Differentials />
        <Pricing />
        <Onboarding />
        <FAQ />
        <Blog />
      </main>
      <Footer />
    </div>
  )
}
