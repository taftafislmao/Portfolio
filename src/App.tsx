import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { ProjectList } from './components/ProjectList'
import { Section } from './components/Section'
import { Skills } from './components/Skills'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Hero />

        <Section
          id="projects"
          index="01"
          title="Projects"
          lead="Software I have built, and the stack behind each one."
        >
          <ProjectList />
        </Section>

        <Section
          id="about"
          index="02"
          title="About"
          lead="How I got here, and how I actually work."
        >
          <About />
        </Section>

        <Section
          id="skills"
          index="03"
          title="Skills"
          lead="The languages, tools and technologies I work with most often."
        >
          <Skills />
        </Section>

        <Section
          id="contact"
          index="04"
          title="Contact"
          lead="Where to find me, and the fastest way to reach me."
        >
          <Contact />
        </Section>
      </main>

      <Footer />
    </>
  )
}
