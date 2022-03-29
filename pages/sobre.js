import { styled } from '../stitches.config'
import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { parseISO, format, intervalToDuration } from 'date-fns'
import { ptBR } from 'date-fns/locale'


import Base from '../layouts/Base'
// import { ButtonPrimary } from '../components/ButtonPrimary'
// import { ButtonPrimaryIcon } from '../components/ButtonPrimaryIcon'
// import Pronunciation from '../components/Pronunciation'
import stripHtml from '../lib/strip-html'
import items from '../data/about'

export async function getStaticProps() {
  const meta = {
    title: 'Sobre // Luis',
    description:
      "Me chamo Luis Carlos, mas pode me chamar de Luis/Lu ✌🏻.",
    tagline: 'Sobre mim.',
    image: 'https://raw.githubusercontent.com/birobirobiro/birobirobiro.dev/572ce4534386893e3c064da603745a68ea4cb051/.github/image.png',
    primaryColor: 'cyan',
    secondaryColor: 'purple',
  }

  return { props: meta }
}

const yearAnniversary = new Date('2000-06-20');
const yearExperience = new Date('2021-03-08');

function About(props) {
  const { title, description, image } = props

  const renderIntro = () => {
    return (
      <Container>
        <Section>
          <Image
            alt="Biro"
            src="/static/images/luis.jpeg"
            width="680"
            height="920"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAP0lEQVQImQE0AMv/AFBQUJKSkqmpqaOjowCurq7v7+/Jycm5ubkA////jIyMn5+fg4ODADAwMD09PWlpaQAAAApRGnEHblMWAAAAAElFTkSuQmCC"
            priority
          />
        </Section>
        <Section>
          <Paragraph
            css={{
              marginTop: '16px',
              '@bp2': { marginTop: '-6px' },
            }}
          >
            Me chamo Luis Carlos, normalmente conhecido como <strong><i>Luis</i></strong> e tenho <strong>{new Date().getFullYear() - yearAnniversary.getFullYear()}</strong> anos.
          </Paragraph>

          <Paragraph>
            Sou programador full-stack, apaixonado por tecnologia. Atualmente trabalho como <strong>Full-Stack Develop</strong> na <strong>SMGBit</strong>, tenho {new Date().getFullYear() - yearExperience.getFullYear()} ano de experiência com as principais tecnologias: <i>HTML, CSS, JavaScript, ReactJS e React Native</i>.
          </Paragraph>

          <Paragraph>
            Quando não estou trabalhando, estou codando algum projeto pessoal ou jogando um lolzinho.
          </Paragraph>
        </Section>
      </Container>
    )
  }

  const renderBio = () => {
    return (
      <div>
        <blockquote>
          <p>{description}</p>
        </blockquote>
      </div>
    )
  }

  const renderAll = () => {
    return items.map((item, index) => {
      return (
        <div style={{ marginBottom: 40 }} key={index}>
          <h3>{item.jobTitle}</h3>
          <p style={{ margin: 0 }}>
            <a href={item.companyUrl} target="_blank">
              {item.company}
            </a>
            <span> • {item.location}</span>
          </p>
          <p style={{ margin: 0 }}>
            <span>{format(parseISO(item.startDate), 'LLL yyyy', { locale: ptBR })}</span>
            <span> – </span>
            <span>
              {item.endDate
                ? format(parseISO(item.endDate), 'LLL yyyy', { locale: ptBR })
                : 'Momento atual'}
            </span>
            <span> • </span>
            <span>{getDuration(item.startDate, item.endDate)}</span>
          </p>
        </div>
      )
    })
  }

  const getDuration = (startDate, endDate) => {
    const durationObj = intervalToDuration({
      start: parseISO(startDate),
      end: endDate ? parseISO(endDate) : new Date(),
    })

    let durationStr = ''

    if (durationObj.years > 1) {
      durationStr = `${durationObj.years} anos `
    } else if (durationObj.years === 1) {
      durationStr = `${durationObj.years} ano `
    }

    durationStr += `${durationObj.months} meses`

    return durationStr
  }

  const copyBio = e => {
    e.preventDefault()
    navigator.clipboard.writeText(description)
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://birobirobiro.dev/about" property="og:url" />
        <meta content={`https://birobirobiro.dev${image}`} property="og:image" />
      </Head>

      {renderIntro()}

      <h2>Bio</h2>
      {renderBio()}

      <h2>Carreira</h2>
      {renderAll()}
    </>
  )
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '@bp2': { flexDirection: 'row' },
})

const Paragraph = styled('p', {
  '@bp2': { margin: '15px 0' },
})

const Section = styled('div', {
  marginTop: '0px',
  width: 'auto',
  '@bp2': { width: '48%' },
})

About.Layout = Base

export default About
