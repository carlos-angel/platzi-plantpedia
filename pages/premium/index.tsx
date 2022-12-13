import { GetServerSideProps } from 'next'
import { Layout } from '@components/Layout'
import { getSession } from 'next-auth/client'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}

function PremiumPage() {
  return <Layout>Contenido secreto jaja</Layout>
}

export default PremiumPage
