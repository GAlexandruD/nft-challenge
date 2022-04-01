import { createCurrenteUserHook, createClient } from 'next-sanity'
import createImageUrlBuilder from '@sanity/image-url'

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  apiVersion: '2021-03-25',
  useCdn: process.env.NODE_ENV === 'production',
}

export const sanityClient = createClient(config)

// https://www.sanity.io/docs/image-url

export const urlFor = (source) => createImageUrlBuilder(config).image(source)
