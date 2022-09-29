import { getServerSideSitemapIndex } from 'next-sitemap'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async(ctx) => {
  return getServerSideSitemapIndex(ctx, [
    'https://www.italiameravigliosaintour.it.com/categoria/Acqua',
    'https://www.italiameravigliosaintour.it.com/categoria/Borghi',
    'https://www.italiameravigliosaintour.it.com/categoria/Sentieri',
    'https://www.italiameravigliosaintour.it.com/categoria/Monumenti',
    'https://www.italiameravigliosaintour.it.com/categoria/Natura',
    'https://www.italiameravigliosaintour.it.com/categoria/Curiosità',
  ])
}

export default function SitemapIndex() {}
