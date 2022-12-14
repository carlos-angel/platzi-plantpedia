import { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

import { Typography } from '@ui/Typography'
import { Button } from '@ui/Button'
import { Layout } from '@components/Layout'
import { AccessDenied } from '@components/AccessDenied'

import { useSession, getSession } from '@auth/client'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  const i18n = await serverSideTranslations(ctx.locale!)

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
      ...i18n,
    },
  }
}

function PremiumPage() {
  const [session, loading] = useSession()
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [refetchCounter, refetch] = useState(0)
  const { t } = useTranslation(['page-premium'])
  useEffect(() => {
    fetch('/api/premium')
      .then((response) => response.json())
      .then(({ data }) => setImageUrl(data))
  }, [refetchCounter])

  if (loading) {
    return null
  }

  if (session == null) {
    return <AccessDenied />
  }
  return (
    <Layout title="Premium content">
      <div className="text-center">
        <Typography variant="h2">
          {t('welcome', { name: session.user?.name })}
        </Typography>
        <Typography variant="body2" className="mt-1">
          {t('hereIsYourPremiumContent')}
        </Typography>
        <div className="max-w-lg mx-auto my-8 text-center">
          {imageUrl == null ? null : (
            <img
              key={imageUrl}
              src={imageUrl}
              alt="Random fox"
              className="rounded"
            />
          )}
        </div>
        <Button variant="outlined" onClick={() => refetch((c) => ++c)}>
          {t('more')}
        </Button>
      </div>
    </Layout>
  )
}

export default PremiumPage
